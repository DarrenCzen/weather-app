import { SearchHistoryType } from 'src/types/SearchHistoryModel'
import { Button } from '../ui/button'
import { Search, Trash2Icon } from 'lucide-react'
import dayjs from 'dayjs'
import useWindowSize from 'src/hooks/useWindowSize'

interface IProps {
  dataItems?: SearchHistoryType[]
  deleteItem: (id: string) => void
  searchItem: (id: string) => void
}

export function SearchHistory(props: IProps) {
  const size = useWindowSize()
  return (
    <div className="container mx-auto rounded-xl bg-white bg-opacity-20 py-4">
      <div className="text-left text-sm sm:text-lg">Search History</div>

      {props.dataItems && props.dataItems.length > 0 ? (
        props.dataItems.map((value) => {
          return (
            <div key={value.id} className="container mx-auto my-4 rounded-xl bg-white bg-opacity-40 px-4 py-4">
              <div className="flex flex-row justify-between">
                <div className="self-center text-xs">
                  {size.width && size.width > 550 ? (
                    `${value.city}, ${value.country}`
                  ) : (
                    <div className="text-left">
                      <div>{`${value.city}, ${value.country}`}</div>
                      <div className="text-[10px]">{dayjs(value.dateSearched).format('DD-MM-YYYY hh:mmA')}</div>
                    </div>
                  )}
                </div>
                <div className="flex flex-row gap-2">
                  {size.width && size.width > 550 && (
                    <div className="self-center text-xs">{dayjs(value.dateSearched).format('DD-MM-YYYY hh:mmA')}</div>
                  )}

                  <Button
                    onClick={() => {
                      props.searchItem(value.id)
                    }}
                    className="self-center rounded-full bg-white hover:bg-purple-400"
                    asChild
                    size={'sm'}
                  >
                    <div className="text-gray-500 hover:text-black">
                      <Search size={14} />
                    </div>
                  </Button>
                  <Button
                    onClick={() => {
                      props.deleteItem(value.id)
                    }}
                    className="self-center rounded-full bg-white hover:bg-purple-400"
                    asChild
                    size={'sm'}
                  >
                    <div className="text-gray-500 hover:text-black">
                      <Trash2Icon size={14} />
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          )
        })
      ) : (
        <div className="container mx-auto my-10 rounded-xl border py-10">Empty Search History</div>
      )}
    </div>
  )
}
