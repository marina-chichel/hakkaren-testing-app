import { Box, Container, Typography } from "@mui/material";
import UserTable from "./components/UserTable";

function App() {
  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Tests
        </Typography>
        <UserTable />
      </Box>
    </Container>
  );
}

export default App;
