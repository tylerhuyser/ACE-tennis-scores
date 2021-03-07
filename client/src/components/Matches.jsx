import React from "react";

import MatchCard from "../components/MatchCard";

import "./Matches.css";

export default function Matches(props) {
  const { matchesData, view } = props;

  console.log(matchesData);
  console.log(matchesData.length !== 0);

  const matches =
    matchesData &&
    matchesData?.map((matchData, index) => (
      <MatchCard matchData={matchData} index={index} key={matchData.id} />
    ));

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
 