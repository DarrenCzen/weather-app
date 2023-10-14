import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Eraser, Search } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
  city: z
    .string()
    .min(1, { message: 'This field is required' })
    .max(255, { message: 'City should contain at most 255 characters' }),
  country: z.string().max(2, { message: 'Country Code should contain at most 2 characters' }).or(z.literal('')),
})

export type formSchemaType = z.infer<typeof formSchema>

interface IProps {
  onSubmit: (values: formSchemaType) => void
}

export function SearchForm(props: IProps) {
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: '',
      city: '',
    },
  })

  const renderInputField = (name: 'city' | 'country', placeholder: string, labelText: string) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <div className="w-3/5 text-left sm:w-3/4 md:w-4/5">
          <FormItem>
            <div className="relative mb-2 min-h-[60px]">
              <FormLabel className="absolute left-0 top-0 pl-4 pt-1 text-xs opacity-60">{labelText}</FormLabel>
              <FormControl>
                <Input
                  className="absolute left-0 top-0 h-[60px] rounded-2xl border-0 bg-white bg-opacity-20 pl-4 focus-visible:ring-0"
                  placeholder={placeholder}
                  {...field}
                />
              </FormControl>
            </div>
            <FormMessage className="pl-4 font-normal text-red-600" />
          </FormItem>
        </div>
      )}
    />
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(props.onSubmit)} className="mx-auto mb-24 w-full max-w-3xl justify-between">
        <div className="mb-4 flex">
          {renderInputField('city', 'City Name', 'City')}
          <div className="w-2/5 space-x-2 text-end sm:w-1/4 md:w-1/5">
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
          </div>
        </div>
        {renderInputField('country', 'Country Code (e.g., UK, CA)', 'Country')}
      </form>
    </Form>
  )
}
