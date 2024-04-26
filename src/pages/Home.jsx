import React, { useContext, useState } from "react";
import { Grid, IconButton, Container, Paper } from "@mui/material";
import { UserContext } from "../extracomponents/Context";
import Header from "../Components/Header";
import Conversation from "../Components/Conversation";
import Messages from "../Components/Messages";
import UsersList from "../extracomponents/UsersList";
import CancelIcon from "@mui/icons-material/Cancel";
import Profile from "../Components/Profile";

const Home = () => {
  const { selectedConversation, convos } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [addCoanversation, setAddConversation] = useState(false);
  const [profile, setProfile] = useState(false);

  const [trigger, setTrigger] = useState(0);

  return (
    <div className="h-screen w-full">
      <Header setProfile={setProfile} />
      {profile && <Profile />}
      {addCoanversation ? (
        <div>
          <Container
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 10,
            }}
          >
            <Paper
              p={0}
              sx={{
                display: "flex",
                height: "50%",
                flexDirection: "column",
                borderRadius: "2rem",
                zIndex: 1500,
              }}
            >
              <IconButton
                sx={{
                  position: "absolute",
                  top: "0.2rem",
                  right: "3rem",
                  color: "red",
                }}
                onClick={() => setAddConversation(false)}
              >
                <CancelIcon
                  sx={{
                    width: "2rem",
                    height: "2rem",
                  }}
                />
              </IconButton>

              <UsersList
                users={users}
                trigger={trigger}
                setState={setTrigger}
                setPopup={setAddConversation}
                convos={convos}
              />
            </Paper>
          </Container>
        </div>
      ) : (
        <div></div>
      )}

      <Grid
        container
        height={"calc(100vh - 4rem)"}
        sx={{
          padding: 0,
        }}
      >
        <Grid
          item
          xs={12} // Takes full width on extra small to small screens
          sm={4} // Takes half width starting from small screens
          padding={0}
          sx={{
            display: { xs: selectedConversation ? "none" : "flex", sm: "flex" },
            height: "100%",
            bgcolor: "rgba(20,22,25 , 0.7)",
            padding: 0,
          }}
        >
          <Conversation
            trigger={trigger}
            setTrigger={setTrigger}
            addCoanversation={addCoanversation}
            setAddConversation={setAddConversation}
            users={users}
            setUsers={setUsers}
          />
        </Grid>
        <Grid
          item
          xs={12} // Takes full width on extra small to small screens when active
          sm={8} // Takes half width starting from small screens
          sx={{
            display: { xs: selectedConversation ? "flex" : "none", sm: "flex" },
            height: "100%",
            paddingX: 0,
            bgcolor: "rgba(0,0,0,0.6)",
          }}
        >
          <Messages />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
