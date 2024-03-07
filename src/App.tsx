import React, { Component, ReactNode, useState } from "react";
import { Box } from "@mui/material";
import Users from "./components/Users";
import Login from "./components/Login";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

function App() {
  const token = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  const logOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  return (
    <ErrorBoundary>
      <Box display="flex" flexDirection="column" style={{ height: "100vh" }}>
        <Box flex={1}>
          {isLoggedIn ? (
            <Users logOut={logOut} />
          ) : (
            <Login setIsLoggedIn={setIsLoggedIn} />
          )}
        </Box>
        <Box
          sx={{
            py: 3,
            px: 6,
            bgcolor: "primary.900",
            color: "white",
            textAlign: "center",
            mx: 28,
            mb: 2,
            borderRadius: 2,
            fontSize: 12,
          }}
        >
          © 2015 - 2024 WorkWave Global Inc. • Privacy Policy
        </Box>
      </Box>
    </ErrorBoundary>
  );
}

export default App;
