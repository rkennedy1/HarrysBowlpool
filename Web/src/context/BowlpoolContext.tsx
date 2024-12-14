import { createContext, useState, useContext, ReactNode } from 'react';
import { BowlGame, Player } from '../data/DataModels';
import { getBowlpoolData } from '../data/BowlGames';
import { getPlayers } from '../data/Players';

interface BowlpoolContextType {
  games: BowlGame[];
  players: Player[];
  isLoading: boolean;
  setGames: (games: BowlGame[]) => void;
  setPlayers: (players: Player[]) => void;
  refreshData: () => void;
}

const BowlpoolContext = createContext<BowlpoolContextType | undefined>(
  undefined
);

export const BowlpoolProvider = ({ children }: { children: ReactNode }) => {
  const [games, setGames] = useState<BowlGame[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const refreshData = async () => {
    setIsLoading(true);
    const gameData = await getBowlpoolData();
    const playerData = await getPlayers();
    setGames(gameData);
    setPlayers(playerData);
    setIsLoading(false);
  };

  return (
    <BowlpoolContext.Provider
      value={{ games, players, isLoading, setGames, setPlayers, refreshData }}
    >
      {children}
    </BowlpoolContext.Provider>
  );
};

export const useBowlpool = () => {
  const context = useContext(BowlpoolContext);
  if (context === undefined) {
    throw new Error('useBowlpool must be used within a BowlpoolProvider');
  }
  return context;
};
