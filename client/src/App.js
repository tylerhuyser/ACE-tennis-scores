import React, { useState, useEffect } from 'react'

import MainContainer from './containers/MainContainer'
import Layout from './components/shared/Layout'

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
      setCurrentTournaments(activeTournaments.tournaments)
      localStorage.setItem('currentTournaments', activeTournaments)
    }
    gatherCurrentTournaments()
  }, [])

  console.log(currentTournaments)

  return (
    <div className="app-container">

      { currentTournaments ?

        <Layout>
          <MainContainer currentTournaments={currentTournaments} />
        </Layout>
        
        :
      
        <>
        </>

      }

    </div>
  );
}

export default App;
