import axios from 'axios';
import {config} from '../config/config.js'

export const apiClient = axios.create({
    baseURL: config.BACKEND_URL,
    headers: {
    'Content-Type': 'application/json', 
  },
  withCredentials: true
})