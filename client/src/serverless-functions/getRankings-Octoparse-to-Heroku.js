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
    
    console.log('Octoparse API Authorization Credentials error')
    
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
    
      const rankings = JSON.stringify(resp.data)
      
      return(rankings);
    
    } catch (err) {
      
      console.log('Octoparse ATP Singles Rankings GET error')
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
    
      const rankings = JSON.stringify(resp.data)
      
      return(rankings);
    
    } catch (err) {
      
      console.log('Octoparse ATP Singles Race Rankings GET error')
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
    
      const rankings = JSON.stringify(resp.data)
      
      return(rankings);
    
    } catch (err) {
      
      console.log('Octoparse ATP Doubles Rankings GET error')
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
    
      const rankings = JSON.stringify(resp.data)
      
      return(rankings);
    
    } catch (err) {
      
      console.log('Octoparse ATP Doubles Race Rankings GET error')
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
    
      const rankings = JSON.stringify(resp.data)
      
      return(rankings);
    
    } catch (err) {
      
      console.log('Octoparse WTA Singles Rankings GET error')
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
    
      const rankings = JSON.stringify(resp.data)
      
      return(rankings);
    
    } catch (err) {
      
      console.log('Octoparse WTA Singles Race Rankings GET error')
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
    
      const rankings = JSON.stringify(resp.data)
      
      return(rankings);
    
    } catch (err) {
      
      console.log('Octoparse WTA Doubles Rankings GET error')
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
    
      const rankings = JSON.stringify(resp.data)
      
      return(rankings);
    
    } catch (err) {
      
      console.log('Octoparse WTA Doubles Race Rankings GET error')
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
        ATPSINGLESRANKINGS,
        ATPSINGLESRACERANKINGS,
        ATPDOUBLESRANKINGS,
        ATPDOUBLESRACERANKINGS
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
        WTASINGLESRANKINGS,
        WTASINGLESRACERANKINGS,
        WTADOUBLESRANKINGS,
        WTADOUBLESRACERANKINGS
    }

    return rankings

  } catch (err) {

    console.log('getWTARankings Error')
    console.log(err);
    console.log(err.message)

  }
}

async function exportATPSinglesRankings(config) {
  try {
    const axios = require('axios')

    const ATPSINGLESRANKINGS = await axios(`${config.url}${process.env.OCTOPARSE_TASKID_ATP_SINGLES_RANKINGS}`, config)

    console.log('Octoparse Export WTARankings Sinlges Complete')

    return ATPSINGLESRANKINGS.data

  } catch (err) {

    console.log('Octoparse Export ATPRankings Singles Error')
    console.log(err);
    console.log(err.message)

  }
}

async function exportATPDoublesRankings(config) {
  try {
    const axios = require('axios')

    const ATPDOUBLESRANKINGS = await axios(`${config.url}${process.env.OCTOPARSE_TASKID_ATP_DOUBLES_RANKINGS}`, config)

    console.log('Octoparse Export WTARankings Doubles Complete')

    return ATPDOUBLESRANKINGS.data

  } catch (err) {

    console.log('Octoparse Export ATPRankings Doubles Error')
    console.log(err);
    console.log(err.message)

  }
}

async function exportATPSinglesRaceRankings(config) {
  try {
    const axios = require('axios')

    const ATPSINGLESRACERANKINGS = await axios(`${config.url}${process.env.OCTOPARSE_TASKID_ATP_SINGLES_RACE_RANKINGS}`, config)

    console.log('Octoparse Export WTARankings Sinlges Race Complete')

    return ATPSINGLESRACERANKINGS.data

  } catch (err) {

    console.log('Octoparse Export ATPRankings Singles Race Error')
    console.log(err);
    console.log(err.message)

  }
}

async function exportATPDoublesRaceRankings(config) {
  try {
    const axios = require('axios')

    const ATPDOUBLESRACERANKINGS = await axios(`${config.url}${process.env.OCTOPARSE_TASKID_ATP_DOUBLES_RACE_RANKINGS}`, config)

    console.log('Octoparse Export ATPRankings Doubles Race Complete')

    return ATPDOUBLESRACERANKINGS.data

  } catch (err) {

    console.log('Octoparse Export ATPRankings Doubles Race Error')
    console.log(err);
    console.log(err.message)

  }
}

async function exportATPRankings(token) {

  try {

    const axios = require('axios');

    var config = {
      method: 'post',
      url: `https://dataapi.octoparse.com/api/notexportdata/update?taskId=`,
      headers: { 
        'Authorization': token
      }
    };

    const ATPEXPORTS = [
      exportATPSinglesRankings(config),
      exportATPSinglesRaceRankings(config),
      exportATPDoublesRankings(config),
      exportATPDoublesRaceRankings(config)
    ]

    Promise.all(ATPEXPORTS).then((values) => {
      console.log('ATP Export PromiseAll Complete')
    }).catch(error => {
      console.log('Octoparse ATP Export Error - PromiseAll')
      console.error(error.message)
    })


  } catch (err) {

    console.log('Octoparse Export ATPRankings Error')
    console.log(err);
    console.log(err.message)

  }
}

async function exportWTASinglesRankings(config) {
  try {
    const axios = require('axios')

    const WTASINGLESRANKINGS = await axios(`${config.url}${process.env.OCTOPARSE_TASKID_WTA_SINGLES_RANKINGS}`, config)

    console.log('Octoparse Export WTARankings Sinlges Complete')

    return WTASINGLESRANKINGS.data

  } catch (err) {

    console.log('Octoparse Export WTARankings Singles Error')
    console.log(err);
    console.log(err.message)

  }
}

async function exportWTADoublesRankings(config) {
  try {
    const axios = require('axios')

    const WTADOUBLESRANKINGS = await axios(`${config.url}${process.env.OCTOPARSE_TASKID_WTA_DOUBLES_RANKINGS}`, config)

    console.log('Octoparse Export WTARankings Doubles Complete')

    return WTADOUBLESRANKINGS.data

  } catch (err) {

    console.log('Octoparse Export WTARankings Doubles Error')
    console.log(err);
    console.log(err.message)

  }
}

async function exportWTASinglesRaceRankings(config) {
  try {
    const axios = require('axios')

    const WTASINGLESRACERANKINGS = await axios(`${config.url}${process.env.OCTOPARSE_TASKID_WTA_SINGLES_RACE_RANKINGS}`, config)

    console.log('Octoparse Export WTARankings Singles Race Complete')

    return WTASINGLESRACERANKINGS.data

  } catch (err) {

    console.log('Octoparse Export WTARankings Singles Race Error')
    console.log(err);
    console.log(err.message)

  }
}

async function exportWTADoublesRaceRankings(config) {
  try {
    const axios = require('axios')

    const WTADOUBLESRACERANKINGS = await axios(`${config.url}${process.env.OCTOPARSE_TASKID_WTA_DOUBLES_RACE_RANKINGS}`, config)

    console.log('Octoparse Export WTARankings Doubles Race Complete')

    return WTADOUBLESRACERANKINGS.data

  } catch (err) {

    console.log('Octoparse Export WTARankings Doubles Race Error')
    console.log(err);
    console.log(err.message)

  }
}

async function exportWTARankings(token) {

  try {

    const axios = require('axios');

    var config = {
      method: 'post',
      url: `https://dataapi.octoparse.com/api/notexportdata/update?taskId=`,
      headers: { 
        'Authorization': token
      }
    };

    const WTAEXPORTS = [
      exportWTASinglesRankings(config),
      exportWTASinglesRaceRankings(config),
      exportWTADoublesRankings(config),
      exportWTADoublesRaceRankings(config)
    ]

    Promise.all(WTAEXPORTS).then((values) => {
      console.log('WTA Export PromiseAll Complete')
    }).catch(error => {
      console.log('Octoparse WTA Export Error - PromiseAll')
      console.error(error)
    })


  } catch (err) {

    console.log('exportWTARankings Error')
    console.log(err);
    console.log(err)

  }
}

async function exportOctoparseData(token) {

  const exportFunctions = [
    exportATPRankings(token),
    exportWTARankings(token)
  ]

  Promise.all(exportFunctions).then(values => {
    console.log('Octoparse Data Export Complete - PromiseAll')
  }).catch(error => {
    console.log(error)
  })

  console.log('Octoparse Data Export Complete')

}

async function destroyOldRankings(token, authToken, oldData) {

  try {
  
    const axios = require('axios');

    var config = {
      method: 'delete',
      url: `${process.env.HEROKU_URL}rankings/${oldData.data[0].id}`,
      headers: {
        'Authorization': `Bearer ${authToken}`
      },
    }

    const resp = await axios(config)

    console.log(resp.status)

    if (resp.status === 204) {

      console.log("PostgreSQL destroyOldRankings Success")

      await exportOctoparseData(token)

    }

  } catch (err) {

    console.log('destroyOldRankings Error')
    console.log(err);

  }

}

async function postNewRankings(token, authToken, rankingsData, oldData) {
  
  try {

    const axios = require('axios');

    var config = {
      method: 'post',
      url: `${process.env.HEROKU_URL}rankings`,
      headers: {
        'Authorization': `Bearer ${authToken}`
      },
      data: {
        data: JSON.stringify(rankingsData),
        date: new Date()
      }
    };

    const resp = await axios(config)

    console.log('successful NEW RANKINGS POST')

    if (resp.status === 201) {

      console.log("PostgreSQL postNewRankings Success")

      await destroyOldRankings(token, authToken, oldData)
 
    }
    
  } catch (err) {

    console.log('postNewRankings Error')
    console.log(err);

  }
}

async function backupOldRankings(token, authToken, rankingsData, oldData) {

  try {

    console.log('begin backup old rankings')

    const axios = require('axios');

    var config = {
      method: 'post',
      url: `${process.env.HEROKU_URL}previous-rankings`,
      headers: { 
        'Authorization': `Bearer ${authToken}`
      },
      data: oldData.data[0]
    }

    const resp = await axios(config)

    console.log('backup success')

    console.log(resp.status)

    if (resp.status === 201) {

      console.log("PostgreSQL backupOldRankings Success")
      await postNewRankings(token, authToken, rankingsData, oldData)

    }
    
  } catch (err) {

    console.log('backupOldRankings Error')
    console.log(err);

  }

}

async function getOldRankings(token, authToken, rankingsData) {

  try {

    console.log(authToken)

    const axios = require('axios');

    var config = {
      method: 'get',
      url: `${process.env.HEROKU_URL}rankings`,
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    }

    const oldData = await axios(config)

    if (oldData.status === 200) {

      console.log("PostgreSQL getOldRankings Success")

      await backupOldRankings(token, authToken, rankingsData, oldData)

    }
    
  } catch (err) {

    console.log('getOldRankings Error')
    console.log(err);

  }

}

async function loginHerokuPostgreSQL(token, rankingsData) {

  try {

    const axios = require('axios');

    const baseURL = process.env.HEROKU_URL
    const username = process.env.POSTGRES_USERNAME
    const password = process.env.POSTGRES_PASSWORD

    const api = axios.create({
      baseURL: baseURL
    })

    const resp = await api.post('auth/login', {
      "authentication": {
        "username": username,
        "password": password
      }
    })

    const authToken = resp.data.token

    console.log(authToken)

    if (resp.status === 200) {

      console.log("PostgreSQL Authorization Success")

      await getOldRankings(token, authToken, rankingsData)
      
    }
    
  } catch (err) {

    console.log('Heroku PostgresSQL Authentication Error')
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

    await loginHerokuPostgreSQL(token, rankingsData)
      
  } catch (err) {

    console.log('getRankings Error')
    console.log(err);
    console.log(err.message)

  }
}

getRankings() 