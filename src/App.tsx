import { Box } from "@mui/material";
import Users from "./components/Users";
import { Person, Person2, Person2Outlined } from "@mui/icons-material";
import { useState } from "react";
import Login from "./components/Login";

function App() {
  const token = localStorage.getItem("token");
  const [idLoggedIn, setIsLoggedIn] = useState(!!token);
  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <Box
        sx={{
          py: 3,
          px: 6,
          display: "flex",
          alignItems: "center",
          backgroundImage: `url('https://media.licdn.com/dms/image/C5112AQG87VUgljNNSQ/article-cover_image-shrink_600_2000/0/1553661830399?e=2147483647&v=beta&t=RSHfGLbHjU_LDDrYeoVVHDvcYGCwKRVNBz2-TdfvzqQ')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            p: 1,
            display: "flex",
            alignItems: "center",
            bgcolor: "primary.main",
            opacity: 0.7,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 8,
          }}
        >
          <Person color="secondary" />
          <Person2 color="secondary" />
          <Person2Outlined color="secondary" />
        </Box>
      </Box>
      <Box sx={{ py: 4, px: 6 }}>
        {idLoggedIn ? <Users /> : <Login setIsLoggedIn={setIsLoggedIn} />}
      </Box>
      <Box
        sx={{
          py: 2,
          px: 6,
          bgcolor: "primary.900",
          color: "white",
          textAlign: "center",
          mt: "auto",
        }}
      >
        WorkWave ©
      </Box>
    </Box>
  );
}

export default App;
