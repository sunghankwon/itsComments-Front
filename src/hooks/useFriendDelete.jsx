import { useState } from "react";
import axios from "axios";
import useFriendsStore from "../store/useFriends";

function useFriendDelete() {
  const { setFriendsList } = useFriendsStore();
  const [errorMessage, setErrorMessage] = useState("");

  async function deleteFriend(userId, friendId) {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/friends/delete`,
        {
          userId,
          friendId,
        },
        { withCredentials: true },
      );

      setFriendsList(res.data.friends);
      return { success: true };
    } catch (error) {
      setErrorMessage("삭제에 실패하였습니다.");
      console.log(error);
      return { success: false };
    }
  }

  return { deleteFriend, errorMessage };
}

export default useFriendDelete;
