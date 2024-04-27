import {
  Avatar,
  Container,
  Stack,
  Typography,
  TextField,
  IconButton,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import React, { useContext, useEffect, useState, useRef } from "react";
import MessageBox from "../extracomponents/MessageBox";
import SendIcon from "@mui/icons-material/Send";
import { UserContext } from "../extracomponents/Context";
import axios from "axios";
import { SocketContext } from "../extracomponents/SocketContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import chatBackground from "../Images/chatBackground.jpg";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import toast from "react-hot-toast";

const Messages = () => {
  const {
    setMessages,
    messages,
    selectedConversation,
    setSelectedConversation,
  } = useContext(UserContext);
  const { onlineUsers } = useContext(SocketContext);
  const [messageValue, setMessageValue] = useState("");
  const [trigger, setTrigger] = useState(0);
  const [loading, setLoading] = useState(false);
  const [messageLoad, setMessageLoad] = useState(false);
  const endOfMessagesRef = useRef(null);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setMessageLoad(true);
    try {
      const config = {
        withCredentials: true,
      };
      const { data } = await axios.post(
        `https://shintext.onrender.com/api/chat/message/${selectedConversation._id}`,
        { textmessage: messageValue },
        config
      );
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data);
        setTrigger(trigger + 1);
        setMessageValue("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setMessageLoad(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [selectedConversation?._id, messages]);

  useEffect(() => {
    setMessages([]);
  }, [selectedConversation?._id]);

  useEffect(() => {
    const handleOnClick = async () => {
      setLoading(true);
      if (selectedConversation) {
        try {
          const config = {
            withCredentials: true,
          };
          const { data } = await axios.get(
            `https://shintext.onrender.com/api/chat/getconvo/${selectedConversation?._id}`,
            config
          );
          if (data.error) {
            console.log(data.error);
          } else {
            if (data.length > 0) {
              setMessages(data);
            } else {
              setMessages([]);
            }
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    };
    handleOnClick();
  }, [trigger, setMessages, selectedConversation?._id]);
  const isOnline = onlineUsers.includes(selectedConversation?._id);

  return (
    <div
      style={{
        width: "100%",
        padding: 0,
      }}
    >
      {loading && <LinearProgress color="secondary" />}
      {selectedConversation ? (
        <Container
          sx={{
            overflow: "hidden",
            height: "calc(100vh - 4rem)",
            width: "100%",
            padding: 0,
          }}
        >
          {/* Header Box: Fixed height */}
          <Container
            px={0}
            py={0}
            sx={{
              bgcolor: "rgb(255, 255, 255 , 0)",
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              height: "8%",
              color: "white",
            }}
          >
            <Stack
              sx={{
                marginTop: 1,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
              }}
            >
              <IconButton
                sx={{
                  display: { sm: "none" },
                }}
                onClick={() => {
                  setSelectedConversation();
                }}
              >
                <ArrowBackIcon
                  sx={{
                    color: "white",
                  }}
                />
              </IconButton>
              <Avatar alt="Image" src={selectedConversation?.avatar?.url} />

              <Typography variant="h6">
                {selectedConversation?.username}
              </Typography>
            </Stack>
            {isOnline ? (
              <Typography
                sx={{
                  position: "absolute",
                  right: "2rem",
                  top: "5rem",
                  color: "greenyellow",
                }}
              >
                online
              </Typography>
            ) : (
              <Typography
                sx={{
                  position: "absolute",
                  right: "2rem",
                  top: "5rem",
                  color: "red",
                }}
              >
                offline{" "}
              </Typography>
            )}
          </Container>

          {/* Middle Box: Flexible space */}
          <Container
            p={3}
            sx={{
              height: "80%", // Adjust based on the total height of Box 1 and Box 3
              bgcolor: "#fff",
              overflowY: "auto",
              paddingTop: "1rem",
              backgroundImage: `url(${chatBackground})`,
              backgroundSize: "cover", // Cover the entire Box area
              backgroundPosition: "center",
              color: "white",
            }}
          >
            {messages.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column" }}>
                {messages?.map((items) => {
                  return <MessageBox message={items} key={items._id} />;
                })}
                <div ref={endOfMessagesRef}></div>
              </div>
            ) : (
              <Container
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    zIndex: 1500,
                    color: "rgba(255 ,255 , 255 , 0.8)",
                  }}
                >
                  You did't send any text yet!!!
                </Typography>
              </Container>
            )}
          </Container>

          {/* Footer Box: Fixed height */}
          <Container
            p={2}
            px={6}
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              bgcolor: "rgb(255, 255, 255 , 0)",
              height: "10%", // Height is set to 5rem
              width: "100%",
            }}
          >
            <form
              onSubmit={handleSendMessage}
              style={{
                width: "100%",
              }}
            >
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 2,
                  marginBottom: 0,
                  width: "100%",
                }}
              >
                <TextField
                  id="filled-search"
                  label="Send Message"
                  type="text"
                  variant="filled"
                  size="small"
                  value={messageValue}
                  onChange={(e) => setMessageValue(e.target.value)}
                  fullWidth
                  sx={{
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
                {messageLoad ? (
                  <CircularProgress color="secondary" />
                ) : (
                  <IconButton
                    sx={{
                      marginLeft: 2,
                      color: "white",
                    }}
                    type="submit"
                  >
                    <SendIcon
                      sx={{
                        width: "1.5rem",
                        height: "1.5rem",
                      }}
                    />
                  </IconButton>
                )}
              </Stack>
            </form>
          </Container>
        </Container>
      ) : (
        <Container
          sx={{
            height: "calc(100vh - 4rem)",
            bgcolor: "rgba(255 ,255 , 255 , 0)",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ChatBubbleOutlineIcon
              sx={{
                width: "3rem",
                height: "3rem",
              }}
            />
            <Typography variant="h6">
              Select a Conversation to Start Messaging !!
            </Typography>
          </Stack>
        </Container>
      )}
    </div>
  );
};

export default Messages;
