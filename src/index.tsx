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
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { AuthProvider } from "./hooks/auth";
// import reportWebVitals from "./reportWebVitals";

// Created with the help of: https://bareynol.github.io/mui-theme-creator
// Very useful for previewing how all the colors will look together.
const customizedTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#689d6a",
    },
    secondary: {
      main: "#fabd2f",
    },
    background: {
      default: "#282828",
    },
    text: {
      primary: "#ffffff",
    },
    warning: {
      main: "#fe8019",
    },
  },
});

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
    <ThemeProvider theme={customizedTheme}>
      <CssBaseline />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
