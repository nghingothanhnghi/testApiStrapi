import React from "react";
import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
} from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./store/store.jsx";
import { ToastProvider } from "./contexts/ToastContext";
import App from "./App.jsx";

import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToastProvider>
          <App />
        </ToastProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// ReactDOM.createRoot(document.getElementById("root")).render(
//       <React.StrictMode>
//       <Provider store={store}>
//           <BrowserRouter>
//             <App/>
//           </BrowserRouter>
//       </Provider>
//   </React.StrictMode>
// );
