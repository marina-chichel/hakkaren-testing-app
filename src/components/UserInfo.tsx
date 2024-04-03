import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  Typography,
  styled,
} from "@mui/material";
import { User } from "./hooks/useAPI";
import { ArrowRight, Close, FlashOn, Stars } from "@mui/icons-material";
import useContacts from "./hooks/useContacts";
import { CutText } from "./base/Basic";

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

function UserInfo({
  user,
  closeModal,
}: {
  user: User;
  closeModal: () => void;
}) {
  const { contacts, error, isFetchingContacts } = useContacts(
    user?.contactsId || ""
  );

  return (
    <>
      <Content className="user-info">
        <Border>
          <Header sx={{ justifyContent: "space-between" }}>
            <Box display="flex" gap={3} p={3}>
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
            </Box>
            <IconButton onClick={closeModal} sx={{ alignSelf: "flex-start" }}>
              <Close />
            </IconButton>
          </Header>
          <Grid container spacing={0}>
            <Grid
              item
              xs={4}
              style={{
                borderRight: "1px solid #ccc",

                width: "300px",
                height: "300px",
                overflow: "hidden",
              }}
            >
              <VStackPadding>
                <CutText variant="body1">{user.position}</CutText>
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
            <Grid
              item
              xs={8}
              style={{
                width: "300px",
                height: "300px",
                overflow: "hidden",
              }}
            >
              <VStackPadding>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Contacts:
                </Typography>
                {isFetchingContacts ? (
                  <Box
                    display="flex"
                    width="100%"
                    height="160px"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <CircularProgress size={48} />
                  </Box>
                ) : (
                  contacts.map((contact, index) => (
                    <CutText key={index} variant="body1">
                      {contact}
                    </CutText>
                  ))
                )}
              </VStackPadding>
            </Grid>
          </Grid>
        </Border>
      </Content>
      {/* Snackbar for displaying errors */}
      <Snackbar open={!!error} message={error} />
    </>
  );
}

export default UserInfo;
