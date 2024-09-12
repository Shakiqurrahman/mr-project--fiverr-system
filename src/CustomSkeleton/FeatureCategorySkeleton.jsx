import React from "react";
import LeftArrowIcon from "../assets/images/icons/Left Arrow.svg";
import RightArrowIcon from "../assets/images/icons/Right Arrow.svg";

const FeatureCategorySkeleton = () => {
  return (
    <div className="mt-10 rounded-lg">
      <div className="relative rounded-xl border bg-white px-4">
        <div className="flex items-center justify-between py-3">
          <h1 className="text-base font-semibold sm:text-xl">Loading...</h1>
          <h1 className="text-base font-medium text-primary sm:text-lg">
            All Designs
          </h1>
        </div>
        <div className="flex gap-4">
          <div className="block h-[250px] w-full border bg-lightcream object-cover"></div>
          <div className="block h-[250px] w-full border bg-lightcream object-cover"></div>
          <div className="block h-[250px] w-full border bg-lightcream object-cover"></div>
        </div>
        <h1 className="p-3">Loading...</h1>
      </div>
    </div>
  );
};

export default FeatureCategorySkeleton;
