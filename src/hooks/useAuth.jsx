import { useEffect, useState } from "react";
import axios from "axios";
import useUserStore from "../store/useUser.js";
import useCommentsStore from "../store/useComments.js";
import getTokenFromCookie from "../utils/getTokenFromCookie.js";

function useAuth() {
  const { setUserData } = useUserStore();
  const { setUserCreatedComments, setUserReceivedComments } =
    useCommentsStore();
  const [loginCheck, setLoginCheck] = useState("loading");

  useEffect(() => {
    const token = getTokenFromCookie();

    async function verifyToken() {
      if (!token) {
        setLoginCheck("fail");
        return;
      }
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/login/client`,
          { token },
          { withCredentials: true },
        );

        const user = res.data.user;

        setUserData(user);
        setUserCreatedComments(user.createdComments);
        setUserReceivedComments(user.receivedComments);

        setLoginCheck("success");
      } catch (error) {
        console.log("Login error:", error);
        setLoginCheck("fail");
      }
    }

    verifyToken();
  }, []);

  return loginCheck;
}

export default useAuth;
