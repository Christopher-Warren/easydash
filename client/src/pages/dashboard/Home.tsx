import { useQuery, gql } from '@apollo/client'

import PageWrapper from '../../components/PageWrapper'
import InfoCard from '../../components/cards/InfoCard'

const Home = ({ userId }: any) => {
  const { data, loading, error } = useQuery(gql`
    query getCategories {
      products {
        name
      }
    }
  `)

  /* <p className="bg-white border border-gray-200 rounded-md p-2">
        hello, world
      </p> */

  // <div className="grid grid-cols-10 gap-5 my-10">
  //   <div className="col-span-4">
  //     <InfoCard>
  //       <h1>Sales</h1>
  //       <span className="text-5xl">$1000</span>
  //     </InfoCard>
  //   </div>
  //   <div className="bg-blue-500 col-span-4 min-h-full">Orders</div>
  //   <div className="bg-blue-500 col-span-2 row-span-2">
  // <ol className="con">
  //   Activity
  //   <li>item1</li>
  //   <li>item1</li>
  //   <li>item1</li>
  //   <li>item1</li>
  //   <li>item1</li>
  //   <li>item1</li>
  //   <li>item1</li>
  //   <li>item1</li>
  //   <li>item1</li>
  //   <li>item1</li>
  // </ol>
  //   </div>
  //   <div className="bg-blue-500 col-span-8">Fullfill, payments, stock</div>
  //   <div className="bg-blue-500 col-span-8">item</div>
  // </div>

  return (
    <PageWrapper>
      <h1 className="text-4xl font-medium">Hello, {userId}</h1>
      <span className="tracking-wider">Welcome to your store's dashboard</span>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 my-5 ">
        <div className="col-span-1  lg:col-span-9 grid grid-cols-2 gap-4">
          <div className="col-span-2 md:col-auto">
            <InfoCard title="Sales">
              <span className="text-sm block">Today</span>

              <span className="text-4xl block text-right">$1000.42</span>
            </InfoCard>
          </div>

          <div className="col-span-2 md:col-auto">
            <InfoCard title="Sales">
              <span className="text-sm block">Today</span>

              <span className="text-4xl block text-right">$1000.42</span>
            </InfoCard>
          </div>
          <div className="col-span-2">
            <InfoCard title="Sales">
              <span className="text-sm block">Today</span>

              <span className="text-4xl block text-right">$1000.42</span>
            </InfoCard>
          </div>
        </div>
        <div className="col-span-1 lg:col-span-3 ">
          <div className="lg:absolute">
            <InfoCard title="Activity" titleClassName="pb-4 relative">
              <div className="bg-gray-200 absolute h-px left-0 w-full"></div>
              <ol className="text-lg py-4">
                <li>Order #109582 Processed</li>
                <li>Order #109582 Processed</li>
                <li>Order #109582 Processed</li>
                <li>Order #109582 Processed</li>
                <li>Order #109582 Processed</li>
                <li>Order #109582 Processed</li>
                <li>Order #109582 Processed</li>
                <li>Order #109582 Processed</li>
                <li>Order #109582 Processed</li>
                <li>Order #109582 Processed</li>
                <li>Order #109582 Processed</li>
                <li>Order #109582 Processed</li>
                <li>Order #109582 Processed</li>
                <li>Order #109582 Processed</li>
                <li>Order #109582 Processed</li>
                <li>Order #109582 Processed</li>
              </ol>
            </InfoCard>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

export default Home
