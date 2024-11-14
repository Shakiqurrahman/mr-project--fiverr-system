import React from "react";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "../components/partials/Header";
import PreviewImage from "../components/PreviewImage";

const ChatLayout = () => {
  const { isOpen } = useSelector((state) => state.previewImage);
  return (
    <>
      <Header />
      <Outlet />
      <ScrollRestoration />
      <Toaster position="top-center" />
      {isOpen && <PreviewImage />}
    </>
  );
};

export default ChatLayout;
