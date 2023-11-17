import axios from 'axios';

const BASE_URL = 'https://api.chuotgreen.com/api';

export default axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
    headers: {
    "Content-type": "application/json"
  }
});
export const api = axios.create({
  baseURL: BASE_URL
})

export const getCategories = async () => {
  const response = await api.get('/categories')
  return response.data
}