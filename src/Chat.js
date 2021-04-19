import { Avatar, IconButton } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import db from "./firebase";
import firebase from "firebase";
import "./Chat.css";

import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";

function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const [room, setRoom] = useState("");
  const { roomId } = useParams();
  const [message, setMessage] = useState([]);
  const [{ user }] = useStateValue();

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoom(snapshot.data().name);
        });

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessage(snapshot.docs.map((doc) => doc.data()) ?? [{}])
        );
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 100));
  }, [roomId]);

  const sendMessage = (event) => {
    event.preventDefault();
    console.log("typed ::::", input);

    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat-header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat-header-info">
          <h3>{room}</h3>
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
        {message.map((message) => (
          <p className={`chat-msg ${true && "chat-msg-rev"}`}>
            <span className="chat-name">{message.name}</span>
            {message.message}
            <span className="chat-timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat-footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(e) => {
              setMessage(e.target.value);
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
