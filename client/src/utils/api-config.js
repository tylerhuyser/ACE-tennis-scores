import axios from 'axios';

export const key = `?api_key=${process.env.REACT_APP_API_KEY}`

const baseUrl = process.env.NODE_ENV === 'production' ? `https://api.allorigins.win/raw?url=http://api.sportradar.us/tennis-t2/en` : 'http://localhost:8080/http://api.sportradar.us/tennis-t2/en'

const api = axios.create({
  url: baseUrl
})

export default api;