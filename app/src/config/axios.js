import axios from 'axios'
import { API_TOKEN } from '../constants'

// eslint-disable-next-line import/prefer-default-export
export const axiosInstance = axios.create({
  baseURL: 'https://api.react-learning.ru/',
  headers: { authorization: `Bearer ${API_TOKEN}` },
})
