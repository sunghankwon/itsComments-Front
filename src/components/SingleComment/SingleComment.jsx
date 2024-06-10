import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import useUserStore from "../../store/useUser";
import ReComments from "../ReComments";
import { CommentDelete } from "../Modal/CommentDelete";
import fetchFeedSingleComment from "../../../fetchers/fetchFeedSingleComment";
import { ReplySection } from "./ReplySection";
import { CommentDetail } from "./CommentDetail";

export function SingleComment() {
  const { commentId } = useParams();
  const { userData } = useUserStore();
  const replyTextRef = useRef(null);
  const navigate = useNavigate();

  const [receivedComment, setReceivedComment] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(true);
  const [isReCommentOpen, setReComment] = useState(false);
  const [scrollCoordinate, setScrollCoordinate] = useState(null);

  useEffect(() => {
    if (receivedComment) {
      setScrollCoordinate(parseInt(receivedComment.postCoordinate.y, 10) - 200);
    }
  }, [receivedComment]);

  const closeModal = () => {
    setModalOpen(false);
    navigate(-1);
  };

  const handleReComment = () => {
    if (isReCommentOpen) {
      setReComment(false);
    } else {
      setReComment(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commentData = await fetchFeedSingleComment(
          commentId,
          userData._id,
        );
        setReceivedComment(commentData);
      } catch (error) {
        console.error("Error fetching comment:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const eventSource = new EventSource(
      `${import.meta.env.VITE_SERVER_URL}/comments/recomments/comments-recomments-stream/${commentId}`,
    );

    eventSource.addEventListener("message", (event) => {
      const commentDataUpdate = JSON.parse(event.data);
      setReceivedComment(commentDataUpdate);
    });

    return () => {
      eventSource.close();
    };
  }, []);

  const handleReplySubmit = async () => {
    const replyCommentTime = new Date();
    try {
      const replyData = {
        userId: userData._id,
        text: replyTextRef.current.value,
        postDate: replyCommentTime,
        commentId,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/comments/recomments`,
        replyData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status !== 200) {
        throw new Error("Failed to post reply");
      }

      replyTextRef.current.value = "";
    } catch (error) {
      console.error("Error posting reply:", error.message);
    }
  };

  const handleDeleteReply = async (replyUserId, replyId) => {
    try {
      if (
        (receivedComment.creator._id !== replyUserId &&
          replyUserId !== userData._id) ||
        !userData
      ) {
        throw new Error("You can't delete");
      }

      const requestData = {
        userId: userData._id,
        commentId,
        replyId,
      };

      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/comments/recomments`,
        {
          data: requestData,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status !== 200) {
        throw new Error("Failed to delete reply");
      }
    } catch (error) {
      console.error("Error deleting reply:", error.message);
    }
  };

  if (!receivedComment) {
    return <div>Loading....</div>;
  }

  const listedReComments =
    isReCommentOpen &&
    receivedComment.reComments.map((reComment) => (
      <ReComments
        key={reComment._id}
        reComment={reComment}
        onDelete={handleDeleteReply}
      />
    ));

  function truncateString(str, maxLength) {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + "...";
    }
    return str;
  }

  const handleOutsideClick = (event) => {
    if (event.target.classList.contains("modal-overlay")) {
      navigate("/");
    }
  };

  return (
    <>
      {isModalOpen && (
        <div
          className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-500 bg-opacity-50 modal-overlay"
          onClick={handleOutsideClick}
        >
          <div
            className="relative flex items-start w-3/4 p-4 bg-white rounded-lg h-3/4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-5/6">
              <div className="ml-2">
                <p className="font-bold">{receivedComment.nickname}</p>
                <p className="text-gray-500">{receivedComment.email}</p>
              </div>
              <div className="flex flex-grow ml-2">
                <img
                  src={receivedComment.screenshot}
                  className="w-auto h-full max-h-[550px] border rounded-md"
                  alt="Screenshot"
                />
              </div>
            </div>
            <div className="w-1/4 p-1 overflow-y-auto h-5/6">
              <button
                className="absolute text-gray-500 top-4 right-4"
                onClick={closeModal}
              >
                X
              </button>
              <p className="ml-4">
                {receivedComment.reComments.length} Comments
              </p>
              <CommentDetail
                commentId={commentId}
                receivedComment={receivedComment}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
                scrollCoordinate={scrollCoordinate}
                truncateString={truncateString}
                handleReComment={handleReComment}
              />
              {isReCommentOpen && listedReComments}
              {isReCommentOpen && (
                <ReplySection
                  replyTextRef={replyTextRef}
                  handleReplySubmit={handleReplySubmit}
                />
              )}
            </div>
          </div>
          {isDeleteModalOpen && (
            <CommentDelete
              commentId={commentId}
              onClose={setIsDeleteModalOpen}
            />
          )}
        </div>
      )}
    </>
  );
}
