import React, { useState, useEffect } from "react";
import { useStateValue } from "../StateProvider";
import { Avatar, IconButton } from "@material-ui/core";
import { useParams } from "react-router-dom";
import Message from "../Message/Message";
import firebase from "firebase";
import db from "../firebase";
import "./Chat.css";
import SendIcon from '@material-ui/icons/Send';
const Chat = () => {
  const [{ users, currentUser }] = useStateValue();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const params = useParams();

  const secondUser = users.find((user) => user.uid === params.uid);

  // Useeffect for second user messages
  useEffect(() => {
    // Creating user data if not created (LoggedIn User)
    db.collection("users")
      .doc(currentUser?.uid)
      .collection("messageUsers")
      .doc(params.uid)
      .set(
        {
          ...secondUser,
        },
        { merge: true }
      );

    // Creating user data for secondUser
    db.collection("users")
      .doc(params.uid)
      .collection("messageUsers")
      .doc(currentUser?.uid)
      .set(
        {
          ...currentUser,
        },
        { merge: true }
      );
  }, [params]);

  useEffect(() => {
    db.collection("users")
      .doc(currentUser?.uid)
      .collection("messageUsers")
      .doc(params.uid)
      .collection("messages")
      .orderBy("timestamp")
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, [params]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // For second user
    const value = inputValue

    db.collection("users")
      .doc(params.uid)
      .collection("messageUsers")
      .doc(currentUser.uid)
      .collection("messages")
      .add({
        message: value,
        name: currentUser?.name,
        email: currentUser?.email,
        uid: currentUser?.uid,
        imageUrl: currentUser?.imageUrl,
        timestamp: firebase?.firestore.FieldValue.serverTimestamp(),
      });

    // For logged In User
    db.collection("users")
      .doc(currentUser.uid)
      .collection("messageUsers")
      .doc(params.uid)
      .collection("messages")
      .add({
        message: value,
        name: currentUser?.name,
        email: currentUser?.email,
        uid: currentUser?.uid,
        imageUrl: currentUser?.imageUrl,
        timestamp: firebase?.firestore.FieldValue.serverTimestamp(),
      });
    setInputValue('')
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={secondUser?.imageUrl} />
        <span>{secondUser?.name}</span>
      </div>
      <div className="chat__message">
        {
          messages.map(({ message, imageUrl, uid }, index) => (<Message
            key={index}
            imageUrl={imageUrl}
            uid={uid}
            message={message}
          />))
        }
      </div>
      <div className="chat__footer">
        <form className = "chat__form">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <IconButton type="submit" onClick={handleSubmit} disabled = {!inputValue}>
            <SendIcon />
          </IconButton>
        </form>
      </div>
    </div>
  );
};

export default Chat;
