import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Route } from "react-router"


import App from './App.jsx';
import DefaultPage from './pages/default.jsx';
import CatePost from './post.jsx';
import './index.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route
       index
        path="/"
        element={<DefaultPage />}
      />
      <Route
        path="/:cateId"
        element={<CatePost />}
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);