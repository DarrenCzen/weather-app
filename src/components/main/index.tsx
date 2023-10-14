import { SearchHistory } from '../data-table'
import { SearchHistoryType, SearchResultType } from 'src/types/SearchHistoryModel'
import { useState } from 'react'
import { WeatherApiResult } from 'src/types/WeatherApiType'
import { SearchedResult } from '../data-display'
import { SearchForm, formSchemaType } from '../search-form'

export const Main = () => {
  const [historyList, setHistoryList] = useState<SearchHistoryType[]>([
    { id: crypto.randomUUID(), country: 'SG', city: 'Singapore', dateSearched: new Date() },
    { id: crypto.randomUUID(), country: 'CU', city: 'Colombia', dateSearched: new Date() },
  ])

  const deleteItem = (id: string) => setHistoryList((prev) => prev.filter((item) => item.id !== id))
  const searchSelected = (id: string) => {
    const found = historyList.find((item) => item.id === id)
    if (found) fetchUserData(found.city, found.country)
  }

  const [currentSearched, setCurrentSearched] = useState<SearchResultType | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<Error | undefined>(undefined)

  const fetchUserData = async (city: string, country = '') => {
    setIsLoading(true)
    setIsError(undefined)

    const apiKey = '0677877c4441af47948494be02d63ae6'
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}${country ? `,${country}` : ''}&appid=${apiKey}`,
    )
      .then(async (response) => {
        if (!response.ok) {
          const result = await response.json()
          throw new Error(`Network Response Error - ${result.message ?? ''}`)
        }
        return await response.json()
      })
      .then((data: WeatherApiResult) => {
        const searchHistory: SearchHistoryType = {
          id: crypto.randomUUID(),
          city: data.name,
          country: data.sys.country,
          dateSearched: new Date(),
        }

        const searchedData: SearchResultType = {
          ...searchHistory,
          weather: data.weather[0].main,
          humidity: data.main.humidity,
          minTemp: data.main.temp_min,
          maxTemp: data.main.temp_max,
          averageTemperature: data.main.temp,
        }

        setHistoryList((prev) => [searchHistory, ...prev])
        setCurrentSearched(searchedData)
      })
      .catch((err) => {
        setIsError(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function onSubmit(values: formSchemaType) {
    fetchUserData(values.city, values.country)
  }

  return (
    <div className="flex min-h-screen bg-[url('../assets/images/bg-light.png')] bg-cover bg-fixed bg-no-repeat">
      <section className="w-full py-16">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6">
            <div className="flex flex-col justify-center space-y-4 text-center">
              <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tighter text-transparent text-white sm:text-4xl">
                  Weather Application
                </h1>
              </div>
              <div className="mb-12">
                <SearchForm onSubmit={onSubmit} />
              </div>
              <div className="container mx-auto max-w-3xl rounded-xl border bg-white bg-opacity-20 pb-5 pt-2">
                <SearchedResult isLoading={isLoading} isError={isError} item={currentSearched} />
                <SearchHistory dataItems={historyList} searchItem={searchSelected} deleteItem={deleteItem} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
