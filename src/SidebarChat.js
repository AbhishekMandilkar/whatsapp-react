import React, { useState, useEffect } from "react";
import "./SidebarChat.css";

import { Avatar } from "@material-ui/core";

function SidebarChat({ addNewChat }) {
  const [seed, setSeed] = useState("");
  const createChat = () => {
    const roomName = prompt("Please enter name for chat");

    if (roomName) {
      //some stuff rel to db
    }
  };

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 100));
  }, []);

  return !addNewChat ? (
    <div className="sidebarChat">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <div className="chat_info">
        <h2>Room Name</h2>
        <p>Last msg....</p>
      </div>
    </div>
  ) : (
    <div className="sidebarChat" onClick={createChat}>
      <h2>Add new Chat</h2>
    </div>
  );
}

export default SidebarChat;
