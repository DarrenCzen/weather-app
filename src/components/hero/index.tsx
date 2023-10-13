import { Search } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

export const Hero = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-purple-200 to-purple-600">
      <section className="w-full py-32 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6">
            <div className="flex flex-col justify-center space-y-4 text-center">
              <div className="mb-12">
                <h1 className="mb-6 text-3xl font-bold tracking-tighter text-transparent text-white sm:text-4xl xl:text-5xl/none">
                  Weather Application
                </h1>
              </div>
              <div className="mx-auto flex w-full max-w-3xl">
                <div className="w-10/12 sm:w-11/12 sm:pr-5">
                  <div className="text-left">
                    <Label htmlFor="Country">Country</Label>
                  </div>
                  <Input type="Country" id="Country" placeholder="Country" />
                </div>
                <div className="w-2/12 text-end sm:w-1/12">
                  <Button
                    onClick={() => {
                      console.log('here')
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
              <div className="container mx-auto max-w-3xl rounded-md border py-10">
                <div className="container mx-auto rounded-md border py-10">
                  <div className="text-left">Search History</div>
                  <div className="container mx-auto my-10 rounded-md border py-10"></div>
                  <div className="container mx-auto my-10 rounded-md border py-10"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
