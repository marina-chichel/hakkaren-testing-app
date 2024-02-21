import {
  Box,
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

function createData(
  name: string,
  email: string,
  language: string,
  team: string,
  date: string
) {
  return { name, email, language, team, date };
}

const rows = [
  createData(
    "Darrell Steward",
    "nevaeh.simmons@example.com",
    "English",
    "Inferno Hawks",
    "15 Jan. 2022"
  ),
  createData(
    "Jacob Jones",
    "dolores.chambers@example.com",
    "Spanish",
    "Phoenix Titans",
    "15 Jan. 2022"
  ),
  createData(
    "Kristin Watson",
    "michael.mitc@example.com",
    "French",
    "Aurora Wolves",
    "15 Jan. 2022"
  ),
];

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
  width: 40,
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
  return `${nameArr[0].charAt(0)}${nameArr[1]?.charAt(0)}`;
};

const UserTable = () => {
  if (rows.length === 0) return <EmptyTable />;

  return (
    <TableContainer component={TablePaper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {TABLE_HEADERS.map((value, key) => (
              <TableCell key={key}>{value}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
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
                <DeleteRowIcon />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
