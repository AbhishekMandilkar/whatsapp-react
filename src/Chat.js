import { Avatar, IconButton } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./Chat.css";

import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";

function Chat() {
  const [seed, setSeed] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 100));
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    console.log("typed ::::", msg);
  };

  return (
    <div className="chat">
      <div className="chat-header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat-header-info">
          <h3>Room Name</h3>
          <p>Last seen</p>
        </div>
        <div className="chat-header-icons">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat-body">
        <p className={`chat-msg ${true && "chat-msg-rev"}`}>
          <span className="chat-name">Abhishek</span>
          Hey guyz
          <span className="chat-timestamp">19:20</span>
        </p>
      </div>
      <div className="chat-footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={msg}
            onChange={(e) => {
              setMsg(e.target.value);
            }}
            type="text"
            placeholder="Type a message"
          />
          <button type="submit" onClick={sendMessage}>
            Send Message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
