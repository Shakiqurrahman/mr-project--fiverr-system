import React from "react";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Outlet, ScrollRestoration } from "react-router-dom";
import PreviewImage from "../components/PreviewImage";
import Footer from "../components/partials/Footer";
import Header from "../components/partials/Header";

const Layout = () => {
  const { isOpen } = useSelector((state) => state.previewImage);
  return (
    <>
      <Header />
      <Outlet />
      <ScrollRestoration />
      {/* Social Media Section  */}
      {/*Note: Social Medias Link will off untill the client wants to show   <SocialMediaLinks /> */}
      <Footer />
      <Toaster position="top-center" />
      {isOpen && <PreviewImage />}
    </>
  );
};

export default Layout;
