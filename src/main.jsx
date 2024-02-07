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
import Favorites from "./pages/favorites/Favorites"
import CreatePost from "./pages/createPost/CreatePost";
import { CustomTokenContextProvider } from "./utils/TokenContext";
import isAdmin from "./utils/isAdmin";
import EditPost from "./pages/editPost/editPost";

const PrivateRoute = () => {
  const localStorageData = localStorage.getItem('token');

  return isAdmin(localStorageData);
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <CustomTokenContextProvider>
        <Menu />
        <div className="pages" id="pages">
          <Routes>
            <Route path="/" element={<ListPosts />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/post/:postId" element={<DetailPost />} />
            <Route path="/editPost/:postId" element={<EditPost />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            {PrivateRoute() ? (<Route path="/admin" element={<Admin />} />) : <Route path="/*" element={<Error />} />}
            {PrivateRoute() ? (<Route path="/users" element={<User />} />) : <Route path="/*" element={<Error />} />}
            <Route path="/*" element={<Error />} />
          </Routes>
        </div>
      </CustomTokenContextProvider>
    </Router>
  </React.StrictMode>
);
