import { Navigate, Outlet } from "react-router-dom";

const Public = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/game" />;
  }
  return <Outlet />;
};

export default Public;
