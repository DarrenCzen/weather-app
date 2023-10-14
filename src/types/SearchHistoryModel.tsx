export type SearchHistoryType = {
  id: string
  city: string
  country: string
  dateSearched: Date
}

export type SearchResultType = {
  weather: string
  humidity: number
  minTemperature: number
  maxTemperature: number
  averageTemperature: number
} & SearchHistoryType
