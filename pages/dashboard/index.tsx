import Login from "../../client/src/pages/Login";

export async function getServerSideProps({ req }) {
  console.log(req.headers);

  return {
    redirect: {
      permanent: false,
      destination: "/dashboard/login",
    },
  };
}

const DashboardHome = () => {
  return <Login />;
};
export default DashboardHome;
