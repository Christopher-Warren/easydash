import FormButton from '../components/FormButton'

import SideBar from '../components/SideBar'

const Dashboard = ({ logout }: any) => {
  return (
    <div>
      <SideBar />
      <FormButton type="button" handleClick={logout}>
        Logout
      </FormButton>
    </div>
  )
}

export default Dashboard
