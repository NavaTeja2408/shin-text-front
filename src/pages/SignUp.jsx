import React, { useState } from "react";
import axios from "axios";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { VisuallyHiddenIcon } from "../Styles/StylesComponent";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { useFileHandler } from "6pp";
import toast from "react-hot-toast";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const avatar = useFileHandler("single");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      withCredentials: true,
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    setLoading(true);
    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("cpassword", cpassword);
    try {
      const { data } = await axios.post(
        `https://shintext.onrender.com/api/auth/signup`,
        formData,
        config
      );
      if (data.error) {
        toast.error(data.error, {
          style: { backgroundColor: "rgba(20,22,25 , 0.4)", color: "white" },
        });
      } else {
        // localStorage.setItem("chat-user", JSON.stringify(data));
        // setAuthUser(data);
        toast.success("Login to Acess Account", {
          style: { backgroundColor: "rgba(20,22,25 , 0.4)", color: "white" },
        });
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPassword("");
      setEmail("");
      setCPassword("");
      setUsername("");
      setLoading(false);
    }
  };

  return (
    <div>
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
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={4}
          sx={{
            padding: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "rgba(20,22,25 , 0.4)",
            color: "white",
          }}
          fullwidth
        >
          <Typography variant="h5" gutterBottom>
            SignUp
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack position={"relative"} width={"7rem"} margin={"auto"}>
              <Avatar
                sx={{
                  width: "7rem",
                  height: "7rem",
                  objectFit: "contain",
                  bgcolor: "rgba(20,22,25 , 0.7)",
                }}
                src={avatar.preview}
              />
              <IconButton
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                }}
                component="label"
              >
                <CameraAltIcon sx={{ color: "white" }} />
                <VisuallyHiddenIcon
                  type="file"
                  onChange={avatar.changeHandler}
                />
              </IconButton>
            </Stack>

            <TextField
              id="outlined-text-input"
              label="Email"
              type="email"
              sx={{
                input: { color: "white" },
                label: { color: "white" },
                "& label.Mui-focused": { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              fullWidth
            />
            <TextField
              id="outlined-text-input"
              label="Username"
              type="text"
              sx={{
                input: { color: "white" },
                label: { color: "white" },
                "& label.Mui-focused": { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
              }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              fullWidth
            />

            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              sx={{
                input: { color: "white" },
                label: { color: "white" },
                "& label.Mui-focused": { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              fullWidth
            />

            <TextField
              id="outlined-password-input"
              label="Confirm Password"
              type="password"
              size="normal"
              sx={{
                input: { color: "white" },
                label: { color: "white" },
                "& label.Mui-focused": { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
              }}
              value={cpassword}
              onChange={(e) => setCPassword(e.target.value)}
              margin="normal"
              fullWidth
            />
            <Button
              sx={{
                marginTop: "1rem",
                color: "white",
                borderColor: "white",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                "&:hover": {
                  borderColor: "white",
                  backgroundColor: "rgba(255, 255, 255, 0.4)",
                },
              }}
              variant="contained"
              type="submit"
              color="success"
              fullWidth
            >
              {loading ? <CircularProgress color="success" /> : "Signup"}
            </Button>
            <Typography textAlign={"center"} m={"1rem"}>
              OR
            </Typography>

            <Link to="/login">
              <Button
                sx={{
                  color: "white",
                  borderColor: "white",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    borderColor: "white",
                  },
                }}
                variant="outlined"
                fullWidth
              >
                Login instad
              </Button>
            </Link>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default SignUp;
