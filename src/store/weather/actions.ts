import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ToastVersions, showNotification } from 'libraries/toastify'
import { ACCESS_KEY_TOKEN } from 'utils'

export const getWeatherData = createAsyncThunk('weather/data', async () => {
  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=Yerevan&appid=${ACCESS_KEY_TOKEN}`
    )

    return data
  } catch (error: any) {
    const errorMessage = error.response.data.message

    showNotification(ToastVersions.error, errorMessage)
  }
})

export const getForecastData = createAsyncThunk('forecast/data', async () => {
  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=Yerevan&appid=${ACCESS_KEY_TOKEN}`
    )

    return data
  } catch (error: any) {
    const errorMessage = error.response.data.message

    showNotification(ToastVersions.error, errorMessage)
  }
})
