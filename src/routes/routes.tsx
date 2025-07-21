import AuthLayout from "@/layouts/auth/AuthLayout";
import MainLayout from "@/layouts/main/MainLayout";
import { createBrowserRouter } from "react-router-dom";
import { Home, Login, NotFound, ServerError, SignUp } from "./lazyLoading";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ServerError />,
    children: [{ path: "/", element: <Home /> }]
  },
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
