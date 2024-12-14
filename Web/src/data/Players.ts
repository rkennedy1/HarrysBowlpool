import { fetchPlayers } from '@/services/bowlpoolData';
import { Player } from './DataModels';

export function getPlayers(): Promise<Player[]> {
  return fetchPlayers();
}
