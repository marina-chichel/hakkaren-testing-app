import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import { User } from "./hooks/useAPI";
import { ArrowRight, FlashOn, Stars } from "@mui/icons-material";

const Content = styled(Paper)(() => ({
  display: "flex",
  flexDirection: "column",

  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: 24,
  borderRadius: 8,
}));

const Border = styled(Box)(() => ({
  border: "1px solid lightgrey",
  borderRadius: 8,
}));

const HStack = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}));

const HStackGap = styled(HStack)(() => ({
  gap: 16,
}));

const Header = styled(HStackGap)(() => ({
  borderBottom: "1px solid lightgrey",
  padding: "24px",
}));

const VStack = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 16,
}));

const VStackPadding = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  padding: 24,
}));

const Info = styled(Box)(() => ({
  display: "flex",
  alignItems: "flex-end",
  gap: 16,
  marginBottom: 12,
  width: "100%",
  justifyContent: "space-between",
}));

function UserInfo({ user }: { user: User }) {
  return (
    <Content>
      <Border>
        <Header>
          <Avatar
            alt="Avatar"
            src={user.avatar}
            sx={{
              width: 100,
              height: 100,
            }}
          />
          <VStack>
            <Typography variant="h4">{user.name}</Typography>
            <Info>
              <HStackGap>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    textTransform: "none",
                    borderRadius: 16,
                    color: "blue",
                    borderColor: "blue",
                  }}
                  startIcon={<FlashOn />}
                >
                  Avalable now
                </Button>
                <HStack>
                  <IconButton sx={{ color: "blue" }}>
                    <Stars />
                  </IconButton>
                  <Typography>Top rated</Typography>
                </HStack>
              </HStackGap>
            </Info>
          </VStack>
        </Header>
        <Grid container spacing={0}>
          <Grid
            item
            xs={4}
            style={{
              borderRight: "1px solid #ccc",
            }}
          >
            <VStackPadding>
              <Typography
                variant="body1"
                sx={{
                  borderRadius: 16,
                }}
              >
                {user.position}
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  borderRadius: 16,
                  textTransform: "none",
                }}
                endIcon={<ArrowRight />}
              >
                All work
              </Button>
            </VStackPadding>
          </Grid>
          <Grid item xs={8} style={{ padding: "8px" }}>
            <VStackPadding>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Contacts:
              </Typography>
              {user.contacts.map((contact, index) => (
                <Typography key={index} variant="body1">
                  {contact + "@" + user.email.split("@")[1]}
                </Typography>
              ))}
            </VStackPadding>
          </Grid>
        </Grid>
      </Border>
    </Content>
  );
}

export default UserInfo;
