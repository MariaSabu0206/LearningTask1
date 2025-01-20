import React, { useContext, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import { UserContext } from "./UserContext";
import ToastProvider from "./ToastProvider";

const MainPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { hasToken } = useContext(UserContext);
  const location = useLocation();

  const hideHeaderPaths = ["/login", "/not-found"];

//   if (hasToken() && location.pathname === "/login") {
//     return <Navigate to="/dashboard" replace />;
//   }

  if (!hasToken() && location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {!hideHeaderPaths.includes(location.pathname) && (
        <Header onSidebarToggle={setIsSidebarOpen} />
      )}
      <div
        className="main-content"
        style={{
          marginLeft: isSidebarOpen ? "250px" : "0",
          transition: "margin-left 0.3s ease",
        }}
      >
        <ToastProvider>
          <Outlet />
        </ToastProvider>
      </div>
    </>
  );
};

export default MainPage;
