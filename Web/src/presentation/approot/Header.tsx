import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    navigate('/');
    setUser(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button
          color="inherit"
          onClick={() => navigate('/')}
          style={{ marginRight: 'auto' }}
        >
          Harry's Bowlpool
        </Button>
        <Button color="inherit" onClick={() => navigate('/leaderboard')}>
          Leaderboard
        </Button>
        {user ? (
          <>
            <Typography variant="body1" marginX=".5em">
              {user.name}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={handleLogin}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
