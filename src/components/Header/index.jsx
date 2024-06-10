import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="flex w-full py-2 pr-4 bg-black border-2 border-solid md:pr-8 md:h-16">
      <Link to="/" className="flex items-center">
        <span
          className={`ml-4 md:ml-8 text-${currentPath === "/" ? "blue-500" : "white"} text-lg md:text-2xl font-bold py-1 px-2 md:py-2 md:px-4 rounded cursor-pointer`}
        >
          Dashboard
        </span>
      </Link>
      <span className="px-2 py-1 ml-1 mr-1 text-lg font-bold text-white rounded md:ml-2 md:mr-2 md:text-2xl md:py-2 md:px-4">
        |
      </span>
      <Link to="/single" className="flex items-center">
        <span
          className={`ml-1 md:ml-2 mr-1 md:mr-2 text-${currentPath === "/single" ? "blue-500" : "white"} text-lg md:text-2xl font-bold py-1 px-2 md:py-2 md:px-4 rounded cursor-pointer`}
        >
          SingleView
        </span>
      </Link>
      <span className="px-2 py-1 ml-1 mr-1 text-lg font-bold text-white rounded md:ml-2 md:mr-2 md:text-2xl md:py-2 md:px-4">
        |
      </span>
      <Link to="/friend" className="flex items-center">
        <span
          className={`ml-1 md:ml-2 mr-1 md:mr-2 text-${currentPath === "/friend" ? "blue-500" : "white"} text-lg md:text-2xl font-bold py-1 px-2 md:py-2 md:px-4 rounded cursor-pointer`}
        >
          Friends
        </span>
      </Link>
    </header>
  );
}

export default Header;
