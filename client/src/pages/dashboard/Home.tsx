import PageWrapper from '../../components/PageWrapper'
import InfoCard from '../../components/cards/InfoCardSmall'

const Home = ({ userId }: any) => {
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
