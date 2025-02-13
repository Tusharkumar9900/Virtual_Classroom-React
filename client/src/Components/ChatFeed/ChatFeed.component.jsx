// react libraries
import React from "react";
import { useNavigate } from "react-router-dom";

// components
import MyMsg from "../MyMsg/MyMsg.component";
import TheirMsg from "../TheirMsg/TheirMsg.component";
import MsgForm from "../MsgForm/MsgForm.component";
import MeetMsg from "./../MeetMsg/MeetMsg.component";

// External CSS
import "./ChatFeed.styles.css";

import HomeIcon from "@material-ui/icons/Home";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

const ChatFeed = (props) => {
  const navigate = useNavigate();

  // props send by react chat engine
  // cannot alter the name
  const { chats, activeChat, userName, messages } = props;

  const chat = chats && chats[activeChat]; // to see we have any chat in the room or not

  // This function will render messages received as props
  // check for sender is it same as the currently logged userName or different
  // based on this render 2 different components with their own styling

  const renderMsg = () => {
    const keys = Object.keys(messages); // holds the key for every msg
    return keys.map((key, index) => {
      // create 2 var one for object of message and other to format text from msgObj
      var msgObj = messages[key];

      // remove <p> and </p> tag from text
      var conMsg = String(msgObj.text);
      conMsg = conMsg.replace("</p>", "");
      conMsg = conMsg.replace("<p>", "");

      // helps the app to find the last message in continuation by the sender
      const lastMsgKey = index === 0 ? null : keys[index - 1];

      // identify the current msg is send by user or what holds boolean value
      const isSenderMsg = userName === msgObj.sender.username;

      const checkMeet = msgObj.text.split("@")[0] === "meet";

      // render messages based on sender
      return (
        <div key={`msg_${index}`} style={{ width: "100%" }}>
          {checkMeet ? (
            <MeetMsg
              msgObj={msgObj}
              isSenderMsg={isSenderMsg}
              chatId={activeChat}
            />
          ) : (
            <div className="message-block">
              {isSenderMsg ? ( // conditional rendering of msg if send by currently logged user float it to right else left
                <MyMsg msgObj={msgObj} conMsg={conMsg} />
              ) : (
                <TheirMsg
                  msgObj={msgObj}
                  lastMessage={messages[lastMsgKey]}
                  conMsg={conMsg}
                />
              )}
            </div>
          )}
        </div>
      );
    });
  };

  const goHome = () => {
    navigate("/dashboard");
  };
  if (!chat) return <div />;

  return (
    <div className="chatFeed">
      <div className="chatTitleContainer">
        <div className="chatTitle">
          <Tooltip
            title="Go To Dashboard"
            TransitionComponent={Zoom}
            placement="right"
          >
            <HomeIcon
              onClick={goHome}
              style={{ fontSize: 35, cursor: "pointer" }}
            />
          </Tooltip>

          {chat?.title}
        </div>
      </div>
      {renderMsg()}
      <div style={{ height: "100px" }} />
      <div className="messageFormContainer">
        <MsgForm {...props} chatId={activeChat} />
      </div>
    </div>
  );
};

export default ChatFeed;
