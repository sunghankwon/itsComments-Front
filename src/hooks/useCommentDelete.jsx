import axios from "axios";
import { useState } from "react";
import useCommentsStore from "../store/useComments";
import useUserStore from "../store/useUser";

function useCommentDelete(commentId, onClose) {
  const { userData } = useUserStore();
  const { setUserCreatedComments, setUserReceivedComments } =
    useCommentsStore();
  const [errorMessage, setErrorMessage] = useState("");

  const deleteComment = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/comments/${commentId}`,
        {
          data: { userId: userData._id },
          withCredentials: true,
        },
      );

      setUserCreatedComments(response.data.allComments.createdComments);
      setUserReceivedComments(response.data.allComments.receivedComments);

      onClose(false);
      return { success: true };
    } catch (error) {
      setErrorMessage("삭제에 실패하였습니다.");
      console.log(error);
      return { success: false };
    }
  };

  return { deleteComment, errorMessage };
}

export default useCommentDelete;
