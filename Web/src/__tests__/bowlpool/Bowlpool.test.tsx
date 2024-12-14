import { render, screen } from '@testing-library/react';
import Bowlpool from '../../presentation/bowlpool/Bowlpool';

describe('Bowlpool Component', () => {
  it('should render bowl games', () => {
    render(<Bowlpool />);
    const bowlGames = screen.getByText('Bowl Games');
    expect(bowlGames).toBeInTheDocument();
  });
});
