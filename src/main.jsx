import React from "react";
import ReactDOM from "react-dom/client";
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Route } from "react-router";

import { Provider } from "react";
import store from "./store/store.jsx";

import App from "./App.jsx";
import ErrorPage from "./pages/error.jsx";
import DefaultPage from "./pages/default.jsx";
import SearchResult from "./pages/search-result.jsx";
import CatePost from "./pages/post.jsx";
import UsersPage from "./pages/users.jsx";
import FilesPage from "./pages/files.jsx";

import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />} errorElement={<ErrorPage />}>
      <Route index path="/" element={<DefaultPage />} />
      <Route path="/search-result" element={<SearchResult />} />
      <Route path="/:cateId" element={<CatePost />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/files" element={<FilesPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
