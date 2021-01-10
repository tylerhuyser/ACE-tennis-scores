import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'

// Screens
import Home from './screens/Home'
import Calendar from './screens/Calendar'
import Rankings from './screens/Rankings'
import TournamentDetail from './screens/TournamentDetail'
import MatchDetail from './screens/MatchDetail'
import PlayerDetail from './screens/PlayerDetail'

import {
  getCurrentTournaments
} from './utils/tournaments'

function App () {

  const [ currentTournaments, setCurrentTournaments] = useState([]) 

  const [ searchQuery, setSearchQuery ] = useState("")
  
  useEffect(() => {
    const gatherCurrentTournaments = async () => {
      console.log('begin')
      const activeTournaments = await getCurrentTournaments()
      console.log('finish')
      setCurrentTournaments(activeTournaments)
      localStorage.setItem('currentTournaments', activeTournaments)
    }
    gatherCurrentTournaments()
  }, [])

  console.log(currentTournaments)

  return (
    <div className="App">

      <Switch>

        <Route exact path="/">
          <Home />
        </Route>

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
