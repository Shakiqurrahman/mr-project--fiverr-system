import React, { useEffect, useState } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "../components/partials/Header";
// import Navbar from "../components/partials/Navbar"
import Footer from "../components/partials/Footer";
import { Toaster } from 'react-hot-toast';
import Preloader from "../libs/PreLoader";

const Layout = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };

    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);
  return (
    <>
      {isLoading && <Preloader />}
      <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'}>
      <Header />
      <Outlet />
      <ScrollRestoration />
      <Footer />
      <Toaster position="top-right" />
      </div>
    </>
  );
};

export default Layout;
