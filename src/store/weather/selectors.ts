import type { RootState } from 'types'

const getWeather = (state: RootState) => state.weather

export const WeatherSelector = {
  getWeather,
}
