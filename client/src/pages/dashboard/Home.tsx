import { useQuery, gql } from '@apollo/client'

const Home = () => {
  const { data, loading, error } = useQuery(gql`
    query getCategories {
      products {
        name
      }
    }
  `)

  const { product } = data

  !loading && !error && console.log(data)

  return (
    <div>
      {!loading &&
        !error &&
        data.products.map((i: any) => {
          return <h1>yep</h1>
        })}
    </div>
  )
}

export default Home
