import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SidebarChat.css";
import db from "./firebase";

import { Avatar } from "@material-ui/core";

function SidebarChat({ addNewChat, id, name }) {
  const [seed, setSeed] = useState("");
  const createChat = () => {
    const roomName = prompt("Please enter name for chat");

    if (roomName) {
      db.collection("rooms").add({ name: roomName });
    }
  };

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 100));
  }, []);

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat_info">
          <h2>{name}</h2>
          <p>Last msg....</p>
        </div>
      </div>
    </Link>
  ) : (
    <div className="sidebarChat" onClick={createChat}>
      <h2>Add new Chat</h2>
    </div>
  );
}

export default SidebarChat;
