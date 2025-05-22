import React from "react";
import { useFullScreen } from "../Hooks/CustomHooks.js";
import "../Styles/Chat.scss";
import { SuspenseCall } from "../Utils/ReactUtile.jsx";

const UserList = React.lazy(() => import("../Compounds/UserList.jsx"));
const ChatUser = React.lazy(() => import("../Compounds/UserChat.jsx"));

const Index = () => {
  useFullScreen("dashboardRef");
  return (
    <div className="d-flex" id="dashboardRef">
      <SuspenseCall>
        <UserList />
      </SuspenseCall>
      <SuspenseCall>
        <ChatUser />
      </SuspenseCall>
    </div>
  );
};

export default Index;
