import { createBrowserRouter } from "react-router-dom";
import { Login, NotFound, ServerError, SignUp } from "./lazyLoading";
import AuthLayout from "@/layouts/Auth";

const routes = createBrowserRouter([
  // {
  //   path: "/",
  //   // element: <MainLayout />,
  //   errorElement: <ServerError />
  //   // children: [{ path: "/", element: <Dashboard /> }]
  // },
  {
    path: "/",
    element: <AuthLayout />,
    errorElement: <ServerError />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/sign-up", element: <SignUp /> }
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

export default routes;
