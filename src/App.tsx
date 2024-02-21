import { Box, Container, Typography } from "@mui/material";
import UserList from "./components/UserList";

function App() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Tests
        </Typography>
        <UserList />
      </Box>
    </Container>
  );
}

export default App;
