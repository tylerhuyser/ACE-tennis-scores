import axios from '../node_modules/axios'
import { octoparseAPIConfig } from './octoparseAPIConfig'

export async function getATPSinglesRankings () {
  
  try {
    
      // const axios = require('axios');
      const baseURL = "https://dataapi.octoparse.com/";
      const tokenID = await octoparseAPIConfig()
      
      console.log(tokenID)
      
      const token = 'Bearer ' + tokenID
      
      console.log(token)
      
      var config = {
        method: 'get',
        url: 'https://dataapi.octoparse.com/api/notexportdata/gettop?taskId=02441161-df68-cdbd-40dd-a444e7ea54be&size=500',
        headers: { 
          'Authorization': token
        }
      };
    
      const resp = await axios(config)
      
      console.log(resp)
      
      console.log(resp.dataList);
      
      console.log(JSON.stringify(resp.dataList));
      
      // const currentTournamentsData = context.functions.execute("setCurrentTournaments", resp.data.tournaments);
      
      // return { 'currentTournaments': currentTournamentsData}
    
    } catch (err) {
      
      console.log('octoparse API GET error')
      console.log(err);
      console.log(err.message)
      
    }
  };