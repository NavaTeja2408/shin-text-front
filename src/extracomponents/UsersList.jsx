import {
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  TextField,
  ListItemIcon,
  Divider,
  LinearProgress,
} from "@mui/material";
import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "./Context";
import axios from "axios";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const UsersList = ({ users, trigger, setState, setPopup, convos }) => {
  const { authUser, setSelectedConversation } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const handleOnClick = async (items) => {
    setLoading(true);
    try {
      const config = {
        withCredentials: true,
      };
      const { data } = await axios.post(
        `${window.location.origin}/api/chat/coversation/${items._id}`,
        {},
        config
      );
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data);
        setState(trigger + 1);
        setPopup(false);
        setSelectedConversation(items);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container
        maxWidth="xs"
        sx={{
          marginTop: "2rem",
        }}
      >
        {loading && (
          <LinearProgress
            color="success"
            style={{
              position: "fixed",
              width: "100%",
              top: 0,
              left: 0,
              zIndex: 1500,
            }}
          />
        )}
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
            input: { color: "gray" },
            label: { color: "rgba(0 ,0 ,0 ,0.4)" },
            "& label.Mui-focused": {
              color: "gray", // White color for the label when the TextField is focused
            },
            "& .MuiInputBase-root": {
              backgroundColor: "rgba(0, 0, 0, 0.1)", // Darker background for the TextField
              color: "gray", // White text color
              borderRadius: "13px",
              "& fieldset": { borderColor: "gray" },
              "&:hover fieldset": { borderColor: "gray" },
              "&.Mui-focused fieldset": { borderColor: "gray" },
            },
          }}
        />

        <List
          dense
          sx={{
            width: "100%",
            height: "30vh",
            overflowY: "auto",
          }}
        >
          {users
            .filter((item) => {
              return (
                item._id !== authUser.id &&
                !convos.some((convo) => convo._id === item._id)
              );
            })
            .filter((item) => {
              return search === ""
                ? true // Return true for all items when search string is empty
                : item?.username
                    ?.toLowerCase()
                    .startsWith(search.toLowerCase());
            })
            .map((items) => {
              return (
                <>
                  <ListItem
                    fullWidth
                    onClick={() => handleOnClick(items)}
                    key={items._id}
                  >
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            width: "3rem",
                            height: "3rem",
                          }}
                          src={items.avatar?.url}
                        />
                      </ListItemAvatar>
                      <ListItemText>
                        <Typography variant="h6">{items.username}</Typography>
                      </ListItemText>
                      <ListItemIcon>
                        <AddCircleIcon
                          sx={{
                            color: "blueviolet",
                          }}
                        />
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                  <Divider component="li" />
                </>
              );
            })}
        </List>
      </Container>
    </>
  );
};

export default UsersList;
