import { getTeamIdRange } from '../../helpers/teamId';

test('number should return upper and lower bounds where lower bound is number with added to the end "00000" and upper bound is number + 100000', () => {
  expect(
    getTeamIdRange('2020').upperBound == '202100000' &&
      getTeamIdRange('2020').lowerBound == '202000000'
  );
});

test('no input should return lower bound of "00000" and upper bound is "100000"', () => {
  expect(
    getTeamIdRange('0').upperBound == '100000' &&
      getTeamIdRange('0').lowerBound == '00000'
  );
});
