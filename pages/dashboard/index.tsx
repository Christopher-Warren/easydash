import Home from "../../components/dashboard/Home";
import useTheme from "../../hooks/useTheme";

const DashboardHome = () => {
  const [theme] = useTheme();

  return <Home />;
};
export default DashboardHome;
