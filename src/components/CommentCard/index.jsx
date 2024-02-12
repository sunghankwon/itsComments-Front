import formatDate from "../../utils/formatDate";
import isValidBase64 from "../../utils/decodeBase64";

function CommentCard({ data }) {
  const { creator, text, postDate, screenshot } = data;
  const commentCreator = creator.nickname;
  const commentText = text;
  const commentPostDate = new Date(postDate);
  const commentScreenshot = isValidBase64(screenshot);
  const formattedDate = formatDate(commentPostDate);

  return (
    <div className="w-[150px] h-[220px] mt-4 ml-4 border rounded-md overflow-hidden shadow-md">
      <div className="p-2 bg-black text-center text-[#38D431] font-bold text-sm">
        {commentCreator}
      </div>
      <div className="whitespace-nowrap overflow-hidden overflow-ellipsis">
        {commentText}
      </div>
      <img
        className="w-full h-[130px] object-cover border-t"
        src={commentScreenshot}
        alt="Comment Screenshot"
      />
      <div className="p-2 text-gray-500 text-xs">{formattedDate}</div>
    </div>
  );
}

export default CommentCard;
