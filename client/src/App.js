import React, { useState, useEffect } from 'react'

// Screens
import Home from './screens/Home'
import Calendar from './screens/Calendar'
import Rankings from './screens/Rankings'
import TournamentDetail from './screens/TournamentDetail'
import MatchDetail from './screens/MatchDetail'
import PlayerDetail from './screens/PlayerDetail'

function App () {

  const [ searchQuery, setSearchQuery ] = useState("")

  return (
    <div className="App">

      <Switch>

        <Home />

        <Calendar />

        <Rankings />

        <TournamentDetail />

        <MatchDetail />

        <PlayerDetail />

      </Switch>

    </div>
  );
}

export default App;
