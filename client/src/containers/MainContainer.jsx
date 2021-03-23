import React, { useState } from "react";

import { Route, Switch } from "react-router-dom";

// Screens
import Home from "../screens/Home";
import Calendar from "../screens/Calendar";
import Rankings from "../screens/Rankings";
import TournamentDetail from "../screens/TournamentDetail";
import MatchDetail from "../screens/MatchDetail";
import PlayerDetail from "../screens/PlayerDetail";

export default function MainContainer(props) {

  const [viewITF, setViewITF] = useState(false)

  const {
    tournaments,
    dailySchedule,
    dailyResults,
    liveMatches,
    currentDate,
  } = props;

  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home tournaments={tournaments} currentDate={currentDate} />
        </Route>

        <Route path="/calendar">
          <Calendar tournaments={tournaments} currentDate={currentDate} viewITF={viewITF} setViewITF={setViewITF} />
        </Route>

        <Route path="/rankings">
          <Rankings />
        </Route>

        <Route path="/tournament/:id">
          <TournamentDetail
            tournaments={tournaments}
            dailySchedule={dailySchedule}
            dailyResults={dailyResults}
            liveMatches={liveMatches}
            currentDate={currentDate}
          />
        </Route>

        <Route path="/match/:id">
          <MatchDetail />
        </Route>

        <Route path="/player/:id">
          <PlayerDetail />
        </Route>
        
      </Switch>
    </>
  );
}
