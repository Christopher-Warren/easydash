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
      <h1 className="text-4xl text-gray-700 font-medium">Hello, {userId}</h1>
      <span className="text-gray-600 tracking-wider">
        Welcome to your store's dashboard
      </span>

      <div className="grid grid-cols-12 gap-5 text-white my-10">
        <div className="bg-blue-500 col-span-4">Sales</div>
        <div className="bg-blue-500 col-span-4">Orders</div>
        <div className="bg-blue-500 col-span-3 row-span-2">
          Activity
          <ol>
            <li>item1</li>
            <li>item1</li>
            <li>item1</li>
            <li>item1</li>
            <li>item1</li>
            <li>item1</li>
            <li>item1</li>
            <li>item1</li>
            <li>item1</li>
            <li>item1</li>
            <li>item1</li>
          </ol>
        </div>
        <div className="bg-blue-500 col-span-8 h-20">
          Fullfill, payments, stock
        </div>
        <div className="bg-blue-500 col-span-8">item</div>
      </div>
    </PageWrapper>
  )
}

export default Home
