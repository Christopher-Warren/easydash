import FormButton from '../components/FormButton'

import SideBar from '../components/SideBar'

// refactor side bar and build a better solution

const Dashboard = ({ logout }: any) => {
  return (
    <>
      <SideBar />
      <FormButton type="button" handleClick={logout}>
        Logout
      </FormButton>
    </>
  )
}

export default Dashboard
