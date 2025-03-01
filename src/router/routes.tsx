import Login from "@/components/Login";
import Landing from "@/pages/Landing";
import Lobby from "@/pages/Lobby";
import { createBrowserRouter } from "react-router-dom";
import Private from "./Private";
import Public from "./Public";

const routes = createBrowserRouter([
  {
    element: <Public />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
    ],
  },
  {
    element: <Private />,
    children: [
      {
        path: "/lobby",
        element: <Lobby />,
      },
    ],
  },
]);
export default routes;
