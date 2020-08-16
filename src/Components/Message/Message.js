import React from "react";
import { Avatar, Paper } from "@material-ui/core";
import { useStateValue } from "../StateProvider";

import "./Message.css";
const Message = ({ message, uid, imageUrl }) => {
  const [{ currentUser }] = useStateValue();
  const isCurrentUser = currentUser.uid === uid;
  return (
    <div className={`message ${isCurrentUser && "current"}`}>
      <Avatar src={imageUrl} className="message__avatar" />
      <Paper elevation={2} className="message__text">
        {message}
      </Paper>
    </div>
  );
};

export default Message;
