import React, { useState } from "react";
import {  Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import ToastProvider from "./ToastProvider";

const MainPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const hideHeaderPaths = ["/login"];


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
