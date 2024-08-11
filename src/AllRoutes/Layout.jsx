import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <>
      <Header />
      <Navbar />
      <Outlet />
      {/* <ScrollRestoration /> */}
      {/* <Footer /> */}
    </>
  );
};

export default Layout;