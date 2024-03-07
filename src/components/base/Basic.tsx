import { Typography, styled } from "@mui/material";

export const CutText = styled(Typography)(() => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "normal",
}));
