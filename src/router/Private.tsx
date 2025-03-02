import { Navigate, Outlet } from "react-router-dom";

const Private = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default Private;
