import axios from "axios";
import { useState } from "react";

import useUserStore from "../../store/useUser";
import useFriendsStore from "../../store/useFriends";

export function FriendDelete({ friendId, onClose }) {
  const { userData } = useUserStore();
  const { setFriendsList } = useFriendsStore();
  const [errorMessage, setErrorMessage] = useState("");

  async function handleCloseModal(userId, friendId) {
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
      onClose(false);
    } catch (error) {
      setErrorMessage("삭제에 실패하였습니다.");
      console.log(error);
    }
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full z-10 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-md">
        <p>삭제하시겠습니까?</p>
        <p>{errorMessage}</p>
        <button
          onClick={() => handleCloseModal(userData._id, friendId)}
          className="bg-red-500 text-white px-4 py-2 mr-2 border border-red-700 rounded-md"
        >
          삭제
        </button>
        <button
          onClick={() => onClose(false)}
          className="bg-black text-[#38D431] px-4 py-2 border border-black rounded-md"
        >
          취소
        </button>
      </div>
    </div>
  );
}
