import { createSlice } from '@reduxjs/toolkit'

import type { TWeatherType } from './types'
import { getWeatherData, getForecastData } from './actions'

const initialState: TWeatherType = {
  weatherData: {
    data: null,
    error: null,
    loading: false,
  },

  forecastData: {
    data: null,
    error: null,
    loading: false,
  },
}

const userSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getWeatherData.pending, state => {
        state.weatherData.loading = true
        state.weatherData.error = null
      })
      .addCase(getWeatherData.rejected, (state, action) => {
        state.weatherData.loading = false
        state.weatherData.error = action.payload as null
      })
      .addCase(getWeatherData.fulfilled, (state, action) => {
        state.weatherData.loading = false
        state.weatherData.error = null
        state.weatherData.data = action.payload
      })

      .addCase(getForecastData.pending, state => {
        state.forecastData.loading = true
        state.forecastData.error = null
      })
      .addCase(getForecastData.rejected, (state, action) => {
        state.forecastData.loading = false
        state.forecastData.error = action.payload as null
      })
      .addCase(getForecastData.fulfilled, (state, action) => {
        state.forecastData.loading = false
        state.forecastData.error = null
        state.forecastData.data = action.payload
      })
  },
})

const userSliceReducer = userSlice.reducer

export default userSliceReducer
