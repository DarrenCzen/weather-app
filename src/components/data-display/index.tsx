import { SearchResultType } from 'src/types/SearchHistoryModel'
import dayjs from 'dayjs'
import useWindowSize from 'src/hooks/useWindowSize'
import { LoadingSpinner } from '../loading'

interface IProps {
  item?: SearchResultType
  isLoading: boolean
  isError?: string
}

export function SearchedResult(props: IProps) {
  const size = useWindowSize()
  return (
    <div className="container mx-auto py-10">
      {props.isLoading ? (
        <LoadingSpinner />
      ) : props.isError ? (
        <div className="text-red-600">Error Occured</div>
      ) : props.item ? (
        <div>
          {JSON.stringify(props.item)}
          {size.width && size.width > 550 && props.item ? (
            `${props.item.city}, ${props.item.country}`
          ) : (
            <div className="text-left">
              <div>{`${props.item.city}, ${props.item.country}`}</div>
              <div className="text-[10px]">{dayjs(props.item.dateSearched).format('DD-MM-YYYY hh:mmA')}</div>
            </div>
          )}
        </div>
      ) : (
        <div>Please perform a search</div>
      )}
    </div>
  )
}
