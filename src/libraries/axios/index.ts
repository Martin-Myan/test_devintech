import axios, { type AxiosRequestConfig } from 'axios'

import { ACCESS_KEY_TOKEN } from 'utils'

const defaultOptions = {
  baseURL: 'https://api.openweathermap.org/data/2.5/',
}

const axiosInstance = axios.create(defaultOptions)

axiosInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    config.headers = {
      Authorization: `Bearer ${ACCESS_KEY_TOKEN}`,
    }

    return config
  },

  error => Promise.reject(error)
)

export default axiosInstance
