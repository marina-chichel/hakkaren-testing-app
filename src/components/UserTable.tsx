import {
  Box,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  styled,
  Typography,
  Badge,
  Button,
  Link,
  Modal,
  Avatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { User } from "./hooks/useAPI";
import {
  Star,
  StarHalf,
  StarOutline,
  WorkspacePremium,
} from "@mui/icons-material";
import { useState } from "react";
import UserInfo from "./UserInfo";

type UserTableParams = {
  users: User[];
  deleteUser: (serId: string) => void;
  isFetching: boolean;
};

const HStack = styled(Box)(() => ({
  display: "flex",
  gap: 16,
  alignItems: "center",
}));

const StyledCard = styled(Card)(({ theme }) => ({
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.grey[100],
  },
}));

const StyledCardContent = styled(CardContent)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 18,
  alignItems: "flex-start",
}));

const Header = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: 16,
  marginBottom: 12,
  width: "100%",
  justifyContent: "space-between",
  flexWrap: "wrap",
}));

const Info = styled(Box)(() => ({
  display: "flex",
  alignItems: "flex-end",
  gap: 16,
  width: "100%",
  justifyContent: "space-between",
}));

const Name = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.dark,
  fontWeight: "bold",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
}));

const Email = styled(Link)(() => ({
  color: "#6ea0eb",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  cursor: "pointer",
}));

const Position = styled(Typography)(() => ({
  color: "black",
  fontWeight: "bold",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
}));

const DeleteRowIcon = styled(DeleteIcon)(() => ({
  fill: "lightgray",
  cursor: "pointer",
  "&:hover": {
    fill: "darkgray",
  },
}));

const Stars = styled(HStack)(() => ({
  display: "flex",
  gap: 2,
  alignItems: "center",
  color: "#e7e736",
  borderBottom: "1px solid lightgray",
  borderRadius: "24px",
  padding: 4,
}));

const StyledBadge = styled(Badge)`
  .MuiBadge-badge {
    color: #f3f31d;
  }
`;

const getStars = (rate: number) => {
  const fullStars = rate % 5 > 0 ? rate % 5 : 1;
  const halfStar = fullStars === 3 ? 1 : 0;
  const outlineStars = 5 - fullStars - halfStar;
  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`star-full-${i}`} />);
  }

  if (halfStar === 1) {
    stars.push(<StarHalf key={`star-half`} />);
  }

  for (let i = 0; i < outlineStars; i++) {
    stars.push(<StarOutline key={`star-outline-${i}`} />);
  }

  return stars;
};

const NamePosition = styled(Box)({
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  flex: "1",
});

const UserTable = ({ users, deleteUser, isFetching }: UserTableParams) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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

  return (
    <Grid container spacing={2}>
      {/* Render the modal */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <> {!!selectedUser && <UserInfo user={selectedUser} />}</>
      </Modal>

      {users.map((row, index) => (
        <Grid item xs={12} sm={12} md={12} lg={12} key={`${row.name}-${index}`}>
          <StyledCard
            onClick={() => handleUserClick(row)}
            className="user-card"
          >
            <StyledCardContent>
              <Header>
                <HStack>
                  <StyledBadge
                    badgeContent={row.success && <WorkspacePremium />}
                  >
                    <Avatar
                      alt="Avatar"
                      src={row.avatar}
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                      }}
                    />
                  </StyledBadge>

                  <NamePosition>
                    <Name variant="caption">{row.name}</Name>
                    <Position variant="subtitle1">{row.position}</Position>
                  </NamePosition>
                </HStack>
                <HStack>
                  <Stars>{getStars(row.rate)}</Stars>
                  <DeleteRowIcon
                    onClick={() => {
                      deleteUser(row.id);
                    }}
                  />
                </HStack>
              </Header>

              <Info>
                <HStack>
                  <Button variant="outlined" sx={{ borderRadius: 16 }}>
                    ${row.rate}/hr
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{ textTransform: "none", borderRadius: 16 }}
                  >
                    {row.company}
                  </Button>
                </HStack>
                <Email>{row.email.toLowerCase()}</Email>
              </Info>
            </StyledCardContent>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default UserTable;
