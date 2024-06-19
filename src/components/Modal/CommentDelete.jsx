import { useNavigate } from "react-router-dom";
import useCommentDelete from "../../hooks/useCommentDelete";

export function CommentDelete({ commentId, onClose }) {
  const { deleteComment, errorMessage } = useCommentDelete(commentId, onClose);
  const navigate = useNavigate();

  const handleDeleteComment = async () => {
    const result = await deleteComment();
    if (result.success) {
      navigate("/");
    }
  };

  return (
    <div className="fixed top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
      <div className="p-4 text-center bg-white rounded-md">
        <p>댓글을 삭제하시겠습니까?</p>
        <p>{errorMessage}</p>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleDeleteComment}
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
    </div>
  );
}

export default CommentDelete;
