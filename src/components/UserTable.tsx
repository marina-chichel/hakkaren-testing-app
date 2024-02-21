import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EmptyTable from "./EmptyTable";
import { User } from "./hooks/useAPI";

const TABLE_HEADERS = [
  "User",
  "Email address",
  "Language",
  "Team",
  "Created on",
  "",
];

const NameContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: 12,
}));

const NameInitialsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  minWidth: 40,
  height: 40,
  padding: 4,
  backgroundColor: "#605DEC",
  color: theme.palette.common.white,
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
}));

const DeleteRowIcon = styled(DeleteIcon)(() => ({
  fill: "#BDBCDB",
  cursor: "pointer",
}));

const TablePaper = styled(Paper)(() => ({
  border: "1px solid #E4E4EF",
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

  if (users.length === 0) return <EmptyTable />;

  return (
    <TableContainer component={TablePaper}>
      <Table>
        <TableHead>
          <TableRow>
            {TABLE_HEADERS.map((value, key) => (
              <TableCell key={key}>{value}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <NameContainer>
                  <NameInitialsContainer>
                    {getInitials(row.name)}
                  </NameInitialsContainer>
                  {row.name}
                </NameContainer>
              </TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.language}</TableCell>
              <TableCell align="left">{row.team}</TableCell>
              <TableCell align="left">{row.date}</TableCell>
              <TableCell align="left">
                <DeleteRowIcon
                  onClick={() => {
                    deleteUser(row.id);
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
