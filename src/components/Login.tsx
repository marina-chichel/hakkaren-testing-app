import {
  Box,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import useLogin from "./hooks/useLogin";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { EMAIL, PASSWORD } from "../../api-settings";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface P {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

function Login({ setIsLoggedIn }: P) {
  const { handleLogin, error, setError, isLoading } = useLogin({
    setIsLoggedIn,
  });

  const [email, setEmail] = useState(EMAIL);
  const [password, setPassword] = useState(PASSWORD);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setError("");
  };
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setError("");
  };
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box display="flex" justifyContent="center" minHeight="600px">
      <Box
        mb="24px"
        display="flex"
        flexDirection="column"
        gap="36px"
        justifyContent="center"
        alignItems="center"
        width="700px"
      >
        <Typography variant="h1" component="h1">
          Sign In
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handlePasswordChange}
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none", borderRadius: "8px" }}
          onClick={() => handleLogin({ email, password })}
          disabled={!!error || isLoading}
        >
          {isLoading && (
            <CircularProgress
              color="secondary"
              size={20}
              sx={{ marginRight: "10px" }}
            />
          )}
          Login
        </Button>
      </Box>

      <Snackbar open={!!error} message={error} />
    </Box>
  );
}

export default Login;
