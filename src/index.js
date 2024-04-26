import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";
import { UserContextProvider } from "./extracomponents/Context";
import { SocketContextProvider } from "./extracomponents/SocketContext";
import { Notifications } from "react-push-notification";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Notifications />
    <UserContextProvider>
      <SocketContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SocketContextProvider>
    </UserContextProvider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
