# ACE-Tennis-Scores

<img src="https://media4.giphy.com/media/fnhoe4BFhhRyuMRahU/giphy.gif?cid=790b7611f7d69afe470be4dee0c3b46a00e2286ad296c6b4&rid=giphy.gif&ct=g" width="60%" />

An app that lets users to access live ATP, WTA, and ITF tennis scores and weekly rankings.

[Deployed Site](https://www.ace-tennis-scores.com/) can be accessed here.

## Features

### Live Scores

<img src="https://i.imgur.com/QrNgXZ8.png" width="60%" />

Ace Tennis Scores provides users with live, point-by-point tennis scores. 

When a user views a tournament, a list of live, completed, and upcoming matches is presented. 

<img src="https://media0.giphy.com/media/o4cFtlUaXkx12iUIbc/giphy.gif?cid=790b7611de876a9df9dd1e0ea79751069edaf4a763e52c31&rid=giphy.gif&ct=g" width="400px" />

For live matches, setInterval is used in order to refresh the score rendered every sixty seconds. 

```

    const interval = setInterval(() => {

      if (matchInfo.matchStatus.toLowerCase() === "inprogress" || matchInfo.matchStatus.toLowerCase() === "live" ) {

        const currentMatchID = matchData["@id"]

        console.log('UseEffect #2 - MatchCard.js - Interval to fetch updated Match Data from Goal Serve about to execute')

        const fetchMatch = async (matchID) => {

          const liveMatchDataXML = await getLiveMatchGoalServe(matchID)
          const liveMatchDataJSON = new XMLParser().parseFromString(liveMatchDataXML)


          setMatch(liveMatchDataJSON)

          setMatchInfo(prevState => ({
            ...prevState,
            matchStatus: liveMatchDataJSON.children[0].children[0].attributes.status
          }))

          setScoreInfo(prevState => ({
            ...prevState,
            [...]
          }))
        }

        fetchMatch(currentMatchID)
      } else {

        clearInterval(interval)

      }

```

### Live Rankings

In addition to live scores, users may access weekly rankings for the ATP & WTA Tours. 

<img src="https://i.imgur.com/V06Igoh.png" width="400px" />

The rankings information is compiled using a crawler function that was deployed as a Heroku application. Using the [Heroku Scheduler](https://devcenter.heroku.com/articles/scheduler) add-on, the function activates weekly and scrapes the specific website for the most up-to-date rankings data. The data is accessed using a path provided by the Heroku application. (In addition, other developers are able to access this data using [RapidAPI](https://rapidapi.com/tylerhuyser/api/tennis-rankings-atp-and-wta/).)

```
async function getRankings() {

  try {

    // Dependency
    const axios = require('axios');

    // CRAWLER AUTHORIZATION EQUATION
    const tokenID = await crawlerAPIConfig()
    const token = 'Bearer ' + tokenID

    // CRAWLER GET RANKINGS DATA
    const ATPRANKINGS = await getATPRankings(token)
    const WTARANKINGS = await getWTARankings(token)

    const rankingsData = {
      rankings: {
        ATPRANKINGS,
        WTARANKINGS
      }
    }

    await loginHeroku(token, rankingsData)
      
  } catch (err) {

    console.log('getRankings Error')
    console.log(err);
    console.log(err.message)

  }
}

getRankings() 

```

The front ingests and parses this information before rendering it onto the page. Users are able to use interative "switch" components in order to toggle between each tour's rankings.

<img src="https://media3.giphy.com/media/SWWLooazYdEZkIHk3q/giphy.gif?cid=790b7611efeb70449cdad5b4413b70515357d3b5d7f1cb10&rid=giphy.gif&ct=g" width="400px" />


