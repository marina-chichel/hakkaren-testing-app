import React from "react";
import {
  Box,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EmptyTable from "./EmptyTable";
import { User } from "./hooks/useAPI";

const StyledCard = styled(Card)(({ theme }) => ({
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.grey[200],
  },
}));

const NameContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: 12,
}));

const NameInitialsContainer = styled(Box)<{ bgColor: string }>(
  ({ theme, bgColor }) => ({
    display: "flex",
    minWidth: 40,
    height: 40,
    padding: 4,
    backgroundColor: bgColor || "#605DEC",
    opacity: 0.6,
    color: theme.palette.common.white,
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  })
);

const DeleteRowIcon = styled(DeleteIcon)(() => ({
  fill: "#BDBCDB",
  cursor: "pointer",
}));

const getInitials = (name: string) => {
  const nameArr = name.split(" ");
  return `${nameArr[0].charAt(0)}${nameArr[1]?.charAt(0) || ""}`;
};

type UserTableParams = {
  users: User[];
  deleteUser: (serId: string) => void;
  isFetching: boolean;
};

const Email = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: "bold",
  overflow: "hidden",
  textOverflow: "ellipsis", // Cut off overflowed text with an ellipsis
  whiteSpace: "nowrap",
}));

const UserTable = ({ users, deleteUser, isFetching }: UserTableParams) => {
  if (isFetching)
    return (
      <Box
        display="flex"
        width="100%"
        height="160px"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress size={48} />
      </Box>
    );

  if (users.length === 0) {
    return <EmptyTable />;
  }

  return (
    <Grid container spacing={2}>
      {users.map((row, index) => (
        <Grid item xs={12} sm={12} md={12} lg={12} key={`${row.name}-${index}`}>
          <StyledCard>
            <CardContent>
              <NameContainer>
                <NameInitialsContainer bgColor={row.color}>
                  {getInitials(row.name)}
                </NameInitialsContainer>

                <Typography variant="h6">{row.name}</Typography>
              </NameContainer>

              <Email>{row.email}</Email>

              <Typography variant="body1"> {row.date}</Typography>
              <Typography>{row.position}</Typography>

              <Typography> {row.company}</Typography>
              <DeleteRowIcon
                onClick={() => {
                  deleteUser(row.id);
                }}
              />
            </CardContent>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default UserTable;
