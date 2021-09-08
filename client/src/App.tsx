import { useQuery, gql } from '@apollo/client'

// function Home() {
//   return <h1>This is home</h1>
// }

function App() {
  function ExchangeRates() {
    const { loading, error, data } = useQuery(gql`
      query {
        events {
          title
          description
        }
      }
    `)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :</p>

    return data.events.map(({ title, description }: any, i: any) => (
      <div key={i}>
        <p>
          {title}: {description}
        </p>
      </div>
    ))
  }

  return <ExchangeRates />
}

export default App
