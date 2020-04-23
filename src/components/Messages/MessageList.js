import React from "react";
import { MDBListGroup } from "mdbreact";
import MessageItem from "./MessageItem";

const MessageList = ({
  authUser,
  messages,
  onEditMessage,
  onRemoveMessage,
}) => {
  return (
    <MDBListGroup style={{ width: "68%" }}>
      {messages.map((message) => (
        <MessageItem
          authUser={authUser}
          key={message.uid}
          message={message}
          onEditMessage={onEditMessage}
          onRemoveMessage={onRemoveMessage}
        />
      ))}
    </MDBListGroup>
  );
};

export default MessageList;
