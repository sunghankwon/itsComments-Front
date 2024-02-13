import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="bg-black py-[15px] pr-[20px] w-full h-[80px] flex border-solid border-2">
      <Link to="/">
        <button className="ml-[100px] mr-2 text-[#38D431] text-2xl font-bold py-2 px-4 rounded">
          Dashboard
        </button>
      </Link>
      <span className="ml-[5px] mr-2 text-[#38D431] text-2xl font-bold py-2 px-4 rounded">
        |
      </span>
      <Link to="/single">
        <button className=" ml-[5px] mr-2 text-[#38D431] text-2xl font-bold py-2 px-4 rounded">
          Single Comment
        </button>
      </Link>
      <span className="ml-[5px] mr-2 text-[#38D431] text-2xl font-bold py-2 px-4 rounded">
        |
      </span>
      <Link to="/friend">
        <button className=" ml-[5px] mr-2 text-[#38D431] text-2xl font-bold py-2 px-4 rounded">
          friends
        </button>
      </Link>
    </div>
  );
}

export default Header;
