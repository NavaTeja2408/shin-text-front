import React, { useContext, useState } from "react";
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../extracomponents/Context";
import toast from "react-hot-toast";

const Login = () => {
  const { setAuthUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = {
        withCredentials: true,
      };
      const { data } = await axios.post(
        `${window.location.origin}/api/auth/login`,
        { email, password },
        config
      );

      if (data.error) {
        toast.error(data.error, {
          style: { backgroundColor: "rgba(20,22,25 , 0.4)", color: "white" },
        });
      } else {
        localStorage.setItem("chat-user", JSON.stringify(data));
        setAuthUser(data);
        toast.success("Login Succesful", {
          style: { backgroundColor: "rgba(20,22,25 , 0.4)", color: "white" },
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setEmail("");
      setPassword("");
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
            bgcolor: "rgba(20,22,25 , 0.4)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "white",
          }}
          fullwidth
        >
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleLogin}>
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
              required
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
              required
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
              type="submit"
              fullWidth
            >
              {loading ? <CircularProgress color="success" /> : "Login"}
            </Button>
            <Typography textAlign={"center"} m={"1rem"}>
              OR
            </Typography>

            <Link to="/signup">
              <Button
                sx={{
                  marginTop: "1rem",
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
                Signup instad
              </Button>
            </Link>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
