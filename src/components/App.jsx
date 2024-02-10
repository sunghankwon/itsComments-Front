import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [userData, setUserData] = useState(null);
  const [loginCheck, setLoginCheck] = useState("loading");

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    async function verifyToken() {
      if (!token) {
        setLoginCheck("fail");
      }
      try {
        const res = await axios.post(
          import.meta.env.VITE_SERVER_URL,
          { token: token },
          { withCredentials: true },
        );

        const user = res.data.user;

        setUserData(user);
        setLoginCheck("success");
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
      <div className="font-bold m-8 text-red-500">
        로그인에 실패하였습니다...
      </div>
    );
  }

  return (
    <div className="font-bold m-80">
      {userData ? `${userData.nickname}님이 로그인 하셨습니다.` : "not Login"}
    </div>
  );
}

export default App;
