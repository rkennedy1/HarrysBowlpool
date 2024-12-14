import { TextField, Button, Container, Typography, Paper } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle login logic here
    console.log("Email:", email);
    console.log("Password:", password);
    setUser({
      id: "1",
      name: "Test User",
      email: email,
    }); // Set the user context
    navigate("/bowlpool");
  };

  const containerStyle = {
    display: "flex",
    marginTop: "3rem",
  };

  const buttonStyle = {
    marginTop: ".5rem",
  };

  return (
    <Container maxWidth="sm" style={containerStyle}>
      <Paper elevation={3} style={{ padding: "1rem", width: "100%" }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              margin="normal"
            />
          </div>

          <div>
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              margin="normal"
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={buttonStyle}
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => navigate("/register")}
            style={buttonStyle}
          >
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;
