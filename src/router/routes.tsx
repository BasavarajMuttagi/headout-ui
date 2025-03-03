import Challenge from "@/pages/Challenge";
import Game from "@/pages/Game";
import Landing from "@/pages/Landing";
import Lobby from "@/pages/Lobby";
import NotFound from "@/pages/NotFound";
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
    ],
  },
  {
    path: "/lobby",
    element: <Lobby />,
  },
  {
    element: <Private />,
    children: [
      {
        path: "/game/:sessionId",
        element: <Game />,
      },
      {
        path: "/share/:shareCode",
        element: <Challenge />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
export default routes;
