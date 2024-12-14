import { BowlGame } from './DataModels';
import { fetchBowlpoolData } from '@/services/bowlpoolData';

export async function getBowlpoolData(): Promise<BowlGame[]> {
  return await fetchBowlpoolData().then((data) =>
    data.sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    )
  );
}
