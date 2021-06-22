import React from 'react'

import IconLogo from '../components/IconLogo'
import TournamentCard from './TournamentCard'
import CalendarCard from './CalendarCard'

import './Tournaments.css'

export default function Tournaments(props) {
  
  const { tournaments, currentDate, viewCalendar } = props

  const generateTournaments = () => {

    if (viewCalendar && tournaments) {

      const tournamentsData = tournaments && tournaments?.filter((tournament) => {
        
        const endDate = new Date(tournament.end_date)
        
          return (
  
            (((endDate >= currentDate)) && ((tournament.code.toLowerCase() !== "doubles")) && ((!tournament.name.toLowerCase().includes("srl"))))
            
          )
      })
      
      let calendarData = [
        {
            name: "january",
            number: "01",
            index: 0,
            data: []
        },
        {
          name: "february",
          number: "02",
          index: 1,
          data: []
        },
        {
          name: "march",
          number: "03",
          index: 2,
          data: []
        },
        {
          name: "april",
          number: "04",
          index: 3,
          data: []
        },
        {
          name: "may",
          number: "05",
          index: 4,
          data: []
        },
        {
          name: "june",
          number: "06",
          index: 5,
          data: []
        },
        {
          name: "july",
          number: "07",
          index: 6,
          data: []
        },
        {
          name: "august",
          number: "08",
          index: 7,
          data: []
        },
        {
          name: "september",
          number: "09",
          index: 8,
          data: []
        },
        {
          name: "october",
          number: "10",
          index: 9,
          data: []
        },
        {
          name: "november",
          number: "11",
          index: 10,
          data: []
        },
        {
          name: "december",
          number: "12",
          index: 11,
          data: []
      }]
    
      for (let i = 0; i < 12; i++) {

        calendarData[i].data = tournamentsData && tournamentsData?.filter((tournament) => {
          
          const tournamentMonth = tournament.start_date.split("-")[1]

          return (
            (tournamentMonth === calendarData[i].number)
          )
        })
      }

      const tournamentCalendar = calendarData.map((month) => (
        <CalendarCard
          month={month}
        />
      ))

      return tournamentCalendar

    } else {

      const calendarData = tournaments && tournaments?.filter((tournament) => {

        const endDate = new Date(tournament.end_date)
        
        
          return (
              
            (((endDate >= currentDate)) && ((tournament.code.toLowerCase() !== "doubles")) && ((!tournament.name.toLowerCase().includes("srl"))))
            
          )
      
        }).map((tournament, index) => {
          
          const startDate = tournament.start_date.split("-").splice(1).join("/")
          const endDate = tournament.end_date.split("-").splice(1).join("/")
          
          return (
      
            <TournamentCard
              tournament={tournament}
              index={index}
              key={tournament.id}
              startDate={`${startDate}`}
              endDate={`${endDate}`}
            />
      
          )
        })
    
        return calendarData
    }
  }

  const calendar = generateTournaments()


  // const calendar = tournaments && tournaments?.filter((tournament) => {

  //   const endDate = new Date(tournament.current_season.end_date)
    
    
  //     return (
          
  //       (((endDate >= currentDate)) && ((tournament.type.toLowerCase() !== "doubles")) && ((!tournament.name.toLowerCase().includes("srl"))))
        
  //     )
  
  //   }).map((tournament, index) => {
      
  //     const startDate = tournament.current_season.start_date.split("-").splice(1).join("/")
  //     const endDate = tournament.current_season.end_date.split("-").splice(1).join("/")
      
  //     return (
  
  //       <TournamentCard
  //         tournament={tournament}
  //         index={index}
  //         key={tournament.id}
  //         startDate={`${startDate}`}
  //         endDate={`${endDate}`}
  //       />
  
  //     )
  //   })

  return (
    <>

      { !calendar ?
        
        <div className="calendar-loader-container">

          <IconLogo />
          
        </div>

        :
      
        <div className="tournaments-container">

          {calendar}
          
        </div>
      
      }

    </>

  )
}