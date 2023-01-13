import Home from "../../client/src/pages/dashboard/Home";
import useTheme from "../../hooks/useTheme";

// export async function getServerSideProps({ req, res }) {
//   const token = getCookie("token", { req, res });
//   console.log(token);
//   return {
//     redirect: {
//       permanent: false,
//       destination: "/dashboard/login",
//     },
//   };
// }

const DashboardHome = () => {
  const [theme] = useTheme();

  return <Home />;
};
export default DashboardHome;
