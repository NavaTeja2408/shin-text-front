import { Typography, Stack } from "@mui/material";
import React, { useContext } from "react";
import { UserContext } from "./Context";

const MessageBox = ({ message }) => {
  const { authUser, selectedConversation } = useContext(UserContext);
  const fromMe = authUser.id === message.sender_id;
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <div
      style={{
        alignSelf: fromMe ? "flex-end" : "flex-start",
        backgroundColor: fromMe ? "rgba(0,0,0 , 1)" : "white", // Different color for sent messages
        color: fromMe ? "white" : "black",
        borderRadius: "15px",
        padding: "0.3rem 0.7rem",
        maxWidth: "55%", // Limits the width of each message bubble
        wordWrap: "break-word", // Ensures text breaks properly
        margin: "0.5rem",
        fontSize: "0.5rem",
      }}
    >
      <Stack>
        <Typography
          variant="caption"
          p={0}
          sx={{
            color: "orangered",
          }}
        >
          {fromMe ? authUser.username : selectedConversation?.username}
        </Typography>
        <Typography p={0}>{message.message}</Typography>
        {message.createdAt ? (
          <Typography
            variant="caption"
            sx={{
              color: fromMe
                ? "rgba(255 ,255 , 255 ,0.5)"
                : "rgba(0 ,0 , 0 ,0.5)",
            }}
          >
            {formatTime(message.createdAt)}
          </Typography>
        ) : (
          <div></div>
        )}
      </Stack>
    </div>
  );
};

export default MessageBox;
