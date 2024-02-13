import axios from "axios";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./Header.jsx";

import useUserStore from "../store/useUser.js";
import Dashboard from "./Dashboard/index.jsx";
import SingleComment from "./SingleComment/index.jsx";
import Friends from "./Friends/index.jsx";

function App() {
  const { setUserData } = useUserStore();
  const [loginCheck, setLoginCheck] = useState("loading");
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    async function verifyToken() {
      if (!token) {
        setLoginCheck("fail");
      }
      try {
        const res = await axios.post(
          import.meta.env.VITE_SERVER_URL,
          { token },
          { withCredentials: true },
        );

        const user = res.data.user;

        setUserData(user);
        setLoginCheck("success");
        navigate("/");
      } catch (error) {
        console.log("Login error:", error);
        setLoginCheck("fail");
      }
    }

    verifyToken();
  }, []);

  if (loginCheck === "loading") {
    return <div className="font-bold m-80">로딩중입니다...</div>;
  }

  if (loginCheck === "fail") {
    return (
      <div className="font-bold m-80 text-red-500">
        로그인에 실패하였습니다...
      </div>
    );
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" exact element={<Dashboard />} />
        <Route path="/single" exact element={<SingleComment />} />
        <Route path="/friend" exact element={<Friends />} />
      </Routes>
    </>
  );
}

export default App;
