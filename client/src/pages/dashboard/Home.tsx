import PageWrapper from '../../components/PageWrapper'
import InfoCard from '../../components/cards/InfoCardSmall'
import { useEffect } from 'react'
import { DateTime } from 'luxon'
import OrdersActivity from '../../components/orders/OrdersActivity'
const Home = ({ userId, products, orders }: any) => {
  const { data, refetch } = orders

  useEffect(() => {
    const now = DateTime.now().toMillis()
    const pastWeek = DateTime.now().minus({ days: 7 }).toMillis()
    refetch({
      input: {
        filter: [
          {
            field: 'createdAt',
            query: {
              gte: pastWeek,
              lte: now,
            },
          },
        ],
        limit: null,
      },
    })
  }, [refetch])

  const renderRecentSales = (data: any) => {
    if (!data) return '0'

    return data.getAllOrders.reduce((acc: number, arr: any) => {
      return acc + arr.total
    }, 0)
  }

  const renderRecentOrders = (data: any) => {
    if (!data) return '0'

    return data.getAllOrders.length
  }

  return (
    <PageWrapper>
      <div className="mb-8">
        <h1 className="md:text-4xl text-3xl font-medium">Hello, {userId}</h1>
        <span className="tracking-wider">
          Welcome to your store's dashboard
        </span>
      </div>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-6 children:h-min row-span-full">
        <div className="grid grid-cols-2  col-span-3 gap-6">
          <div className="md:col-span-1 col-span-2">
            <InfoCard title="Sales">
              <span className="text-sm block dark:text-gray-400 ">
                Past week
              </span>

              <span className="text-4xl block text-right">
                {'$'}
                {renderRecentSales(data)}
              </span>
            </InfoCard>
          </div>

          <div className="md:col-span-1 col-span-2">
            <InfoCard title="Orders">
              <span className="text-sm block dark:text-gray-400 ">
                Past week
              </span>

              <span className="text-4xl block text-right">
                {renderRecentOrders(data)}
              </span>
            </InfoCard>
          </div>
          <div className="col-span-2">
            <InfoCard title="Sales">
              <span className="text-sm block">Today</span>

              <span className="text-4xl block text-right">$1000.42</span>
            </InfoCard>
          </div>
        </div>

        <div className="md:col-span-1 col-span-3">
          <div>
            <InfoCard title="Activity" titleClassName="relative mb-5">
              {/* <div className="bg-gray-800 absolute h-px left-0 w-full"></div> */}
              <OrdersActivity></OrdersActivity>
            </InfoCard>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

export default Home
