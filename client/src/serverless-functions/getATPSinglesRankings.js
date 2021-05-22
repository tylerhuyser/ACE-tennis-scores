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
    
    // console.log(token)
    
    // console.log(token.data)
    
    const tokenID = token.data.access_token
    
    // console.log(tokenID)
    
    return tokenID
    
  } catch (err) {
    
    console.log('octoparse API Authorization Credentials error')
    // console.log(err);
    // console.log(err.message)
    
  }
};

async function getATPSinglesRankings () {
  
  try {
    
      const axios = require('axios');
      const baseURL = "https://dataapi.octoparse.com/";
      const tokenID = await octoparseAPIConfig()
      
      console.log(tokenID)
      
      const token = 'Bearer ' + tokenID
      
      // console.log(token)
      
      var config = {
        method: 'get',
        url: 'https://dataapi.octoparse.com/api/notexportdata/gettop?taskId=02441161-df68-cdbd-40dd-a444e7ea54be&size=500',
        headers: { 
          'Authorization': token
        }
      };
    
      const resp = await axios(config)
      
      console.log(resp)
      
      console.log(resp.data);
      
      // console.log(JSON.stringify(resp.data));
      
      // const currentTournamentsData = context.functions.execute("setCurrentTournaments", resp.data.tournaments);
      
      // return { 'currentTournaments': currentTournamentsData}
    
    } catch (err) {
      
      console.log('octoparse API GET error')
      console.log(err);
      console.log(err.message)
      
    }
};
  
getATPSinglesRankings()