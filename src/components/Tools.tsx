import { Box, Button, Typography, styled } from "@mui/material";
import { Sort } from "@mui/icons-material"; // Import icons for search, filter, and sort
import { User } from "./hooks/useAPI";
import UserGraph from "./UserGraph";
interface P {
  isEmpty: boolean;
  users: User[];
}

const Category = styled(Typography)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const CategoriesBox = Box;

function Tools({ isEmpty, users }: P) {
  return (
    <Box
      py={2}
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

      <Typography variant="body1" fontWeight={600}>
        Category
      </Typography>
      <CategoriesBox
        display="flex"
        flexDirection="column"
        gap={2}
        style={{
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        <Category variant="body2">All categories</Category>
        <Category variant="body2">Accounting & Consulting</Category>
        <Category variant="body2">Admin Support</Category>
        <Category variant="body2">Customer Service</Category>
        <Category variant="body2">Data Science & Analytics</Category>
        <Category variant="body2">Design & Creative</Category>
        <Category variant="body2">Engineering & Architecture</Category>
        <Category variant="body2">IT & Networking</Category>
        <Category variant="body2">Legal</Category>
        <Category variant="body2">Web, Mobile & Software Dev</Category>
        <Category variant="body2">Sales & Marketing</Category>
      </CategoriesBox>

      {!isEmpty && (
        <Box
          mt={2}
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
