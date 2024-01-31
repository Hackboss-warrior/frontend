import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import "./index.css";
import ListPosts from "./pages/listPosts/listPosts";
import DetailPost from "./pages/detailPost/detailPost";
import Profile from "./pages/UserProfile/Profile";
import Contact from "./pages/Contact/Contact";
import Error from "./pages/Error/Error";
import Menu from "./components/Menu";
import About from "./pages/about/About";
import Admin from "./pages/Admin/Admin";
import User from "./pages/Admin/User";
import CreatePost from "./pages/createPost/CreatePost";
import { CookiesProvider } from "react-cookie";
import isAdmin from "./isAdmin";
import EditPost from "./pages/editPost/editPost";

const PrivateRoute = () => {
  const cookies = document.cookie;

  const tokenCookie = cookies
    .split(";")
    .find((cookie) => cookie.trim().startsWith("Token="));

  const tokenValue = tokenCookie.split("=")[1];

  return isAdmin(tokenValue);
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CookiesProvider>
      <Router>
        <Menu />
        <div className="pages">
          <Routes>
            <Route path="/" element={<ListPosts />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/post/:postId" element={<DetailPost />} />
            <Route path="/editPost/:postId" element={<EditPost />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/users" element={<User />} />
            <Route path="/admin" element={<Admin />} />
            {/* {PrivateRoute() ? (<Route path="/users" element={<User />} />) : <Route path="/*" element={<Error />} />} */}
            <Route path="/*" element={<Error />} />
          </Routes>
        </div>
      </Router>
    </CookiesProvider>
  </React.StrictMode>
);
