import React, { useState, useEffect, useMemo } from "react";
import { fromJS } from "immutable";
import { SearchingIcon ,UserSwitchIcon} from "hugeicons-react";
import { users } from "../StaticAssets/data";
import {
  useInputHook,
  useQueryParams,
} from "../Hooks/CustomHooks";


/*-----------------------------------------------COMPOUND START----------------------------------------------*/
const Index = () => {
  const [userList, setUserList] = useState(fromJS(users));
  const [currentUser, setCurrentUser] = useState("1");
  const [params, handleParams] = useQueryParams();
  const [search, handleSearch] = useInputHook("");
  const selectedUser = params.get('userId');
  
  const handleChangeChat = (userId) => handleParams({ userId });

  const filteredUser = useMemo(() => {
    let filtered = userList.filter(
      (user, key) =>
        user.get("name").toLowerCase().includes(search.toLowerCase()) ||
        key === search
    );
    return filtered;
  }, [search, userList]);

  useEffect(() => {
    setUserList((previous) => {
      let updated = previous;
      updated = updated.delete(currentUser);
      return updated;
    });
  }, []); 

  return (
    <div className="dashboard px-4">
      <div className="header d-flex justify-content-between px-3 pt-4 pb-2">
        <h5>Messages</h5>
        <div className="user-input d-flex align-items-center mx-3 ">
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
      <div className="recent d-flex align-items-center px-3">
        <h6>RECENT</h6>
        <div data-bs-toggle="tooltip" title="Switch User">
        <UserSwitchIcon size={24}   color={"#ffffff"}
            variant={"stroke"}
            className="mx-2 mb-2"/>
      </div>
      </div>
      <div className="chats mt-4 text-danger pt-3 pb-5 ">
        {filteredUser.entrySeq().map(([key, value], index) => {
          const ifSelectedUser = selectedUser===key
          return (
            <div
              className={`user-card d-flex gap-3 mb-2 cursor-pointer  px-3 ${ifSelectedUser &&'selected-user'}`}
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

