import { useState, useEffect } from "react";
import fetchFeedSingleComment from "../../fetchers/fetchFeedSingleComment";

const useCommentData = (commentId, userId) => {
  const [receivedComment, setReceivedComment] = useState(null);
  const [isReCommentOpen, setReComment] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commentData = await fetchFeedSingleComment(commentId, userId);
        setReceivedComment(commentData);
      } catch (error) {
        console.error("Error fetching comment:", error.message);
      }
    };

    fetchData();
  }, [commentId, userId]);

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
  }, [commentId]);

  const toggleReComment = () => {
    setReComment(!isReCommentOpen);
  };

  return { receivedComment, isReCommentOpen, toggleReComment };
};

export default useCommentData;
