import React, { useContext, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { UserContext } from "../extracomponents/Context";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = ({ setProfile }) => {
  const { authUser, setAuthUser } = useContext(UserContext);
  const [dialog, setDialog] = useState(false);
  const navigate = useNavigate();
  const ClosePopUp = () => {
    setDialog(false);
  };
  const deleteAccount = async () => {
    try {
      const config = {
        withCredentials: true,
      };
      const { data } = await axios.delete(
        `https://shintext.onrender.com/api/chat/deleteacc`,
        config
      );

      if (data.error) {
        toast.error(data.error, {
          style: { backgroundColor: "rgba(20,22,25 , 0.4)", color: "white" },
        });
      } else {
        setAuthUser(null);
        localStorage.removeItem("chat-user");
        navigate("/login");
        toast.success("Account is Deleted");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDialog(false);
    }
  };
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 10,
      }}
    >
      {dialog && (
        <Dialog
          open
          //   onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are You sure you want to delete This Account?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              All the data of this Account will be deleted including
              Conversation and Messages
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={ClosePopUp}>Cancel</Button>
            <Button
              sx={{
                color: "red",
              }}
              autoFocus
              onClick={deleteAccount}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Card sx={{ maxWidth: 390 }}>
        <IconButton
          sx={{
            bgcolor: "white",
            color: "black",
            position: "absolute",
            top: 5,
            left: 5,
            "&:hover": {
              bgcolor: "white",
            },
          }}
          onClick={() => setProfile(false)}
        >
          <ArrowBackIcon />
        </IconButton>

        <CardMedia
          sx={{ height: 320, objectFit: "contain" }}
          image={authUser.avatar?.url}
          title="Profile"
        />
        <CardContent>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Typography gutterBottom variant="h5" component="div">
              USERNAME:
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                marginLeft: 2,
              }}
            >
              {authUser.username.toUpperCase()}
            </Typography>
          </Stack>
          <Typography gutterBottom color="text.secondary" component="div">
            {authUser.email}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            sx={{
              color: "red",
            }}
            fullWidth
            onClick={() => setDialog(true)}
          >
            <DeleteOutlineIcon color="red" />
            Delete This Account
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Profile;
