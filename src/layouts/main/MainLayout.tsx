import clearLocalStorage from "@/shared/clearLocalStorage";
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./component/header/Header";

const MainLayout = () => {
  const isAuthenticated = Boolean(Cookies.get("accessToken"));

  if (!isAuthenticated) {
    clearLocalStorage(["user"]);
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto h-[calc(100vh-60px)] p-4">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
