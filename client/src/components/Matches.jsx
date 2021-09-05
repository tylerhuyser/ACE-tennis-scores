import React from "react";

import MatchCard from "../components/MatchCard";

import "./Matches.css";

export default function Matches(props) {
  const { matchesData, supportingMatchesData, view, discipline, tournamentGender } = props;

  console.log(matchesData);
  console.log(supportingMatchesData)
  console.log(matchesData.length !== 0);

  const matches =
    matchesData &&
    matchesData?.map((matchData, index) => {

      const correspondingMatchData = supportingMatchesData && supportingMatchesData?.filter((match) => match.player[0]["@name"].includes(matchData.title.split(" ")[1]) || match.player[1]["@name"].includes(matchData.title.split(" ")[1]))
      
      console.log(correspondingMatchData)

      return (
        <MatchCard
          matchData={matchData}
          index={index}
          key={matchData.id}
          discipline={discipline}
          tournamentGender={tournamentGender}
          supportingMatchData={(correspondingMatchData === null || correspondingMatchData === undefined) ? "No Corresponding Match" : correspondingMatchData}
          court={(correspondingMatchData === null || correspondingMatchData === undefined) ? "" : correspondingMatchData[0].court}
          round={(correspondingMatchData === null || correspondingMatchData === undefined) ? "" : correspondingMatchData[0].round_name}
          status={matchData["@status"]}
        />
      )
    });

  return (
    <div className="matches-container">
      {matchesData !== undefined &&
      matchesData !== null &&
      matchesData.length !== 0 ? (
        <>{matches}</>
      ) : (
        <p className="match-container-copy">
          {`Currently, there are no ${view.toLowerCase()} to display. :(`}
        </p>
      )}
    </div>
  );
}
