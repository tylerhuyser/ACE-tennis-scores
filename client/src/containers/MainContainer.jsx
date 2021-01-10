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


  return (
    <div className="body-container">

      <Switch>

        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/calendar">
          <Calendar />
        </Route>

        <Route path="/rankings">
          <Rankings />
        </Route>

        <Route path="/tournament/:id">
          <TournamentDetail />
        </Route>
        
        <Route path="/match/:id">
          <MatchDetail />
        </Route>

        <Route path="/player/:id">
          <PlayerDetail />
        </Route>

      </Switch>

    </div>
  )
}