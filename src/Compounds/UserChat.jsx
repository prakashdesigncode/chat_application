import React, { useEffect, useState, useRef, useContext } from "react";
import { fromJS, List, Map } from "immutable";
import { SentIcon } from "hugeicons-react";
import {
  useBooleanHook,
  useInputHook,
  useQueryParams,
  useScrollIntoView,
} from "../Hooks/CustomHooks";
import { users } from "../StaticAssets/data";
import moment from "moment";
import { MessageContext } from "..";

/*-----------------------------------------------COMPOUND START----------------------------------------------------*/
const Index = () => {
  const [showChat, handleShowChat] = useBooleanHook();
  const [params] = useQueryParams();
  const userId = params.get("userId") || "1";
  const [localMessages, setLocalMesssages] = useState(fromJS([]));
  const { currentUser} = useContext(MessageContext);
  const param = { userId, showChat, localMessages, setLocalMesssages,currentUser};

  useEffect(() => {
    handleShowChat(Boolean(params.get("userId")));
  }, [params]);

  return (
    <div className="chat d-flex flex-column">
      <Header {...param} />
      <MessageBody {...param} />
      <FooterInput {...param} />
    </div>
  );
};

export default Index;

/*-----------------------------------------------COMPOUND END-------------------------------------------------*/

/*-----------------------------------------------UTILS COMPOUND START----------------------------------------------*/

const Header = ({ showChat, userId ,currentUser}) => {
  return (
    <div className="d-flex justify-content-between align-items-center mt-4 mx-3">
      {showChat && (
        <div className="d-flex gap-3">
          <img className="user-image" src={users[userId].url} />
          <div className="text-white align-self-center">
            {users[userId].name}
          </div>
        </div>
      )}
      <div className="d-flex gap-3 align-self-end">
        <div className="text-white align-self-center">{users[currentUser].name}</div>
        <img className="user-image" src={users[currentUser].url} />
      </div>
    </div>
  );
};

const MessageBody = ({
  showChat,
  userId,
  setLocalMesssages,
  localMessages,
  currentUser
}) => {
  const { gobalMessages, setGobalMessages } = useContext(MessageContext);
  let scrollScreen = useRef(null);
  useScrollIntoView(scrollScreen);

  useEffect(() => {
    if (userId) setLocalMesssages(gobalMessages.getIn([currentUser, userId], List()));
  }, [userId,currentUser]);

  useEffect(() => {
    setGobalMessages((previous) =>
      previous.setIn([currentUser, userId], fromJS(localMessages)).setIn([userId,currentUser],fromJS(localMessages))
    );
  }, [localMessages,currentUser]);

  return (
    <div className="message-list  mx-3 mt-2">
      {showChat ? (
        <>
          {localMessages.map((message, index) => {
            const userId = message.get("id", "");
            const time = moment(message.get("time", "")).calendar();
            const data = message.get("message", "");
            const sameId = currentUser === userId;
            const insertToRef = index === localMessages.size - 1;
            return (
              <div
                className="message-card d-flex flex-column mx-5  my-2"
                ref={insertToRef ? scrollScreen : null}
                key={index}
              >
                <div
                  className={`user-details text-secondary  ${
                    sameId && "text-end"
                  }`}
                >
                  {time}
                </div>
                <div className={`${sameId && "text-end"}`}>
                  <div
                    className={`${
                      !sameId ? "form-message my-2  " : "to-message my-2"
                    }`}
                  >
                    {data}
                  </div>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div className="text-secondary d-flex justify-content-center align-items-center h-100">
          No User Selected For Chat.
        </div>
      )}
    </div>
  );
};

const FooterInput = ({ setLocalMesssages, showChat ,currentUser}) => {
  const [chatInput, handleChange] = useInputHook("");

  const handleSend = () => {
    setLocalMesssages((previous) =>
      previous.push(
        Map({
          message: chatInput,
          id: currentUser,
          time: new Date(),
        })
      )
    );
    handleChange({ target: { value: "" } });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && chatInput) {
      handleSend();
    }
  };

  return (
    <>
      {showChat && (
        <div className="user-input d-flex align-items-center mx-3 mb-5">
          <input
            className="message-input flex-grow-1 px-4 py-2 bg-gray-800 text-white rounded-lg"
            placeholder="Message"
            onChange={handleChange}
            value={chatInput}
            onKeyDown={handleKeyDown}
          />
          <SentIcon
            onClick={handleSend}
            className="mx-3 send-icon"
            size={24}
            color={"#9fa1a7"}
            variant={"stroke"}
          />
        </div>
      )}
    </>
  );
};

/*-----------------------------------------------UTILS COMPOUND END----------------------------------------------*/
