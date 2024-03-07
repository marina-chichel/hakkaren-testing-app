import { Box, Button } from "@mui/material";
import { Sort } from "@mui/icons-material"; // Import icons for search, filter, and sort
import { User } from "./hooks/useAPI";
import UserGraph from "./UserGraph";
import { CutText } from "./base/Basic";

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
      minWidth={200}
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

      <CutText variant="body1" fontWeight={600}>
        Category
      </CutText>
      <CutText variant="body2">All categories</CutText>
      <CutText variant="body2">Accounting & Consulting</CutText>
      <CutText variant="body2">Admin Support</CutText>
      <CutText variant="body2">Customer Service</CutText>
      <CutText variant="body2">Data Science & Analytics</CutText>
      <CutText variant="body2">Design & Creative</CutText>
      <CutText variant="body2">Engineering & Architecture</CutText>
      <CutText variant="body2">IT & Networking</CutText>
      <CutText variant="body2">Legal</CutText>
      <CutText variant="body2">Web, Mobile & Software Dev</CutText>
      <CutText variant="body2">Sales & Marketing</CutText>
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
