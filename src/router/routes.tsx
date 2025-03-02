import Landing from "@/pages/Landing";
import Lobby from "@/pages/Lobby";
import { createBrowserRouter } from "react-router-dom";
import Public from "./Public";
import Private from "./Private";
import Game from "@/pages/Game";

const routes = createBrowserRouter([
  {
    element: <Public />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/lobby",
        element: <Lobby />,
      },
    ],
  },
  {
    element: <Private />,
    children: [
      {
        path: "/game",
        element: <Game />,
      },
    ],
  },
]);
export default routes;
