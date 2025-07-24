import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = Boolean(Cookies.get("accessToken"));

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="grid h-screen items-center md:grid-cols-[2fr_2fr] lg:grid-cols-[2.7fr_2fr]">
      <Outlet />
    </main>
  );
};

export default AuthLayout;
