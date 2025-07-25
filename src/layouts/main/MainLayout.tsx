import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./component/header/Header";

const MainLayout = () => {
  const isAuthenticated = Boolean(Cookies.get("accessToken"));

  if (!isAuthenticated) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto h-[calc(100vh-65px)] p-4">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
