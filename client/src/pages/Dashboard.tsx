import FormButton from '../components/FormButton'
import LoadingSpinner from '../components/LoadingSpinner'

import { gql, useQuery } from '@apollo/client'

const Dashboard = ({ refetchUser }: any) => {
  async function handleLogout(e: any) {
    e.preventDefault()
  }

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
    const events = data.events.map((item: any) => {
      return <h1>{item.title}</h1>
    })

    return events
  }
  return (
    <div>
      <FormButton type="button" handleClick={handleLogout}>
        Logout
      </FormButton>
      {data && renderEvents()}
      {loading && <LoadingSpinner />}
    </div>
  )
}

export default Dashboard
