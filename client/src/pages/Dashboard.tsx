import FormButton from '../components/FormButton'
import LoadingSpinner from '../components/LoadingSpinner'

import { gql, useQuery } from '@apollo/client'
import SideBar from '../components/SideBar'
import { useState } from 'react'

const Dashboard = ({ logout }: any) => {
  let loading

  return (
    <div>
      <SideBar />
      <FormButton type="button" handleClick={logout}>
        Logout
      </FormButton>

      {loading && <LoadingSpinner />}
    </div>
  )
}

export default Dashboard
