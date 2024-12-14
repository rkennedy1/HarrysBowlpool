// src/components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  Divider,
} from "@mui/material";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errors: Array<{
    message: string;
    timestamp: string;
    componentStack?: string;
  }>;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errors: [],
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      errors: [
        {
          message: error.message,
          timestamp: new Date().toISOString(),
        },
      ],
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    this.setState((prevState) => ({
      errors: [
        ...prevState.errors,
        {
          message: error.message,
          timestamp: new Date().toISOString(),
          componentStack: errorInfo.componentStack,
        },
      ],
    }));
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            textAlign: "center",
            p: 6,
            background: "linear-gradient(to right, #4e54c8, #8f94fb)",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" sx={{ color: "white", mb: 2 }}>
            Oops! Something went wrong.
          </Typography>

          <Paper sx={{ p: 3, mb: 3, maxWidth: "800px", width: "100%" }}>
            <Typography variant="h6" color="error" sx={{ mb: 2 }}>
              Error Details:
            </Typography>
            <List>
              {this.state.errors.map((error, index) => (
                <React.Fragment key={`${error.timestamp}-${index}`}>
                  <ListItem
                    sx={{ flexDirection: "column", alignItems: "flex-start" }}
                  >
                    <Typography variant="subtitle2" color="text.secondary">
                      {new Date(error.timestamp).toLocaleString()}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, wordBreak: "break-word" }}
                    >
                      {error.message}
                    </Typography>
                    {error.componentStack && (
                      <Typography
                        variant="body2"
                        sx={{
                          whiteSpace: "pre-wrap",
                          fontFamily: "monospace",
                          fontSize: "0.8rem",
                          bgcolor: "#f5f5f5",
                          p: 2,
                          borderRadius: 1,
                          width: "100%",
                        }}
                      >
                        {error.componentStack}
                      </Typography>
                    )}
                  </ListItem>
                  {index < this.state.errors.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>

          <Button
            variant="contained"
            sx={{
              bgcolor: "white",
              color: "#4e54c8",
              "&:hover": {
                bgcolor: "white",
              },
            }}
            onClick={() => window.location.reload()}
          >
            Reload Page
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
