import { useQuery, gql } from '@apollo/client'

import PageWrapper from '../../components/PageWrapper'

const Home = ({ userId }: any) => {
  const { data, loading, error } = useQuery(gql`
    query getCategories {
      products {
        name
      }
    }
  `)

  console.log('asdasd', userId)

  /* <p className="bg-white border border-gray-200 rounded-md p-2">
        hello, world
      </p> */

  return (
    <PageWrapper>
      <h1 className="text-3xl  ">Hello, {userId}</h1>
    </PageWrapper>
  )
}

export default Home
