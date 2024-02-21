import { Box, Button } from "@mui/material";
import UserTable from "./UserTable";

function Users() {
  return (
    <Box>
      <Box mb="24px" display="flex" gap="24px">
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none", borderRadius: "8px" }}
        >
          Generate Data
        </Button>
        <Button
          variant="outlined"
          color="error"
          sx={{ textTransform: "none", borderRadius: "8px" }}
        >
          Reset DB
        </Button>
      </Box>
      <UserTable />
    </Box>
  );
}

export default Users;
