import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "../components/partials/Header";

const ChatLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <ScrollRestoration />
      <Toaster position="top-center" />
    </>
  );
};

export default ChatLayout;
