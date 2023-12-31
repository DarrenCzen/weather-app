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
    <div className="mx-auto w-full rounded-3xl bg-white bg-opacity-20 p-5">
      <div className="text-left text-sm sm:text-lg">Search History</div>

      {props.dataItems && props.dataItems.length > 0 ? (
        props.dataItems.map((value) => {
          return (
            <div key={value.id} className="container mx-auto my-4 rounded-2xl bg-white bg-opacity-40 px-4 py-4">
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
                  <GenericButton ButtonIcon={<Search size={14} />} id={value.id} executeAction={props.searchItem} />
                  <GenericButton ButtonIcon={<Trash2Icon size={14} />} id={value.id} executeAction={props.deleteItem} />
                </div>
              </div>
            </div>
          )
        })
      ) : (
        <div className="container mx-auto my-4 rounded-xl bg-white bg-opacity-40 py-10">Empty Search History</div>
      )}
    </div>
  )
}

interface IButtonProps {
  id: string
  ButtonIcon: React.ReactNode
  executeAction: (id: string) => void
}

function GenericButton(props: IButtonProps) {
  return (
    <Button
      className="self-center rounded-full bg-white bg-opacity-40 hover:bg-purple-400"
      onClick={() => props.executeAction(props.id)}
      size={'sm'}
      asChild
    >
      <div className="text-zinc-500 hover:text-black">{props.ButtonIcon}</div>
    </Button>
  )
}
