import { useState } from "react";
import axios from "axios";
import useUserStore from "../store/useUser";
import useCommentsStore from "../store/useComments";

const useEditComment = (initialText, commentId) => {
  const { userData } = useUserStore();
  const { setUserCreatedComments } = useCommentsStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(initialText);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/comments/${commentId}`,
        {
          userId: userData._id,
          changedComment: editedText,
        },
        { withCredentials: true },
      );

      setUserCreatedComments(response.data.createdComments);
      setEditedText(response.data.comment.text);
      setIsEditing(false);
    } catch (error) {
      setErrorMessage("댓글 수정에 실패하였습니다.");
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedText(initialText);
  };

  return {
    isEditing,
    editedText,
    errorMessage,
    setEditedText,
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
  };
};

export default useEditComment;
