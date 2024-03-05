import { Box, Button, Typography } from "@mui/material";
import { Sort } from "@mui/icons-material"; // Import icons for search, filter, and sort
import { User } from "./hooks/useAPI";
import UserGraph from "./UserGraph";

interface P {
  isEmpty: boolean;
  users: User[];
}
function Tools({ isEmpty, users }: P) {
  return (
    <Box
      py={4}
      borderRight="1px solid #e0e0e0"
      display="flex"
      flexDirection="column"
      gap={2}
      width="18%"
    >
      <Box>
        <Button
          variant="outlined"
          startIcon={<Sort />}
          sx={{ borderRadius: 2 }}
        >
          Sort
        </Button>
      </Box>

      <Typography variant="body1" fontWeight={600}>
        Category
      </Typography>
      <Typography variant="body2">All categories</Typography>
      <Typography variant="body2">Accounting & Consulting</Typography>
      <Typography variant="body2">Admin Support</Typography>
      <Typography variant="body2">Customer Service</Typography>
      <Typography variant="body2">Data Science & Analytics</Typography>
      <Typography variant="body2">Design & Creative</Typography>
      <Typography variant="body2">Engineering & Architecture</Typography>
      <Typography variant="body2">IT & Networking</Typography>
      <Typography variant="body2">Legal</Typography>
      <Typography variant="body2">Web, Mobile & Software Dev</Typography>
      <Typography variant="body2">Sales & Marketing</Typography>
      {!isEmpty && (
        <Box
          mt={4}
          pr={4}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
        >
          <UserGraph users={users} />
        </Box>
      )}
    </Box>
  );
}

export default Tools;
