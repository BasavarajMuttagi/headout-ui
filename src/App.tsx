import { RouterProvider } from "react-router-dom";
import "./App.css";
import routes from "./router/routes";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <>
      <RouterProvider router={routes} />
      <Toaster />
    </>
  );
}

export default App;
