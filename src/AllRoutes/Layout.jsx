import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "../components/partials/Header";
// import Navbar from "../components/partials/Navbar"
import Footer from "../components/partials/Footer";
import { Toaster } from 'react-hot-toast';

const Layout = () => {
  return (
    <>
      <Header />
      {/* <Navbar /> */}
      <Outlet />
      <ScrollRestoration />
      <Footer />
      <Toaster position="top-right" />
    </>
  );
};

export default Layout;
