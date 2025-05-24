import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";

import Home from "../pages/Home";
import About from "../pages/About";
import NoMatch from "../pages/NotFound";
import Posts from "../pages/Posts";
import Post from "../pages/Post";
import PostLists from "../pages/PostLists";
import Login from "../pages/Login";
import Stats from "../pages/Stats";
import NewPost from "../pages/NewPost";
import ProtectedRoute from "../protected-routes";

export default function AppLayout() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  function logOut() {
    setUser(null);
    navigate("/");
  }

  return (
    <>
      <nav
        style={{
          margin: 10,
          fontSize: 30,
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Link to="/" style={{ padding: 5, textDecoration: "none" }}>
          Home
        </Link>
        <Link to="/posts" style={{ padding: 5, textDecoration: "none" }}>
          Posts
        </Link>
        <Link to="/about" style={{ padding: 5, textDecoration: "none" }}>
          About
        </Link>
        <span> | </span>
        {user && (
          <Link to="/stats" style={{ padding: 5, textDecoration: "none" }}>
            Stats
          </Link>
        )}
        {user && (
          <Link to="/newpost" style={{ padding: 5, textDecoration: "none" }}>
            New Post
          </Link>
        )}
        {!user && (
          <Link to="/login" style={{ padding: 5, textDecoration: "none" }}>
            Login
          </Link>
        )}
        {user && (
          <span onClick={logOut} style={{ padding: 5, cursor: "pointer" }}>
            Logout
          </span>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />}>
          <Route index element={<PostLists />} />
          <Route path=":slug" element={<Post user={user} />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route
          path="/stats"
          element={
            <ProtectedRoute user={user}>
              <Stats />
            </ProtectedRoute>
          }
        />
        <Route
          path="/newpost"
          element={
            <ProtectedRoute user={user}>
              <NewPost />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}
