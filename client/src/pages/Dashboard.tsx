import FormButton from '../components/FormButton'
import LoadingSpinner from '../components/LoadingSpinner'

import { gql, useMutation } from '@apollo/client'

const Dashboard = ({ refetchUser }: any) => {
  const [logout, { data }] = useMutation(gql`
    mutation {
      logout
    }
  `)
  async function handleLogout(e: any) {
    e.preventDefault()

    await logout()
    window.location.reload()
  }

  return (
    <div>
      <FormButton type="button" handleClick={handleLogout}>
        Logout
      </FormButton>
      {data && <LoadingSpinner />}
    </div>
  )
}

export default Dashboard
