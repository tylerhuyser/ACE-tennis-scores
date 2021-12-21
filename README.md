# ACE-Tennis-Scores

An app that lets users to access live ATP, WTA, and ITF tennis scores and weekly rankings.

[Deployed Site](https://www.ace-tennis-scores.com/) can be accessed here.

## Features

### Live Scores

<img src="https://i.imgur.com/QrNgXZ8.png" width="60%" />

Ace Tennis Scores provides users with live, point-by-point tennis scores. 

When a user views a tournament, a list of live, completed, and upcoming matches is presented. 

<!-- GIF OF FRONT PAGE LOADING HERE -->

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

The rankings information was compiled using a crawler function that was deployed as a Heroku application. Using the Heroku Scheduler add-on, the function activates weekly and scrapes the specific website for the most up-to-date rankings data. The data is accessed using a path provided by the Heroku application. (In addition, other developers are able to access this data using [RapidAPI](https://rapidapi.com/tylerhuyser/api/tennis-rankings-atp-and-wta/). )

The front ingests and parses this information before rendering it onto the page. Users are able to use interative "switch" components in order to toggle between each tour's rankings.


