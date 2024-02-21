import { Box, Button, Snackbar } from "@mui/material";
import UserTable from "./UserTable";
import useAPI from "./hooks/useAPI";

function Users() {
  const { handleGenerate, handleReset, users, deleteUser, error, connectDB } =
    useAPI();

  return (
    <Box>
      <Box mb="24px" display="flex" gap="24px">
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none", borderRadius: "8px" }}
          onClick={handleGenerate}
        >
          Generate Data
        </Button>
        <Button
          variant="outlined"
          color="error"
          sx={{ textTransform: "none", borderRadius: "8px" }}
          onClick={handleReset}
        >
          Reset DB
        </Button>
      </Box>
      <UserTable users={users} deleteUser={deleteUser} />
      <Snackbar
        open={!!error}
        message={error}
        action={
          <Button color="inherit" size="small" onClick={connectDB}>
            Retry
          </Button>
        }
      />
    </Box>
  );
}

export default Users;
