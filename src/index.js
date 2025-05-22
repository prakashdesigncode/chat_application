import React, { createContext, useState } from "react";
import { lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/scss/bootstrap.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { fromJS } from "immutable";
import { preLoadedMessages } from "./StaticAssets/data";
import { SuspenseCall } from "./Utiles/ReactUtile";

export const MessageContext = createContext();
const ChatMessage = lazy(() => import("./Dashboard/index"));

const ChatNavigation = () => {
  const [gobalMessages, setGobalMessages] = useState(fromJS(preLoadedMessages));
  return (
    <MessageContext.Provider value={{ gobalMessages, setGobalMessages }}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <SuspenseCall>
                <ChatMessage />
              </SuspenseCall>
            }
          />
        </Routes>
      </Router>
    </MessageContext.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ChatNavigation />);
