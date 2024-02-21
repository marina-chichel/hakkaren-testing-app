import { Box } from "@mui/material";
import Logo from "./assets/logo.svg";
import Users from "./components/Users";

function App() {
  return (
    <Box>
      <Box sx={{ py: 3, px: 6, bgcolor: "#F9F9F9" }}>
        <img src={Logo} />
      </Box>
      <Box sx={{ py: 4, px: 6 }}>
        <Users />
      </Box>
    </Box>
  );
}

export default App;
