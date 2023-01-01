interface TeamId {
  upperBound: string;
  lowerBound: string;
}

export function getTeamIdRange(year: string) {
  let teamId = year + '00000';
  return {
    upperBound: (parseInt(teamId) + 100000).toString(),
    lowerBound: teamId
  };
}
