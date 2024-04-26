import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Tooltip,
  IconButton,
  TextField,
  Divider,
  LinearProgress,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../extracomponents/Context.jsx";
import PropTypes from "prop-types";
import { SocketContext } from "../extracomponents/SocketContext.jsx";
import { StyledBadge } from "../Styles/StylesComponent.jsx";
import AddCommentIcon from "@mui/icons-material/AddComment";

const Conversation = ({
  trigger,
  setAddConversation,
  setUsers,
  setTrigger,
}) => {
  const {
    setMessages,
    messages,
    selectedConversation,
    setSelectedConversation,
    receiver,
    setReceiver,
    convos,
    SetConvos,
  } = useContext(UserContext);

  const { onlineUsers } = useContext(SocketContext);
  const { socket } = useContext(SocketContext);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    socket?.on("newMessage", (newmessage) => {
      const message = {
        sender_id: newmessage.sender_id,
        reciver_id: newmessage.reciver_id,
        message: newmessage.message,
        createdAt: newmessage.createdAt,
      };
      setTrigger(trigger + 1);

      if (selectedConversation._id === newmessage.sender_id) {
        setMessages([...messages, message]);
      }

      if (!receiver.includes(newmessage.senderId)) {
        setReceiver([...receiver, newmessage.senderId]);
        if (Notification.permission === "granted") {
          new Notification(newmessage.senderUsername, {
            body: newmessage.message,
            icon: newmessage.senderAvatar.url,
            tag: "My Message",
          });
        }
      }
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [
    socket,
    messages,
    setMessages,
    receiver,
    selectedConversation?._id,
    setReceiver,
  ]);

  useEffect(() => {
    Notification.requestPermission().then((perm) => {
      console.log(perm);
    });
  }, []);

  useEffect(() => {
    socket?.on("newConvo", (newconvo) => {
      SetConvos([...convos, newconvo]);
    });

    return () => {
      socket?.off("newConvo");
    };
  }, [socket, convos, SetConvos]);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const config = {
          withCredentials: true,
        };
        const { data } = await axios.get(
          `https://shintext.onrender.com/api/chat/getusers`,
          config
        );
        if (data.error) {
          console.log(data.error);
        } else {
          SetConvos(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, [trigger, SetConvos]);

  const handleAddConversation = async () => {
    setLoading(true);
    try {
      const config = {
        withCredentials: true,
      };
      setAddConversation(true);
      const { data } = await axios.get(
        `https://shintext.onrender.com/api/chat/getdata`,
        config
      );
      setUsers(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  Conversation.propTypes = {
    convos: PropTypes.array,
  };

  return (
    <>
      <Container
        sx={{
          width: "100%",
          height: "calc(100vh - 4rem)",
          paddingX: 0,
          color: "whitesmoke",
          overflowY: "auto",
        }}
      >
        <TextField
          id="filled-search"
          label="Search Contact"
          type="search"
          variant="filled"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          sx={{
            mt: 2,
            input: { color: "white" },
            label: { color: "rgba(255 ,255 , 255 ,0.4)" },
            "& label.Mui-focused": {
              color: "white", // White color for the label when the TextField is focused
            },
            "& .MuiInputBase-root": {
              backgroundColor: "rgba(255, 255, 255, 0.1)", // Darker background for the TextField
              color: "white", // White text color
              borderRadius: "13px",
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "white" },
              "&.Mui-focused fieldset": { borderColor: "white" },
            },
          }}
        />
        {loading && (
          <LinearProgress
            color="secondary"
            style={{
              position: "fixed",
              width: "100%",
              top: 0,
              left: 0,
              zIndex: 1500,
            }}
          />
        )}
        <List
          dense
          sx={{
            width: "100%",
            marginTop: 2,
          }}
        >
          {convos && Array.isArray(convos) ? (
            convos
              .filter((item) => {
                return search === ""
                  ? true // Return true for all items when search string is empty
                  : item?.username
                      ?.toLowerCase()
                      .startsWith(search.toLowerCase());
              })
              .map((items) => {
                const isSelected = selectedConversation?._id === items._id;
                const isNewMessage = receiver.includes(items._id);
                const isOnline = onlineUsers.includes(items._id);
                if (isSelected && isNewMessage) {
                  const index = receiver.indexOf(items._id);
                  receiver.splice(index, 1);
                }
                return (
                  <div key={items._id}>
                    <ListItem
                      fullWidth
                      sx={{
                        paddingX: 0,
                        bgcolor: isSelected
                          ? "rgba(255, 255, 255, 0.2)"
                          : "transparent",
                      }}
                      onClick={() => setSelectedConversation(items)}
                    >
                      <ListItemButton>
                        <ListItemAvatar>
                          {isOnline ? (
                            <StyledBadge
                              overlap="circular"
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                              }}
                              variant="dot"
                            >
                              <Avatar
                                sx={{ width: "3rem", height: "3rem" }}
                                src={items.avatar?.url}
                              />
                            </StyledBadge>
                          ) : (
                            <Avatar
                              sx={{ width: "3rem", height: "3rem" }}
                              src={items.avatar?.url}
                            />
                          )}
                        </ListItemAvatar>
                        <ListItemText>
                          <Typography
                            variant="h6"
                            sx={{
                              marginLeft: 1,
                              fontWeight: isNewMessage ? "bold" : "normal",
                            }}
                          >
                            {items.username}
                          </Typography>
                          {isNewMessage ? (
                            <Typography
                              sx={{ marginLeft: 1, fontWeight: "bold" }}
                            >
                              NewMessage
                            </Typography>
                          ) : (
                            <div></div>
                          )}
                        </ListItemText>
                      </ListItemButton>
                      <Divider />
                    </ListItem>
                    <Divider
                      component="li"
                      sx={{ borderColor: "rgba(255 ,255 ,255 , 0.2)" }}
                    />
                  </div>
                );
              })
          ) : (
            <ListItem>
              <ListItemText primary="No conversations available" />
            </ListItem>
          )}
        </List>
        <Tooltip sx={{ width: "100%" }}>
          <IconButton
            sx={{
              p: 1.5,
              position: "absolute",
              bottom: "4rem",
              left: "0.8rem",
              bgcolor: "rgba(255, 255, 255, 0.4)",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.6)",
              },
            }}
            onClick={handleAddConversation}
          >
            <AddCommentIcon
              sx={{
                color: "white",
              }}
            />
          </IconButton>
        </Tooltip>
      </Container>
    </>
  );
};

export default Conversation;
