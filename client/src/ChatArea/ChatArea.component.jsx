// react libraries
import React, { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";

// React chat engine components
import { ChatEngine } from "react-chat-engine";

// Components
import ChatFeed from "../Components/ChatFeed/ChatFeed.component.jsx";
// External CSS
import "./ChatArea.styles.css";
import "./ChatArea.essential.style.css";

import { MeetContext } from "../Context/meetContext.js";

const ChatArea = () => {
  const context = useContext(MeetContext);

  useEffect(() => {
    console.log("Context:", context); // Check the context object
    if (context) {
      console.log("Context values:", context); // Check the context values
      const { setVidState, setAudState, setScreenTrack } = context;
      console.log("setVidState:", setVidState); // Check individual context values
      console.log("setAudState:", setAudState);
      console.log("setScreenTrack:", setScreenTrack);
      
      // Use the context values as needed
      setVidState(true);
      setAudState(true);
      setScreenTrack(false);
    }
  }, [context]);
  return (
    // Chat engine parent element from react chatengine to render chat area
    <div className="chat-in-meet">
      <Helmet>
        <meta charSet="utf-8" />
        <title>MS TEAMS CHAT</title>
      </Helmet>
      <ChatEngine
        height="100vh"
        projectID={process.env.REACT_APP_PROJECT_ID}
        // get userName and password from local storage to avoid vanishing of states on page reload
        userName={localStorage.getItem("userName")}
        userSecret={localStorage.getItem("password")}
        // render custom made chat feed component with all the props provided
        renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
      />
    </div>
  );
};

export default ChatArea;
