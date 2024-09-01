import React from "react";
import { ImSpinner10 } from "react-icons/im";

const Preloader = () => {
  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-white">
      <ImSpinner10 className="animate-spin text-7xl text-primary" />
    </div>
  );
};

export default Preloader;
