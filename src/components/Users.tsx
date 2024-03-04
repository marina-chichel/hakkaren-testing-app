import {
  Box,
  Button,
  CircularProgress,
  Snackbar,
  TextField,
  IconButton,
  Typography,
  styled,
  InputAdornment,
} from "@mui/material";
import {
  Search,
  Sort,
  DeleteOutline,
  PersonAdd,
  Logout,
  ArrowDropDown,
  NotificationImportant,
  QuestionMark,
  Send,
  ClearSharp,
} from "@mui/icons-material"; // Import icons for search, filter, and sort
import UserTable from "./UserTable";
import useAPI from "./hooks/useAPI";
import UK from "../assets/UK.png";
import Tools from "./Tools";

function Users({ logOut }: { logOut: () => void }) {
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

  const IconBtn = styled(IconButton)`
    color: #21642b;
  `;

  return (
    <>
      <Box
        display="flex"
        sx={{ py: 2, px: 8 }}
        alignItems="center"
        flex={1}
        justifyContent="space-between"
      >
        <Box
          display="flex"
          alignItems="center"
          gap={8}
          // border="1px solid red"
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
              width: "500px",
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

      <Box display="flex" px={6} gap={4}>
        <Tools
          handleGenerate={handleGenerate}
          handleReset={handleReset}
          error={error}
          isResetting={isResetting}
          isGenerating={isGenerating}
          isEmpty={users.length === 0}
        />
        {/* Right panel with user table */}
        <Box flex="1" p={2}>
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
    </>
  );
}

export default Users;
