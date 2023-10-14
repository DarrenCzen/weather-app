import { Helmet } from 'react-helmet'
import { Main } from 'src/components/main'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Weather Application</title>
      </Helmet>
      <Main />
    </>
  )
}
