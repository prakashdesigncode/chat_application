import React, { useState, useEffect, useMemo, useContext } from "react";
import { fromJS, Map } from "immutable";
import { SearchingIcon, UserSwitchIcon } from "hugeicons-react";
import { users } from "../StaticAssets/data";
import { useInputHook, useQueryParams } from "../Hooks/CustomHooks";
import { MessageContext } from "..";

/*-----------------------------------------------COMPOUND START----------------------------------------------*/
const Index = () => {
  const [userList, setUserList] = useState(fromJS(users));
  const [params, handleParams] = useQueryParams();
  const [search, handleSearch] = useInputHook("");
  const selectedUser = params.get("userId");
  const { currentUser, setCurrentUser } = useContext(MessageContext);

  const handleChangeChat = (userId) => handleParams({ userId });
  const handleSwitch = (userId) => {
    setCurrentUser(userId);
    handleParams({})
  };

  const filteredUser = useMemo(() => {
    let filtered = userList.filter(
      (user, key) =>
        (user.get("name").toLowerCase().includes(search.toLowerCase()) ||
          key === search) &&
        !user.get("enable", false)
    );
    return filtered;
  }, [search, userList]);

  useEffect(() => {
    setUserList((previous) => {
      return previous.map((user, key) =>
        user.set("enable", String(key) === String(currentUser))
      );
    });
  }, [currentUser]);

  console.log(userList.toJS(), 40);

  return (
    <div className="dashboard px-4">
      <div className="header d-flex justify-content-between px-3 pt-4 pb-2">
        <h5>Messages</h5>
        <div className="user-input d-flex align-items-center ">
          <input
            className="message-input flex-grow-1"
            placeholder="Message"
            onChange={handleSearch}
            value={search}
          />
          <SearchingIcon
            size={30}
            color={"#ffffff"}
            variant={"stroke"}
            className="mx-2"
          />
        </div>
      </div>
      <div className="recent d-flex justify-content-between align-items-center pt-3 px-3">
        <h6>RECENT</h6>
        <div
          data-bs-toggle="tooltip"
          className="switch-user"
          title="Switch User"
        >
          <div className="switch">
            <UserSwitchIcon
              size={24}
              color={"#ffffff"}
              variant={"stroke"}
              className="mx-3 mb-2 switch"
            />
            <div className="user-list">
              {filteredUser.entrySeq().map(([key, value], index) => {
                return (
                  <div
                    key={index}
                    onClick={() => handleSwitch(key)}
                    className="my-3 text-white cursor-pointer"
                  >
                    {value.get("name", "Unkown User")}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="chats mt-4 text-danger pt-3 pb-5 ">
        {filteredUser.entrySeq().map(([key, value], index) => {
          const ifSelectedUser = selectedUser === key;
          return (
            <div
              className={`user-card d-flex gap-3 mb-2 cursor-pointer  px-3 ${
                ifSelectedUser && "selected-user"
              }`}
              key={index}
              onClick={() => handleChangeChat(key)}
            >
              <img className="user-image" src={value.get("url", "")} />
              <div className="user-details">
                <div className="text-white">
                  {value.get("name", "Unkown User")}
                </div>
                <div className="text-secondary">Avalable</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Index;

/*-----------------------------------------------COMPOUND END----------------------------------------------*/
