import {
  Box,
  Button,
  Snackbar,
  TextField,
  IconButton,
  Typography,
  styled,
  InputAdornment,
} from "@mui/material";
import {
  Search,
  Logout,
  ArrowDropDown,
  NotificationImportant,
  QuestionMark,
  Send,
  ClearSharp,
  PersonAdd,
  DeleteOutline,
} from "@mui/icons-material";
import UserTable from "./UserTable";
import useAPI from "./hooks/useAPI";
import UK from "../assets/UK.png";
import Tools from "./Tools";
import Pagination from "@mui/material/Pagination";
import EmptyTable from "./EmptyTable";

function Users({ logOut }: { logOut: () => void }) {
  const {
    handleGenerate,
    handleReset,
    filteredUsers,
    deleteUser,
    error,
    connectDB,
    isFetching,
    searchQuery,
    handleSearchChange,
    noUsers,
    currPage,
    numberOfPages,
    paginatedUsers,
    handlePageChange,
  } = useAPI();

  const IconBtn = styled(IconButton)`
    color: #21642b;
  `;

  return (
    <>
      <Box
        display="flex"
        sx={{ py: 2, mx: 28 }}
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
                    <IconButton onClick={() => {}}>
                      <ClearSharp />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box display="flex" alignItems="center">
          <IconBtn onClick={handleGenerate}>
            <PersonAdd />
          </IconBtn>
          <IconBtn onClick={handleReset}>
            <DeleteOutline />
          </IconBtn>
          <IconBtn>
            <Send />
          </IconBtn>
          <IconBtn>
            <QuestionMark />
          </IconBtn>
          <IconBtn>
            <NotificationImportant />
          </IconBtn>
          <IconBtn onClick={logOut}>
            <Logout />
          </IconBtn>
          <Box display="flex" alignItems="center" gap={1} ml={2}>
            <img src={UK} width={16} alt="UK flag" />
            <Typography color="primary.900">English</Typography>
            <ArrowDropDown />
          </Box>
        </Box>
      </Box>

      <Box display="flex" mx={28} gap={4}>
        <Tools isEmpty={noUsers} users={filteredUsers} />
        <Box flex="1" p={2}>
          {noUsers ? (
            <EmptyTable />
          ) : (
            <>
              <UserTable
                users={paginatedUsers}
                deleteUser={deleteUser}
                isFetching={isFetching}
              />
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Pagination
                  sx={{ p: 3 }}
                  count={numberOfPages}
                  page={currPage}
                  variant="outlined"
                  color="primary"
                  onChange={handlePageChange}
                />
              </Box>
            </>
          )}
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
    </>
  );
}

export default Users;
