import { Box, Button, CircularProgress, Snackbar } from "@mui/material";
import UserTable from "./UserTable";
import useAPI from "./hooks/useAPI";

function Users() {
  const {
    handleGenerate,
    handleReset,
    users,
    deleteUser,
    error,
    connectDB,
    isFetching,
    isGenerating,
    isResetting,
  } = useAPI();

  return (
    <Box>
      <Box mb="24px" display="flex" gap="24px">
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none", borderRadius: "8px" }}
          onClick={handleGenerate}
          disabled={!!error || isResetting}
        >
          {isGenerating && (
            <CircularProgress
              color="secondary"
              size={20}
              sx={{ marginRight: "10px" }}
            />
          )}
          Generate Data
        </Button>
        <Button
          variant="outlined"
          color="error"
          sx={{ textTransform: "none", borderRadius: "8px" }}
          onClick={handleReset}
          disabled={!!error || isGenerating || users.length === 0}
        >
          {isResetting && (
            <CircularProgress
              color="secondary"
              size={20}
              thickness={4}
              sx={{ marginRight: "10px" }}
            />
          )}
          Delete All
        </Button>
      </Box>

      <UserTable
        users={users}
        deleteUser={deleteUser}
        isFetching={isFetching}
      />

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
