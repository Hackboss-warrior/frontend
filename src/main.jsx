import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import "./index.css";
import ListPosts from "./pages/listPosts/listPosts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ListPosts />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
