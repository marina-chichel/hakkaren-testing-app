import { Box } from "@mui/material";
import Users from "./components/Users";
import { useState } from "react";
import Login from "./components/Login";

function App() {
  const token = localStorage.getItem("token");
  const [idLoggedIn, setIsLoggedIn] = useState(!!token);

  const logOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  return (
    <Box display="flex" flexDirection="column" style={{ height: "100vh" }}>
      <Box flex={1}>
        {idLoggedIn ? (
          <Users logOut={logOut} />
        ) : (
          <Login setIsLoggedIn={setIsLoggedIn} />
        )}
      </Box>
      <Box
        sx={{
          py: 3,
          px: 6,
          bgcolor: "primary.900",
          color: "white",
          textAlign: "center",
          mx: 28,
          mb: 2,
          borderRadius: 2,
          fontSize: 12,
        }}
      >
        © 2015 - 2024 WorkWave Global Inc. • Privacy Policy
      </Box>
    </Box>
  );
}

export default App;
