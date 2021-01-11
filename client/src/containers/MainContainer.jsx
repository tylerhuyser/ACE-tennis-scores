import React from 'react'

import { Route, Switch } from 'react-router-dom'

// Screens
import Home from '../screens/Home'
import Calendar from '../screens/Calendar'
import Rankings from '../screens/Rankings'
import TournamentDetail from '../screens/TournamentDetail'
import MatchDetail from '../screens/MatchDetail'
import PlayerDetail from '../screens/PlayerDetail'


export default function MainContainer(props) {

  const { currentTournaments } = props


  return (
    <>

      <Switch>

        <Route exact path="/">
          <Home currentTournaments={currentTournaments} />
        </Route>

        <Route path="/calendar">
          <Calendar />
        </Route>

        <Route path="/rankings">
          <Rankings />
        </Route>

        <Route path="/tournament/:id">
          <TournamentDetail currentTournaments={currentTournaments} />
        </Route>
        
        <Route path="/match/:id">
          <MatchDetail />
        </Route>

        <Route path="/player/:id">
          <PlayerDetail />
        </Route>

      </Switch>

    </>
  )
}