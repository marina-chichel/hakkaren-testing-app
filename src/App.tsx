import { Box } from "@mui/material";
import Users from "./components/Users";
import { Person, Person2, Person2Outlined } from "@mui/icons-material";

function App() {
  return (
    <Box>
      <Box
        sx={{
          py: 3,
          px: 6,
          bgcolor: "#F9F9F9",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Person />
        <Person2 />
        <Person2Outlined />
      </Box>
      <Box sx={{ py: 4, px: 6 }}>
        <Users />
      </Box>
    </Box>
  );
}

export default App;
