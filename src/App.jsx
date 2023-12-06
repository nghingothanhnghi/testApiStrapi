import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import ErrorPage from "./pages/error.jsx";
import DefaultPage from "./pages/default.jsx";
import SearchResult from "./pages/search-result.jsx";
import CatePost from "./pages/post.jsx";
import UsersPage from "./pages/users.jsx";
import FilesPage from "./pages/files.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/Register.jsx";
function App() {
  return (
    <>
      <Routes element={<App />} errorElement={<ErrorPage />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route index path="/" element={<DefaultPage />} />
        {/* <Route path="/search-result" element={<SearchResult />} />
      <Route path="/:cateId" element={<CatePost />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/files" element={<FilesPage />} /> */}
      </Routes>
    </>
  );
}

export default App;
