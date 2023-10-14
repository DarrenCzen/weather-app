import { Search } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { SearchHistory } from '../data-table'
import { SearchHistoryType } from 'src/types/SearchHistoryModel'
import { useState } from 'react'

export const Hero = () => {
  const [historyList, setHistoryList] = useState<SearchHistoryType[]>([
    { id: 'abc1', country: 'MY', city: 'Kuala Lumpur', dateSearched: new Date() },
    { id: 'abc2', country: 'KR', city: 'Seoul', dateSearched: new Date() },
  ])

  const deleteItem = (id: string) => {
    setHistoryList((prev) => prev.filter((item) => item.id !== id))
  }

  const searchSelected = (id: string) => {
    // Implement the "do something" logic
    console.log(`${id} searched`)
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-purple-400 to-purple-600">
      <section className="w-full py-16">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6">
            <div className="flex flex-col justify-center space-y-4 text-center">
              <div className="mb-4">
                <h1 className="text-3xl font-bold tracking-tighter text-transparent text-white sm:text-4xl">
                  Today&apos;s Weather
                </h1>
              </div>
              <div className="mx-auto flex w-full max-w-3xl">
                <div className="w-4/5 sm:w-11/12 sm:pr-5">
                  <div className="text-left">
                    <Label htmlFor="Country">Country</Label>
                  </div>
                  <Input type="Country" id="Country" placeholder="Country" />
                </div>
                <div className="w-1/5 text-end sm:w-1/12">
                  <Button
                    onClick={() => {
                      console.log('here')
                      setHistoryList([
                        { id: 'abc1', country: 'MY', city: 'Kuala Lumpur', dateSearched: new Date() },
                        { id: 'abc2', country: 'KR', city: 'Seoul', dateSearched: new Date() },
                      ])
                    }}
                    className="rounded-2xl border-2 border-purple-700 bg-purple-700 py-7 hover:bg-purple-400"
                    asChild
                  >
                    <div className="hover:text-black">
                      <Search />
                    </div>
                  </Button>
                </div>
              </div>
              <div className="container mx-auto max-w-3xl rounded-xl border bg-white bg-opacity-20 py-10">
                <SearchHistory dataItems={historyList} searchItem={searchSelected} deleteItem={deleteItem} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
