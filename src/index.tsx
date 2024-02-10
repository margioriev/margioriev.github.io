import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/Error";
import "./i18n"; // import i18n (needs to be bundled ;))
import { ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
import { Boda } from "./pages/Boda";


const router = createBrowserRouter([
  {
    path: "/",
    element: <><ColorModeScript initialColorMode={theme.config.initialColorMode} /><App /></>,
    errorElement: <ErrorPage />,
  }
]);

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
reportWebVitals();
