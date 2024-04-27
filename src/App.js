import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext, UserContextProvider } from "./extracomponents/Context";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./Components/Profile";
import background from "./Images/back.jpg";
function App() {
  const { authUser } = useContext(UserContext);
  return (
    <div
      className="w-full h-screen"
      style={{
        backgroundColor: "rgba(0,0,0,0.8)",
        overflow: "hidden",
      }}
    >
      <Toaster
        position="top-center"
        gutter={8}
        toastOptions={{
          duration: 2000,
        }}
      />
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/signup"} />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to={"/"} /> : <SignUp />}
        />
      </Routes>
    </div>
  );
}

export default App;
