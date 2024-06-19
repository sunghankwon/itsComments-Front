import useUserStore from "../../store/useUser";
import formatDate from "../../utils/formatDate";
import useEditComment from "../../hooks/useEditComment";

export function CommentDetail({
  commentId,
  receivedComment,
  setIsDeleteModalOpen,
  scrollCoordinate,
  truncateString,
  handleReComment,
}) {
  const { userData } = useUserStore();
  const commentDate = formatDate(new Date(receivedComment.postDate));

  const {
    isEditing,
    editedText,
    errorMessage,
    setEditedText,
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
  } = useEditComment(receivedComment.text, commentId);

  return (
    <div className="border w-[93%] border-[#333] relative ml-4 mt-2 p-1 pb-3 rounded-md">
      <div className="flex items-center">
        <img
          className="w-8 h-8 border rounded-full"
          src={receivedComment.creator.icon}
          alt="User Icon"
        />
        <span className="ml-1">{receivedComment.creator.nickname}</span>
        {receivedComment.creator.email === userData.email ? (
          <div className="flex items-end justify-end ml-auto">
            <button title="수정" onClick={handleEditClick} className="ml-2">
              🖊️
            </button>
            <button
              title="삭제"
              onClick={() => setIsDeleteModalOpen(true)}
              className="ml-2 mr-2"
            >
              🗑️
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="p-1 border">
        {isEditing ? (
          <textarea
            className="w-full p-2 mt-2 border rounded-md"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
        ) : (
          <p className="mt-2">{editedText}</p>
        )}
        {isEditing && (
          <>
            <div className="flex items-end justify-end ml-auto">
              <button
                className="px-2 py-1 text-white bg-green-500 rounded-md hover:bg-green-700"
                onClick={handleSaveClick}
              >
                수정
              </button>
              <button
                className="px-2 py-1 ml-1 text-white bg-red-500 rounded-md hover:bg-red-700"
                onClick={handleCancelClick}
              >
                취소
              </button>
            </div>
            <p className="items-center text-red-500">{errorMessage}</p>
          </>
        )}
        <p className="text-xs text-gray-500">{commentDate}</p>
        <a
          href={`${receivedComment.postUrl}?scroll=${scrollCoordinate}`}
          rel="noopener noreferrer"
          className="block max-w-xs overflow-hidden text-xs text-blue-500 whitespace-nowrap overflow-ellipsis"
        >
          {truncateString(receivedComment.postUrl, 20)}
        </a>
        <div className="border-t">
          <button onClick={handleReComment}>reply</button>
        </div>
      </div>
    </div>
  );
}
