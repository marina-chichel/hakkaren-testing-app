import { Box, Typography } from "@mui/material";

const EmptyTable = () => {
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box display="flex" gap={2} alignItems="center">
        <img src="/src/assets/images/no_records.png" alt="no records" />
        <Typography fontWeight={800} fontSize={14} color="#3CA18D">
          NO RECORDS FOUND
        </Typography>
      </Box>
    </Box>
  );
};

export default EmptyTable;
