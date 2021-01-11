import React from 'react'

export default function TournamentCard(props) {
  
  const { tournament, index } = props;

  const parseTournamentName = (tournament) => {
    const splitTournamentName = tournament.name.split(",")
    const isolatedTournamentNameAndTier = splitTournamentName[0].split(" ")
    const isolatedTournamentName = isolatedTournamentNameAndTier.slice(1)
    if (tournament.name.includes("WTA") || tournament.name.includes("ATP")) {
      const tournamentName = isolatedTournamentName.join(" ")
      console.log(tournamentName)
      return tournamentName
    } if (tournament.name.includes("ITF")) {
      const isolatedITFTournamentName = isolatedTournamentName.slice(0, -1)
      const tournamentName = isolatedITFTournamentName.join(" ")
      console.log(tournamentName)
      return tournamentName
    }
  }

  const tournamentName = parseTournamentName(tournament)

  return (
    <div className="tournament-card-container">
      <p className="tournament-name">{tournamentName}</p>
      <p className="tournament-category"></p>
    </div>
  )
}