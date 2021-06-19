import axios from 'axios';

const key = `${process.env.REACT_APP_RAPIDAPI_API_KEY}`

const baseUrl = process.env.NODE_ENV === 'production' ? `https://tennis-live-data.p.rapidapi.com` : `https://tennis-live-data.p.rapidapi.com`

const rapidAPI = axios.create({
  baseURL: baseUrl,
  headers: {
    'x-rapidapi-key': key,
    'x-rapidapi-host': 'tennis-live-data.p.rapidapi.com'
  }
})

export default rapidAPI;