import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";

const Public = () => {
  return (
    <>
      <SignedOut>
        <Outlet />
      </SignedOut>
      <SignedIn>
        <Navigate to="/lobby" />
      </SignedIn>
    </>
  );
};

export default Public;
