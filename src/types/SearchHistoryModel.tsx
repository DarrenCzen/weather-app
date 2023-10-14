export type SearchHistoryType = {
  id: string
  city: string
  country: string
  dateSearched: Date
}

export type SearchResultType = {
  weather: string
  humidity: number
  minTemp: number
  maxTemp: number
  averageTemperature: number
} & SearchHistoryType
