import { Box, Typography } from "@mui/material";

const EmptyTable = () => {
  return (
    <Box
      width="100%"
      height={500}
      borderRadius="8px"
      // border="1px solid #E4E4EF"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box display="flex" gap={2} alignItems="center">
        <img src="/src/assets/images/no_records.png" />
        <Typography fontWeight={800} fontSize={14} color="#3CA18D">
          NO RECORDS FOUND
        </Typography>
      </Box>
    </Box>
  );
};

export default EmptyTable;
