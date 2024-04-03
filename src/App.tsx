import React, { Component, ReactNode, useState } from "react";
import { Box, Container } from "@mui/material";
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
      <Container
        maxWidth="lg"
        style={{
          height: "100vh",
          display: "grid",
          gridTemplateRows: "auto  1fr auto",
        }}
      >
        {isLoggedIn ? (
          <Users logOut={logOut} />
        ) : (
          <Login setIsLoggedIn={setIsLoggedIn} />
        )}
        <Box
          sx={{
            py: 2,
            bgcolor: "primary.900",
            color: "white",
            textAlign: "center",
            mb: 2,
            borderRadius: 2,
            fontSize: 12,
          }}
        >
          © 2015 - 2024 WorkWave Global Inc. • Privacy Policy
        </Box>
      </Container>
    </ErrorBoundary>
  );
}

export default App;
