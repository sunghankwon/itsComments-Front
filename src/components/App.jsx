import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Dashboard from "./Dashboard/index.jsx";
import SingleView from "./SingleView/index.jsx";
import Friends from "./Friends/index.jsx";
import { SingleComment } from "./SingleComment/SingleComment.jsx";
import useAuth from "../hooks/useAuth";

function App() {
  const loginCheck = useAuth();

  if (loginCheck === "loading") {
    return <div className="font-bold m-80">로딩중입니다...</div>;
  }

  if (loginCheck === "fail") {
    return (
      <div className="font-bold text-red-500 m-80">
        로그인에 실패하였습니다...
      </div>
    );
  }

  return (
    <main className="w-screen h-screen overflow-hidden">
      <Header className="fixed top-0 left-0" />
      <div className="w-full h-full">
        <Routes>
          <Route path="/" exact element={<Dashboard key={new Date()} />} />
          <Route path="/single" exact element={<SingleView />} />
          <Route path="/friend" exact element={<Friends />} />
          <Route
            path="/comments/:commentId"
            exact
            element={<SingleComment />}
          />
        </Routes>
      </div>
    </main>
  );
}

export default App;
