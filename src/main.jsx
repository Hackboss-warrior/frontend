import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router,  Route, Routes } from "react-router-dom";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import "./index.css";
import ListPosts from "./pages/listPosts/listPosts";
import DetailPost from "./pages/detailPost/detailPost";
import Profile from "./pages/UserProfile/Profile";
import Contact from "./pages/Contact/Contact";
import Error from "./pages/Error/Error"
import Admin from "./pages/Admin/Admin";
import Menu from "./components/Menu";
import About from "./pages/about/About";
import CreatePost from "./pages/createPost/CreatePost";
import { CookiesProvider } from 'react-cookie';

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
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </div>
    </Router>
    </CookiesProvider>
  </React.StrictMode>
);