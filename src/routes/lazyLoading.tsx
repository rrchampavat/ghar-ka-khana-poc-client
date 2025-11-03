import { lazy } from "react";

// AUTH
export const Login = lazy(() => import("../pages/login/Login"));
export const SignUp = lazy(() => import("../pages/register/Register"));

// ERROR
export const NotFound = lazy(() => import("../pages/error/404/404"));
export const ServerError = lazy(() => import("../pages/error/500/503.tsx"));

// MAIN
export const Home = lazy(() => import("../pages/home/Home"));

// USER
export const UserDetails = lazy(
  () => import("../pages/user-details/UserDetails.tsx")
);
export const Users = lazy(() => import("../pages/users/Users.tsx"));
