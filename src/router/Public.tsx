import { Navigate, Outlet } from "react-router-dom";

const Public = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/lobby" />;
  }
  return <Outlet />;
};

export default Public;
