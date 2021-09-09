import axios from 'axios';

const key = `${process.env.REACT_APP_GOALSERVE_API_KEY}`

const baseUrl = process.env.NODE_ENV === 'production' ? `https://www.goalserve.com/getfeed/${key}/` : `https://www.goalserve.com/getfeed/${key}/`

const goalServeAPI = axios.create({
  baseURL: baseUrl,
})

export default goalServeAPI;