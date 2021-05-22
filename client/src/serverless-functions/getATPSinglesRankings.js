require('dotenv').config()

async function octoparseAPIConfig () {
  
  try {
  
    const axios = require('axios');
    const urldata = `username=${process.env.OCTOPARSE_USERNAME}&password=${process.env.OCTOPARSE_PASSWORD}&grant_type=password`;

    console.log(urldata)

    var tokenConfig = {
      method: 'post',
      url: 'https://dataapi.octoparse.com/token',
      headers: { 
        'Content-Type': 'text/plain'
      },
      data : urldata
    };
    
    const token = await axios(tokenConfig)
    
    const tokenID = token.data.access_token
    
    return tokenID
    
  } catch (err) {
    
    console.log('octoparse API Authorization Credentials error')
    
  }
};

async function getATPSinglesRankings () {
  
  try {
    
      const axios = require('axios');
      const tokenID = await octoparseAPIConfig()
      
      console.log(tokenID)
      
      const token = 'Bearer ' + tokenID
      
      var config = {
        method: 'get',
        url: `https://dataapi.octoparse.com/api/notexportdata/gettop?taskId=${OCTOPARSE_TASKID_ATP_SINGLES_RANKINGS}&size=500`,
        headers: { 
          'Authorization': token
        }
      };
    
      const resp = await axios(config)
      
      console.log(`ATP Singles Rankings: ${resp.data}`);
      
      return(JSON.stringify(resp.data));
    
    } catch (err) {
      
      console.log('octoparse ATP Singles Rankings GET error')
      console.log(err);
      console.log(err.message)
      
    }
};

async function getATPRankings(token) {
  
  try {

    const ATPSINGLESRANKINGS = await getATPSinglesRankings(token)
    const ATPSINGLESRACERANKINGS = await getATPSinglesRaceRankings(token)
    const ATPDOUBLESRANKINGS = await getATPDoublesRankings(token)
    const ATPDOUBLESRACERANKINGS = await getATPDoublesRaceRankings(token)

    const rankings = {
      ATPRankings: {
        ATPSINGLESRANKINGS,
        ATPSINGLESRACERANKINGS,
        ATPDOUBLESRANKINGS,
        ATPDOUBLESRACERANKINGS
      }
    }

    return rankings

  } catch (err) {

    console.log('getATPRankings Error')
    console.log(err);
    console.log(err.message)

  }
}

async function getWTARankings(token) {
  
  try {

    const ATPSINGLESRANKINGS = await getWTASinglesRankings(token)
    const ATPSINGLESRACERANKINGS = await getWTASinglesRaceRankings(token)
    const ATPDOUBLESRANKINGS = await getWTADoublesRankings(token)
    const ATPDOUBLESRACERANKINGS = await getWTADoublesRaceRankings(token)

    const rankings = {
      WTARankings: {
        WTASINGLESRANKINGS,
        WTASINGLESRACERANKINGS,
        WTADOUBLESRANKINGS,
        WTADOUBLESRACERANKINGS
      }
    }

    return rankings

  } catch (err) {

    console.log('getWTARankings Error')
    console.log(err);
    console.log(err.message)

  }
}
  
async function getRankings() {

  try {

    const axios = require('axios');
    const tokenID = await octoparseAPIConfig()
    const token = 'Bearer ' + tokenID

    const ATPRANKINGS = await getATPRankings(token)
    const WTARANKINGS = await getWTARankings(token)

    const rankingsData = {
      rankings: {
        ATPRANKINGS,
        WTARANKINGS
      }
    }


  } catch (err) {

    console.log('getRankings Error')
    console.log(err);
    console.log(err.message)

  }
}

getRankings()