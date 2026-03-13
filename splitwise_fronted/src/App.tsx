import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Applayout } from "./component/Applayout";
import { Signup } from "./pages/Signup";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Applayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
