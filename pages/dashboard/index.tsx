import Login from "../../client/src/pages/Login";
import { getCookie } from "cookies-next";

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
  return <div>Dash home</div>;
};
export default DashboardHome;
