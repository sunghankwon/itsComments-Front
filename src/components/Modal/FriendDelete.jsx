import { useState } from "react";
import useUserStore from "../../store/useUser";
import useFriendDelete from "../../hooks/useFriendDelete";

export function FriendDelete({ friendId, onClose }) {
  const { userData } = useUserStore();
  const { deleteFriend, errorMessage } = useFriendDelete();

  async function handleDelete() {
    const result = await deleteFriend(userData._id, friendId);
    if (result.success) {
      onClose(false);
    }
  }

  return (
    <div className="fixed top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
      <div className="p-4 bg-white rounded-md">
        <p>삭제하시겠습니까?</p>
        <p>{errorMessage}</p>
        <button
          onClick={handleDelete}
          className="px-4 py-2 mr-2 text-white bg-red-500 border border-red-700 rounded-md"
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

export default FriendDelete;
