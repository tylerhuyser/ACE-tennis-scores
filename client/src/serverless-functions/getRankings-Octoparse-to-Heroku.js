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

async function getATPSinglesRankings (token) {
  
  try {

      const axios = require('axios');
      
      var config = {
        method: 'get',
        url: `https://dataapi.octoparse.com/api/notexportdata/gettop?taskId=${process.env.OCTOPARSE_TASKID_ATP_SINGLES_RANKINGS}&size=500`,
        headers: { 
          'Authorization': token
        }
      };
    
      const resp = await axios(config)
      
      console.log(`ATP Singles Rankings: ${resp.data}`);
    
      const rankings = {ATP_SINGLES_RANKINGS: JSON.stringify(resp.data)}
      
      return(rankings);
    
    } catch (err) {
      
      console.log('octoparse ATP Singles Rankings GET error')
      console.log(err);
      console.log(err.message)
      
    }
};

async function getATPSinglesRaceRankings (token) {
  
  try {

      const axios = require('axios');
      
      var config = {
        method: 'get',
        url: `https://dataapi.octoparse.com/api/notexportdata/gettop?taskId=${process.env.OCTOPARSE_TASKID_ATP_SINGLES_RACE_RANKINGS}&size=500`,
        headers: { 
          'Authorization': token
        }
      };
    
      const resp = await axios(config)
      
      console.log(`ATP Singles Race Rankings: ${resp.data}`);
    
      const rankings = {ATP_SINGLES_RACE_RANKINGS: JSON.stringify(resp.data)}
      
      return(rankings);
    
    } catch (err) {
      
      console.log('octoparse ATP Singles Race Rankings GET error')
      console.log(err);
      console.log(err.message)
      
    }
};

async function getATPDoublesRankings (token) {
  
  try {

      const axios = require('axios');
      
      var config = {
        method: 'get',
        url: `https://dataapi.octoparse.com/api/notexportdata/gettop?taskId=${process.env.OCTOPARSE_TASKID_ATP_DOUBLES_RANKINGS}&size=500`,
        headers: { 
          'Authorization': token
        }
      };
    
      const resp = await axios(config)
      
      console.log(`ATP Doubles Rankings: ${resp.data}`);
    
      const rankings = {ATP_DOUBLES_RANKINGS: JSON.stringify(resp.data)}
      
      return(rankings);
    
    } catch (err) {
      
      console.log('octoparse ATP Doubles Rankings GET error')
      console.log(err);
      console.log(err.message)
      
    }
};

async function getATPDoublesRaceRankings (token) {
  
  try {

      const axios = require('axios');
      
      var config = {
        method: 'get',
        url: `https://dataapi.octoparse.com/api/notexportdata/gettop?taskId=${process.env.OCTOPARSE_TASKID_ATP_DOUBLES_RACE_RANKINGS}&size=500`,
        headers: { 
          'Authorization': token
        }
      };
    
      const resp = await axios(config)
      
      console.log(`ATP Doubles Race Rankings: ${resp.data}`);
    
      const rankings = {ATP_DOUBLES_RACE_RANKINGS: JSON.stringify(resp.data)}
      
      return(rankings);
    
    } catch (err) {
      
      console.log('octoparse ATP Doubles Race Rankings GET error')
      console.log(err);
      console.log(err.message)
      
    }
};

async function getWTASinglesRankings (token) {
  
  try {

      const axios = require('axios');
      
      var config = {
        method: 'get',
        url: `https://dataapi.octoparse.com/api/notexportdata/gettop?taskId=${process.env.OCTOPARSE_TASKID_WTA_SINGLES_RANKINGS}&size=500`,
        headers: { 
          'Authorization': token
        }
      };
    
      const resp = await axios(config)
      
      console.log(`WTA Singles Rankings: ${resp.data}`);
    
      const rankings = {WTA_SINGLES_RANKINGS: JSON.stringify(resp.data)}
      
      return(rankings);
    
    } catch (err) {
      
      console.log('octoparse WTA Singles Rankings GET error')
      console.log(err);
      console.log(err.message)
      
    }
};

async function getWTASinglesRaceRankings (token) {
  
  try {

      const axios = require('axios');
      
      var config = {
        method: 'get',
        url: `https://dataapi.octoparse.com/api/notexportdata/gettop?taskId=${process.env.OCTOPARSE_TASKID_WTA_SINGLES_RACE_RANKINGS}&size=500`,
        headers: { 
          'Authorization': token
        }
      };
    
      const resp = await axios(config)
      
      console.log(`WTA Singles Race Rankings: ${resp.data}`);
    
      const rankings = {WTA_SINGLES_RACE_RANKINGS: JSON.stringify(resp.data)}
      
      return(rankings);
    
    } catch (err) {
      
      console.log('octoparse WTA Singles Race Rankings GET error')
      console.log(err);
      console.log(err.message)
      
    }
};

async function getWTADoublesRankings (token) {
  
  try {

      const axios = require('axios');
      
      var config = {
        method: 'get',
        url: `https://dataapi.octoparse.com/api/notexportdata/gettop?taskId=${process.env.OCTOPARSE_TASKID_WTA_DOUBLES_RANKINGS}&size=500`,
        headers: { 
          'Authorization': token
        }
      };
    
      const resp = await axios(config)
      
      console.log(`WTA Doubles Rankings: ${resp.data}`);
    
      const rankings = {WTA_DOUBLES_RANKINGS: JSON.stringify(resp.data)}
      
      return(rankings);
    
    } catch (err) {
      
      console.log('octoparse WTA Doubles Rankings GET error')
      console.log(err);
      console.log(err.message)
      
    }
};

async function getWTADoublesRaceRankings (token) {
  
  try {

      const axios = require('axios');
      
      var config = {
        method: 'get',
        url: `https://dataapi.octoparse.com/api/notexportdata/gettop?taskId=${process.env.OCTOPARSE_TASKID_WTA_DOUBLES_RACE_RANKINGS}&size=500`,
        headers: { 
          'Authorization': token
        }
      };
    
      const resp = await axios(config)
      
      console.log(`WTA Doubles Race Rankings: ${resp.data}`);
    
      const rankings = {WTA_DOUBLES_RACE_RANKINGS: JSON.stringify(resp.data)}
      
      return(rankings);
    
    } catch (err) {
      
      console.log('octoparse WTA Doubles Race Rankings GET error')
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

    const WTASINGLESRANKINGS = await getWTASinglesRankings(token)
    const WTASINGLESRACERANKINGS = await getWTASinglesRaceRankings(token)
    const WTADOUBLESRANKINGS = await getWTADoublesRankings(token)
    const WTADOUBLESRACERANKINGS = await getWTADoublesRaceRankings(token)

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

async function loginHerokuPostgres() {

  try {

    const axios = require('axios');

    const baseURL = process.env.HEROKU_URL
    const username = process.env.POSTGRES_USERNAME
    const password = process.env.POSTGRES_PASSWORD

    const api = axios.create({
      baseURL: baeURL
    })

    const resp = await api.post('auth/login', {
      "authentication": {
        "username": username,
        "password": password
      }
    })

    return resp.data.token
    
  } catch (err) {

    console.log('Authentication Error')
    console.log(err)

  }
}
  
async function getRankings() {

  try {

    // Dependency

    const axios = require('axios');

    // OCTOPARSE AUTHORIZATION EQUATION
    const tokenID = await octoparseAPIConfig()
    const token = 'Bearer ' + tokenID

    // OCTOPARSE GET RANKINGS DATA
    const ATPRANKINGS = await getATPRankings(token)
    const WTARANKINGS = await getWTARankings(token)

    const rankingsData = {
      rankings: {
        ATPRANKINGS,
        WTARANKINGS
      }
    }

    // HEROKU AUTHENTICATION

    const authToken = await loginHerokuPostgres()

    // HEROKU GET OLD RANKINGS DATA

    var getOldConfig = {
      method: 'get',
      url: `http://localhost:3000/rankings`,
      headers: { 
        'Authorization': `Bearer ${authToken}`
      }
    }

    const oldData = await axios(getOldConfig)

    // HEROKU POST OLD RANKING DATA TO PREVIOUS-RANKINGS ENDPOINT

    var postOldConfig = {
      method: 'post',
      url: `http://localhost:3000/previous-rankings`,
      headers: { 
        'Authorization': `Bearer ${authToken}`
      },
      data: oldData.data[0]
    }

    await axios(postOldConfig)

    // HEROKU DESTROY OLD RANKING DATA

    var postOldDestroyConfig = {
      method: 'delete',
      url: `http://localhost:3000/rankings/${oldData.data[0].id}`,
      headers: { 
        'Authorization': `Bearer ${authToken}`
      },
      data: oldData.data[0]
    }

    // HEROKU POST NEW RANKINGS DATA TO RANKINGS ENDPOINT

    var postNewConfig = {
      method: 'post',
      url: `http://localhost:3000/rankings`,
      headers: { 
        'Authorization': `Bearer ${authToken}`
      },
      data: {
        data: JSON.stringify(rankingsData),
        date: new Date()
      }
    };

    const newData = await axios(postNewConfig)

  } catch (err) {

    console.log('getRankings Error')
    console.log(err);
    console.log(err.message)

  }
}

getRankings()