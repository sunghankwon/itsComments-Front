import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    async function verifyToken() {
      if (!token) {
        return;
      }

      const res = await axios.post(
        import.meta.env.VITE_SERVER_URL,
        { token: token },
        { withCredentials: true },
      );

      const user = res.data.user;

      setUserData(user);
    }

    verifyToken();
  }, []);

  return (
    <div className="font-bold m-80">
      {userData ? `${userData.nickname}님이 로그인 하셨습니다.` : "not Login"}
    </div>
  );
}

export default App;
