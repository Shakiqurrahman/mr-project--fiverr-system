import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "../components/partials/Footer";
import Header from "../components/partials/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <ScrollRestoration />
      <Footer />
      <Toaster position="top-center" />
    </>
  );
};

export default Layout;
