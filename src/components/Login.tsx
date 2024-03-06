import {
  Box,
  Button,
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
import { Apple, ArrowDropDown, Google } from "@mui/icons-material";
import UK from "../assets/UK.png";

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
    <>
      <Box display="flex" justifyContent="space-between" sx={{ py: 2, mx: 28 }}>
        <Typography variant="h5" component="h5" color="#1fdf1f">
          WorkWave
        </Typography>

        <Box display="flex" alignItems="center" gap={1}>
          <img src={UK} width={16} alt="UK flag" />
          <Typography>English</Typography>
          <ArrowDropDown />
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" my={2}>
        <Box
          display="flex"
          flexDirection="column"
          gap="36px"
          justifyContent="center"
          alignItems="center"
          width="500px"
          borderRadius={3}
          p={4}
          sx={{ border: "1px solid lightgrey" }}
        >
          <Typography variant="h3" component="h3" color="primary">
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
            sx={{
              textTransform: "none",
              borderRadius: "8px",
              color: "white",
            }}
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
            Continue with Email
          </Button>

          <Box display="flex" gap={4}>
            <Button
              startIcon={<Google />}
              variant="outlined"
              sx={{
                textTransform: "none",
                borderRadius: "8px",
              }}
            >
              Continue with Google
            </Button>
            <Button
              startIcon={<Apple />}
              variant="outlined"
              sx={{
                textTransform: "none",
                borderRadius: "8px",
              }}
            >
              Continue with Apple
            </Button>
          </Box>

          <Typography variant="body1" component="h3" color="primary.100" mt={4}>
            - Don't have an WorkWave account? -
          </Typography>

          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              borderRadius: "8px",
            }}
            disabled={!!error || isLoading}
          >
            Sign Up
          </Button>
        </Box>

        <Snackbar open={!!error} message={error} />
      </Box>
    </>
  );
}

export default Login;
