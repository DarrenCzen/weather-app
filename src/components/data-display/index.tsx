import { SearchResultType } from 'src/types/SearchHistoryModel'
import dayjs from 'dayjs'
import useWindowSize from 'src/hooks/useWindowSize'
import { LoadingSpinner } from '../loading'

interface IProps {
  item?: SearchResultType
  isLoading: boolean
  isError?: Error
}

const displayTitle = `Today's Weather`

const convertTemperature = (temperature: number) => Math.floor(temperature - 273.15).toString() + '\u00b0'

export function SearchedResult(props: IProps) {
  const size = useWindowSize()
  const isLargeScreen = size.width && size.width > 630

  const renderWeatherInfo = (item: SearchResultType) => {
    const temperature = convertTemperature(item.averageTemperature)
    const currentWeather = item.weather
    const currentHumidity = `Humidity: ${item.humidity}%`
    const currentSearchedCity = `${item.city}, ${item.country}`
    const dateSearched = dayjs(item.dateSearched).format('DD-MM-YYYY hh:mmA')
    const temperatureRange = `H: ${convertTemperature(item.maxTemp)} L: ${convertTemperature(item.minTemp)}`

    if (isLargeScreen) {
      return (
        <div className="flex min-h-[200px] flex-col justify-end space-y-2 text-left">
          <div>{displayTitle}</div>
          <div className="ml-[-6px] text-8xl font-bold text-[#6C40B5]">{temperature}</div>
          <div>{temperatureRange}</div>
          <div className="flex flex-row justify-between text-[#666666]">
            <div className="font-semibold">{currentSearchedCity}</div>
            <div>{dateSearched}</div>
            <div>{currentHumidity}</div>
            <div>{currentWeather}</div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="flex flex-row justify-between text-sm text-[#666666]">
          <div className="flex min-h-[150px] flex-col justify-end text-left">
            <div className="text-black">{displayTitle}</div>
            <div className="ml-[-6px] text-8xl font-bold text-[#6C40B5]">{temperature}</div>
            <div className="text-black">{temperatureRange}</div>
            <div className="font-semibold">{currentSearchedCity}</div>
          </div>
          <div className="flex min-h-[150px] flex-col justify-end text-right">
            <div>{currentWeather}</div>
            <div>{currentHumidity}</div>
            <div>{dateSearched}</div>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="container my-4 px-2">
      {props.isLoading ? (
        <LoadingSpinner />
      ) : props.isError ? (
        <div className="text-red-600">{`Error Occurred: ${props.isError.message}`}</div>
      ) : props.item ? (
        renderWeatherInfo(props.item)
      ) : (
        <div>Please perform a search</div>
      )}
    </div>
  )
}
