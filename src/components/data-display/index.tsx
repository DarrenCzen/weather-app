import { SearchResultType } from 'src/types/SearchHistoryModel'
import dayjs from 'dayjs'
import useWindowSize from 'src/hooks/useWindowSize'
import { LoadingSpinner } from '../loading'

interface IProps {
  item?: SearchResultType
  isLoading: boolean
  isError?: string
}

export const convertTemperature = (temperature: number) => Math.floor(temperature - 273.15).toString() + '\u00b0'

export function SearchedResult(props: IProps) {
  const size = useWindowSize()
  return (
    <div className="container my-4 px-2">
      {props.isLoading ? (
        <LoadingSpinner />
      ) : props.isError ? (
        <div className="text-red-600">Error Occured</div>
      ) : props.item ? (
        <div className="">
          {size.width && size.width > 630 ? (
            <div className="flex min-h-[200px] flex-col justify-end space-y-2 text-left">
              <div>{`Today's Weather`}</div>
              <div className="ml-[-6px] text-8xl font-bold text-[#6C40B5]">
                {convertTemperature(props.item.averageTemperature)}
              </div>
              <div>{`H: ${convertTemperature(props.item.maxTemp)} L: ${convertTemperature(props.item.minTemp)}`}</div>
              <div className="flex flex-row justify-between text-[#666666]">
                <div className="font-bold">{`${props.item.city}, ${props.item.country}`}</div>
                <div>{dayjs(props.item.dateSearched).format('DD-MM-YYYY hh:mmA')}</div>
                <div>{`Humidity: ${props.item.humidity}%`}</div>
                <div>{`${props.item.weather}`}</div>
              </div>
            </div>
          ) : (
            <div className="flex flex-row justify-between text-sm text-[#666666]">
              <div className="flex min-h-[150px] flex-col justify-end text-left">
                <div className="text-black">{`Today's Weather`}</div>
                <div className="ml-[-6px] text-8xl font-bold text-[#6C40B5]">
                  {convertTemperature(props.item.averageTemperature)}
                </div>
                <div className="text-black">
                  {`H: ${convertTemperature(props.item.maxTemp)} L: ${convertTemperature(props.item.minTemp)}`}
                </div>
                <div className="font-bold">{`${props.item.city}, ${props.item.country}`}</div>
              </div>
              <div className="flex min-h-[150px] flex-col justify-end text-right">
                <div>{`${props.item.weather}`}</div>
                <div>{`Humidity: ${props.item.humidity}%`}</div>
                <div>{dayjs(props.item.dateSearched).format('DD-MM-YYYY hh:mmA')}</div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>Please perform a search</div>
      )}
    </div>
  )
}
