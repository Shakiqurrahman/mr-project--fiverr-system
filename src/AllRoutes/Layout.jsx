import React from "react";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "../components/partials/Footer";
import Header from "../components/partials/Header";
import PreviewImage from "../components/PreviewImage";

const Layout = () => {
  const { isOpen } = useSelector((state) => state.previewImage);
  return (
    <>
      <Header />
      <Outlet />
      <ScrollRestoration />
      <Footer />
      <Toaster position="top-center" />
      {isOpen && <PreviewImage />}
    </>
  );
};

export default Layout;
