import { Box, Typography, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

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
      <Typography
        variant="h1"
        sx={{
          fontSize: "3.5rem",
          mb: 5,
          color: "white",
          textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
        }}
      >
        Welcome to Harry's Bowlpool
      </Typography>

      <Box sx={{ my: 2.5 }}>
        <Box
          component="img"
          src="https://via.placeholder.com/600x400"
          alt="Placeholder for Harry's Bowlpool"
          sx={{
            width: "100%",
            maxWidth: "600px",
            height: "auto",
          }}
        />
      </Box>

      <Button
        variant="contained"
        sx={{
          px: 4,
          py: 2,
          fontSize: "1.2rem",
          bgcolor: "white",
          color: "#4e54c8",
          borderRadius: "25px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          transition: "transform 0.2s ease",
          mt: 2.5,
          "&:hover": {
            bgcolor: "white",
            transform: "scale(1.05)",
          },
        }}
        onClick={() => {
          navigate("/login"); // Navigate to login page
        }}
      >
        Login
      </Button>
    </Box>
  );
};

export default LandingPage;
