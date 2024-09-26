import axios from 'axios';

// simple solution to fix CORS issue for local development
// without DEV PROXY setup
const corsProxy = 'https://cors-anywhere.herokuapp.com/'
const baseUrl = 'http://www.fruityvice.com/api/'

export const api = axios.create({
  baseURL: `${corsProxy}${baseUrl}`, // window.location.host.startsWith('localhost') ? `${corsProxy}${baseUrl}` : baseUrl,
  timeout: 2000,
});