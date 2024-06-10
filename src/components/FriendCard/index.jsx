import { useState } from "react";

import { FriendDelete } from "../Modal/FriendDelete";

function FriendCard({ data }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const friendMail = data.email;
  const friendNickname = data.nickname;
  const friendIcon = data.icon;
  const friendId = data._id;

  return (
    <div className="w-[160px] min-w-[160px] h-[180px] min-h-[180px] ml-4 border rounded-md bg-white text-center overflow-hidden shadow-md relative">
      <button
        className="absolute mt-1 mr-1 text-lg font-bold text-red-500 top right-1"
        onClick={() => setIsDeleteModalOpen(true)}
      >
        ×
      </button>
      <div className="p-2 text-sm font-bold text-center text-blue-400 bg-black">
        {friendNickname}
      </div>
      <div className="overflow-hidden text-xs whitespace-nowrap overflow-ellipsis">
        {friendMail}
      </div>
      <div className="flex items-center justify-center">
        <img
          className="w-[80px] h-[80px] mt-4 rounded-full object-cover border-t"
          src={friendIcon}
          alt="Friend Icon"
        />
      </div>
      {isDeleteModalOpen && (
        <FriendDelete friendId={friendId} onClose={setIsDeleteModalOpen} />
      )}
    </div>
  );
}

export default FriendCard;
