import {
  Box,
  Button,
  Snackbar,
  TextField,
  IconButton,
  Typography,
  InputAdornment,
} from "@mui/material";
import {
  Search,
  Logout,
  ClearSharp,
  PersonAdd,
  DeleteOutline,
} from "@mui/icons-material";
import UserTable from "./UserTable";
import useAPI from "./hooks/useAPI";
import Tools from "./Tools";
import Pagination from "@mui/material/Pagination";
import EmptyTable from "./EmptyTable";
import LanSelector from "./atoms/LanSelector";
import { Center } from "./base/Basic";
import DeleteConfirmationDialog from "./ConfirmationDialog";
import { useState } from "react";

const UsersHeader = Box;

function Users({ logOut }: { logOut: () => void }) {
  const {
    handleGenerate,
    handleReset,
    filteredUsers,
    deleteUser,
    error,
    connectDB,
    isFetching,
    isGenerating,
    isResetting,
    searchQuery,
    handleSearchChange,
    noUsers,
    currPage,
    numberOfPages,
    paginatedUsers,
    handlePageChange,
    clearSearch,
  } = useAPI();

  const isLoading = isFetching || isResetting || isGenerating;

  const [isOpen, setOpen] = useState(false);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <UsersHeader
        display="flex"
        sx={{ py: 2 }}
        alignItems="center"
        justifyContent="space-between"
        gap={3}
      >
        <Box
          display="flex"
          alignItems="center"
          gap={8}
          width={"50%"}
          minWidth={"300px"}
        >
          <Typography variant="h5" component="h5" color="#1fdf1f">
            WorkWave
          </Typography>

          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
              width: "100%",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {searchQuery && (
                    <IconButton onClick={() => clearSearch()}>
                      <ClearSharp />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Center gap={2}>
          <Button
            variant="text"
            startIcon={<PersonAdd />}
            onClick={handleGenerate}
          >
            Add
          </Button>
          <Button
            variant="text"
            startIcon={<DeleteOutline />}
            onClick={openDialog}
            disabled={noUsers}
          >
            Clear
          </Button>
          <Button variant="text" startIcon={<Logout />} onClick={logOut}>
            Logout
          </Button>

          <LanSelector />
        </Center>
      </UsersHeader>

      <Box
        display="flex"
        gap={4}
        style={{
          overflowY: "auto",
        }}
        pb={2}
      >
        <Tools isEmpty={noUsers} users={filteredUsers} />
        <Box flex={1}>
          {noUsers && !isLoading ? (
            <EmptyTable />
          ) : (
            <Box
              style={{
                height: "100%",
                display: "grid",
                gridTemplateRows: "1fr auto",
              }}
            >
              <Box
                p={2}
                style={{
                  overflowY: "auto",
                  WebkitOverflowScrolling: "touch",
                  msOverflowStyle: "none",
                  scrollbarWidth: "none",
                }}
              >
                <UserTable
                  users={paginatedUsers}
                  deleteUser={deleteUser}
                  isFetching={isLoading}
                />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Pagination
                  sx={{ p: 1 }}
                  count={numberOfPages}
                  page={currPage}
                  variant="outlined"
                  color="primary"
                  onChange={handlePageChange}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      <Snackbar
        open={!!error}
        message={error}
        action={
          <Button color="inherit" size="small" onClick={connectDB}>
            Retry
          </Button>
        }
      />

      <DeleteConfirmationDialog
        isOpen={isOpen}
        closeDialog={closeDialog}
        handleDelete={handleReset}
        text="Are you sure you want to delete everything?"
      />
    </>
  );
}

export default Users;
