import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { SearchHistory } from '../data-table'
import { SearchHistoryType, SearchResultType } from 'src/types/SearchHistoryModel'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Eraser, Search } from 'lucide-react'
import { WeatherApiResult } from 'src/types/WeatherApiType'
import { SearchedResult } from '../data-display'

const formSchema = z.object({
  city: z
    .string()
    .min(1, { message: 'This field is required' })
    .max(255, { message: 'City should contain at most 255 characters' }),
  country: z.string().max(255, { message: 'Country should contain at most 255 characters' }).or(z.literal('')),
})

type formSchemaType = z.infer<typeof formSchema>

export const Main = () => {
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: '',
      city: '',
    },
  })

  const [historyList, setHistoryList] = useState<SearchHistoryType[]>([
    { id: 'abc1', country: 'MY', city: 'Kuala Lumpur', dateSearched: new Date() },
  ])

  const deleteItem = (id: string) => setHistoryList((prev) => prev.filter((item) => item.id !== id))

  const searchSelected = (id: string) => {
    const found = historyList.find((item) => item.id === id)
    if (found) fetchUserData(found.city, found.country)
  }

  function onSubmit(values: formSchemaType) {
    fetchUserData(values.city)
  }

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<string | undefined>(undefined)

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
          throw new Error('Network response was not ok' + `${result ?? result.message}`)
        }
        return response.json()
      })
      .then((data: WeatherApiResult) => {
        console.log(data)

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
        console.log(err.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const [currentSearched, setCurrentSearched] = useState<SearchResultType | undefined>(undefined)

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-purple-500 to-purple-400">
      <section className="w-full py-16">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6">
            <div className="flex flex-col justify-center space-y-4 text-center">
              <div className="mb-4">
                <h1 className="text-3xl font-bold tracking-tighter text-transparent text-white sm:text-4xl">
                  Weather Application
                </h1>
              </div>
              <div className="mx-auto flex w-full max-w-3xl">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-x-2 space-y-8">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter City Name here" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter Country Code here (e.g., UK, CA)" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="rounded-2xl border-2 border-purple-700 bg-purple-700 py-7 hover:bg-purple-400"
                    >
                      <div className="hover:text-black">
                        <Search />
                      </div>
                    </Button>
                    <Button
                      onClick={() => form.reset()}
                      className="rounded-2xl border-2 border-purple-700 bg-purple-700 py-7 hover:bg-purple-400"
                      asChild
                    >
                      <div className="hover:text-black">
                        <Eraser />
                      </div>
                    </Button>
                  </form>
                </Form>
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
