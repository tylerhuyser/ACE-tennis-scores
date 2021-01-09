import axios from 'axios';

const key = `?api_key=${process.env.REACT_APP_API_KEY}`

const baseUrl = process.env.NODE_ENV === 'production' ? `http://api.sportradar.us/tennis-t2/en/` : 'http://localhost:3000'

const api = axios.create({
  baseURL: baseUrl,
  key: key
})

export default api;