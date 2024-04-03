import { Box, Typography } from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import UK from "../../assets/UK.png";

function LanSelector() {
  return (
    <Box display="flex" alignItems="center" gap={1} ml={2}>
      <img src={UK} width={16} alt="UK flag" />
      <Typography color="primary.900">English</Typography>
      <ArrowDropDown />
    </Box>
  );
}

export default LanSelector;
