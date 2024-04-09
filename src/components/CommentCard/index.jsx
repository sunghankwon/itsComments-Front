import formatDate from "../../utils/formatDate";

function CommentCard({ data }) {
  const { creator, text, postDate, screenshot } = data;
  const commentCreator = creator.nickname || "알 수 없는 사용자";
  const commentText = text;
  const commentPostDate = new Date(postDate);
  const commentScreenshot = screenshot;
  const formattedDate = formatDate(commentPostDate);

  return (
    <div className="w-[200px] min-w-[50px] h-[220px] min-h-[55px] mt-4 ml-4 border rounded-md bg-white overflow-hidden shadow-md">
      <div className="p-2 text-sm font-bold text-center text-white bg-black">
        {commentCreator}
      </div>
      <div className="overflow-hidden whitespace-nowrap overflow-ellipsis">
        {commentText}
      </div>
      <img
        className="w-full h-[130px] min-h-[32] object-cover border-t border-b"
        src={commentScreenshot}
        alt="Comment Screenshot"
      />
      <div className="p-2 text-xs text-gray-500">{formattedDate}</div>
    </div>
  );
}

export default CommentCard;
