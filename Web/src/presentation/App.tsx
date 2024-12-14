import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './approot/LoginPage';
import { Container } from '@mui/material';
import Bowlpool from './bowlpool/Bowlpool';
import Header from './approot/Header';
import { UserProvider } from '../context/UserContext';
import Leaderboard from './bowlpool/Leaderboard';
import { BowlpoolProvider } from '@/context/BowlpoolContext';

const App: React.FC = () => {
  return (
    <UserProvider>
      <BowlpoolProvider>
        <Container
          style={{
            minWidth: '100vw',
            minHeight: '100vh',
            paddingLeft: 0,
            paddingRight: 0
          }}
        >
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Bowlpool />} />
              {/* Add more routes as needed, for example: */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/bowlpool" element={<Bowlpool />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
          </BrowserRouter>
        </Container>
      </BowlpoolProvider>
    </UserProvider>
  );
};

export default App;
