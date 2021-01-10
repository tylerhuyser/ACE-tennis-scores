import axios from 'axios';

export const key = `?api_key=${process.env.REACT_APP_API_KEY}`

const baseUrl = process.env.NODE_ENV === 'production' ? `https://cors-anywhere.herokuapp.com/http://api.sportradar.us/tennis-t2/en` : 'https://cors-anywhere.herokuapp.com/http://api.sportradar.us/tennis-t2/en'

const api = axios.create({
  baseURL: baseUrl
})

export default api;