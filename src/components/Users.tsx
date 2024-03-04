import {
  Box,
  Button,
  CircularProgress,
  Snackbar,
  TextField,
  IconButton,
} from "@mui/material";
import { Search, Sort, DeleteOutline, PersonAdd } from "@mui/icons-material"; // Import icons for search, filter, and sort
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

    searchQuery,
    handleSearchChange,
  } = useAPI();

  return (
    <Box display="flex">
      {/* Left panel with search and sort */}
      <Box
        // width="300px"
        p="20px"
        borderRight="1px solid #e0e0e0"
        display="flex"
        flexDirection="column"
        gap={2}
      >
        {/* Search input */}
        <Box display="flex" alignItems="center">
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <IconButton>
            <Search />
          </IconButton>
        </Box>

        {/* Sort options */}
        <Box>
          {/* Add your sort options here */}
          <Button variant="outlined" startIcon={<Sort />}>
            Sort
          </Button>
        </Box>

        {/* Buttons for generating and resetting users */}

        {/* <Box display="flex" gap={2}> */}
        <Box>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleGenerate}
            disabled={!!error || isResetting}
            startIcon={
              isGenerating ? <CircularProgress size={16} /> : <PersonAdd />
            }
          >
            Fetch users
          </Button>
        </Box>
        <Box>
          <Button
            variant="outlined"
            onClick={handleReset}
            color="error"
            disabled={!!error || isGenerating || users.length === 0}
            startIcon={
              isResetting ? (
                <CircularProgress size={16} color="error" />
              ) : (
                <DeleteOutline />
              )
            }
          >
            Delete All
          </Button>
        </Box>
        {/* </Box> */}
      </Box>

      {/* Right panel with user table */}
      <Box flex="1" p="20px">
        {/* User table */}
        <UserTable
          users={users}
          deleteUser={deleteUser}
          isFetching={isFetching}
        />

        {/* Snackbar for displaying errors */}
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
    </Box>
  );
}

export default Users;
