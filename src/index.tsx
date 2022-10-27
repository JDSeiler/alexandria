import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout";
import Login from "./scenes/login";
import CreateAccount from "./scenes/create-account";
import AuthGate from "./components/AuthGate";
// import reportWebVitals from "./reportWebVitals";

/*
K, I need some routes... 
I'm missing the backend API route for checking if the user is logged in.
So we're going to skip gluing together for now and just work on the UI
for now.

Or, I can just mock the backend code....
*/

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/login" element={<Login />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route element={<AuthGate />}>
        <Route path="/" element={<App />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
