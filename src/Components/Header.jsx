import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Tooltip,
  Backdrop,
  LinearProgress,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { UserContext } from "../extracomponents/Context";
import LoginIcon from "@mui/icons-material/Login";
import axios from "axios";
import TextsmsIcon from "@mui/icons-material/Textsms";
import toast from "react-hot-toast";

const Header = ({ setProfile }) => {
  const { authUser, setAuthUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const handleLogOut = async () => {
    setLoading(true);
    try {
      const config = {
        withCredentials: true,
      };
      const { data } = await axios.get(
        `${window.location.origin}/api/auth/logout`,
        config
      );
      if (data.error) {
        console.log(data.error);
      } else {
        localStorage.removeItem("chat-user");
        setAuthUser();
        toast.success("Successfully logedout");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading && (
        <Backdrop
          open
          sx={{
            zIndex: 1500,
          }}
        />
      )}
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
      <AppBar
        position="static"
        sx={{
          height: "4rem",
          bgcolor: "rgba(0,0,0,0.6)",
        }}
      >
        <Container
          maxWidth="xs"
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
          fullWidth
        >
          <Toolbar
            sx={{
              position: "absolute",
              left: { xs: "0.5rem", sm: "2rem" },
            }}
          >
            <TextsmsIcon sx={{ mr: 1, mt: { xs: "0.5rem", sm: 0 } }} />
            <Typography
              variant="h6"
              sx={{
                marginTop: { xs: "0.5rem", sm: "0" },
              }}
            >
              ShinTexT
            </Typography>
          </Toolbar>
          <Tooltip fullWidth>
            <IconButton
              sx={{
                p: 1.5,
                position: "absolute",
                right: { xs: "3rem", sm: "6.5rem" },
              }}
              onClick={() => setProfile(true)}
            >
              <Avatar alt="Remy Sharp" src={authUser.avatar?.url} />
            </IconButton>
            <IconButton
              sx={{
                p: 2.25,
                position: "absolute",
                color: "white",
                right: "0.75rem",
              }}
              onClick={handleLogOut}
            >
              <LoginIcon />
              <Typography
                sx={{
                  display: { xs: "none", sm: "flex" },
                }}
              >
                Logout
              </Typography>
            </IconButton>
          </Tooltip>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
