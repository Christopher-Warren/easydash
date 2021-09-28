import FormButton from '../components/FormButton'
import LoadingSpinner from '../components/LoadingSpinner'

import { gql, useQuery } from '@apollo/client'

const Dashboard = ({ logout }: any) => {
  const { data, loading } = useQuery(
    gql`
      query Events {
        events {
          title
        }
      }
    `,
  )

  const renderEvents = () => {
    const events = data.events.map((item: any, index: number) => {
      return <h1 key={index}>{item.title}</h1>
    })

    return events
  }
  return (
    <div>
      <FormButton type="button" handleClick={logout}>
        Logout
      </FormButton>
      {data && renderEvents()}
      {loading && <LoadingSpinner />}
    </div>
  )
}

export default Dashboard
