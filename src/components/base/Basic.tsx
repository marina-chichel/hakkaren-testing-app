import { Box, Typography, styled } from "@mui/material";

export const CutText = styled(Typography)(() => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "normal",
}));

export const Center = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
