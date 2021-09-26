import FormButton from '../components/FormButton'
import LoadingSpinner from '../components/LoadingSpinner'

import { gql, useMutation, useQuery } from '@apollo/client'

const Dashboard = ({ refetchUser }: any) => {
  async function handleLogout(e: any) {
    e.preventDefault()
  }

  const { data, error } = useQuery(
    gql`
      query Events {
        events {
          title
        }
      }
    `,
  )

  const mapEvents = () => {
    const events = data.events.map((item: any) => {
      return <h1>{item.title}</h1>
    })

    return events
  }
  console.log(error)
  return (
    <div>
      <FormButton type="button" handleClick={handleLogout}>
        Logout
      </FormButton>
      {data && mapEvents()}
      {error && error.message}
      {/* look in resolver to handle error  */}
    </div>
  )
}

export default Dashboard
