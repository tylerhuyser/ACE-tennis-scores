import axios from '../node_modules/axios'

export async function octoparseAPIConfig () {
  
  try {
  
    const urldata = `username=${octoparseUsername}&password=${octoparsePassword}&grant_type=password`;


    var tokenConfig = {
      method: 'post',
      url: 'https://dataapi.octoparse.com/token',
      headers: { 
        'Content-Type': 'text/plain'
      },
      data : urldata
    };
    
    const token = await axios(tokenConfig)
    
    console.log(token)
    
    console.log(token.data)
    
    const tokenID = token.data.access_token
    
    console.log(tokenID)
    
    return tokenID
    
  } catch (err) {
    
    console.log('octoparse API Authoerization Credentials error')
    console.log(err);
    console.log(err.message)
    
  }
};