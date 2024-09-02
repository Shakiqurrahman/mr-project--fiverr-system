import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CiSettings } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import bigDealIcon from "../assets/images/Big Deal.svg";
import starBlue from "../assets/images/icons/banner-star-blue.svg";
import starOrange from "../assets/images/icons/banner-star-orange.svg";
import bottomCenterCircle from "../assets/images/icons/bottom-center-cicle-line.svg";
import bulletDotBlue from "../assets/images/icons/bullet-dot-blue.svg";
import bulletDotOrange from "../assets/images/icons/bullet-dot-orange.svg";
import circleOrange from "../assets/images/icons/circle-orange.svg";
import heroBanner from "../assets/images/icons/heroBanner.jpg";
import cornerShape from "../assets/images/icons/left-bottom-circle-line.svg";
import triangleOrange from "../assets/images/icons/triangle-orange.svg";
import { useFetchOfferProjectQuery } from "../Redux/api/offerProjectApiSlice";
import { setOfferProject } from "../Redux/features/offerProjectSlice";

const Hero = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const adminRole = user?.role === "ADMIN";

  const offerProjects = useSelector((state) => state.offerProject.offerProject);
  const { data, isLoading, error } = useFetchOfferProjectQuery();

  const { control, handleSubmit, watch, setValue } = useForm();
  const [selectedItems, setSelectedItems] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState({});

  // when data will loaded it will dispatch the setOfferProject action to hold the data
  useEffect(() => {
    if (data) {
      dispatch(setOfferProject(data));
    }
  }, [data, dispatch]);

  const watchAllFields = watch();

  const handleCheckboxChange = (name, checked) => {
    if (checked && selectedItems.length < 3) {
      setSelectedItems([...selectedItems, name]);
      setDropdownVisible((prev) => ({ ...prev, [name]: true }));
    } else if (!checked) {
      setSelectedItems(selectedItems.filter((item) => item !== name));
      setDropdownVisible((prev) => ({ ...prev, [name]: false }));
      setValue(`${name}_side`, ""); // Reset the radio selection
    }
  };

  const isDisabled = (name) => {
    return selectedItems.length >= 3 && !selectedItems.includes(name);
  };

  const onSubmit = (data) => {
    const submittedData = {
      ...offerProjects,
      designs: offerProjectsData.map((item) => {
        // Map through all subcategories and mark the selected one
        const subCategories = item?.designView.map((subCategory) => {
          const isSelected = data[`${item.designName}_side`] === subCategory;

          return {
            subCategoryName: subCategory.toLowerCase().replace(/\s+/g, ""), // Convert to lowercase and remove spaces for name
            subCategoryLabel: subCategory,
            isSelected, // Boolean indicating if this subcategory was selected
          };
        });

        return {
          categoryName: item.designName.toLowerCase().replace(/\s+/g, ""), // Dynamic category name
          categoryLabel: item.designName,
          isSelected: !!data[item.designName], // Boolean indicating if this category was selected
          subCategories, // Include all subcategories with their selected status
        };
      }),
    };

    navigate("/start-offer-project", { state: submittedData });
  };

  const offerProjectsData = offerProjects?.designs || [];
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBanner})` }}
    >
      <div className="absolute -top-24 left-4 w-44 md:-top-32 md:left-6 md:w-full">
        <img src={bulletDotOrange} alt="bullet-dot-orange" />
      </div>
      <div className="absolute -bottom-28 right-3 w-44 md:-bottom-40 md:w-auto">
        <img src={bulletDotBlue} alt="bullet-dot-blue" />
      </div>
      <div className="absolute right-5 top-6 md:left-5 md:top-36 lg:left-[25%] lg:top-20">
        <img src={starBlue} alt="star blue" />
      </div>
      <div className="absolute left-[40%] top-10 hidden md:block">
        <img src={circleOrange} alt="circleOrange" />
      </div>
      <div className="absolute -bottom-48 -left-44 hidden md:block">
        <img src={cornerShape} alt="cornerShape" />
      </div>
      <div className="absolute -right-60 -top-56 hidden md:block lg:-right-44 lg:-top-44">
        <img src={bottomCenterCircle} alt="bottomCenterCircle" />
      </div>
      <div className="absolute -bottom-64 right-[30%] hidden md:block lg:right-[45%]">
        <img src={cornerShape} alt="bottomCenterCircle" />
      </div>
      <div className="absolute bottom-10 left-[15%]">
        <img src={triangleOrange} alt="triangleOrange" />
      </div>
      <div className="absolute bottom-16 left-[35%] hidden md:block">
        <img src={starOrange} alt="starOrange" />
      </div>
      <div className="relative z-20 flex items-center py-20">
        <div className="max-width flex flex-col items-center gap-16 pr-0 lg:flex-row lg:gap-10 lg:pr-24 2xl:pr-0">
          <div className="w-full">
            <h2 className="mb-4 text-center text-2xl font-bold uppercase leading-snug text-primary sm:text-[36px] lg:text-left">
              WE specialize in creating advertisement designs.
            </h2>
            <p className="text-center text-lg sm:text-2xl lg:text-left">
              You can create any advertising design for your business through
              us.
            </p>
          </div>
          <div className="relative w-[80%] border-2 border-dashed border-primary px-6 py-10 lg:w-full">
            {/* setting icon  */}
            {adminRole &&
              <CiSettings onClick={()=> navigate('/offer-project', {state: offerProjects})} className="absolute right-1.5 top-1.5 cursor-pointer text-2xl" />
            }
            {/* big deal */}
            <img
              className="md:size-54 absolute -left-16 -top-16 z-[80] ml-2 size-32 sm:-left-20 sm:size-40 md:-left-20 md:-top-20 md:ml-0 xl:-left-28 xl:-top-24 xl:size-60"
              src={bigDealIcon}
              alt="big deal icon"
            />
            {/* discounts */}
            <div className="font-Oswald absolute -right-5 top-[50%] sm:right-2 sm:top-20">
              <h4 className="-skew-y-[12deg] select-none bg-primary px-1 py-0.5 text-base font-light uppercase text-white sm:px-2 sm:text-xl">
                Only{" "}
                <span className="font-bold">${offerProjects?.offerAmount}</span>
              </h4>
              <h4 className="relative left-5 -skew-y-[12deg] select-none bg-[#E85426] px-1 py-0.5 text-base font-light uppercase text-white sm:left-10 sm:px-2 sm:text-xl">
                Orig{" "}
                <span className="font-bold line-through">
                  ${offerProjects?.originalAmount}
                </span>
              </h4>
            </div>

            <h3 className="relative z-[90] text-center text-2xl font-bold uppercase sm:text-3xl">
              {offerProjects?.freeDesignName} is
            </h3>
            <h1 className="my-2 text-center text-4xl font-bold text-primary sm:text-7xl">
              FREE
            </h1>
            <p className="text-center text-lg font-medium sm:text-2xl">
              if you create any <span className="font-bold">3 designs</span>{" "}
              below together
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3"
            >
              {offerProjectsData.map((item, idx) => (
                <div className="flex flex-col gap-2" key={idx}>
                  <div className="flex items-center gap-2">
                    <Controller
                      name={item?.designName}
                      control={control}
                      render={({ field }) => (
                        <label className="flex cursor-pointer items-center gap-2">
                          <input
                            className="size-4 accent-[#ed8864]"
                            type="checkbox"
                            id={item.designName}
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              handleCheckboxChange(
                                item.designName,
                                e.target.checked,
                              );
                            }}
                            disabled={isDisabled(item.designName)}
                          />
                          <span className="select-none text-[17px]">
                            {item.designName}
                          </span>
                        </label>
                      )}
                    />
                  </div>
                  {dropdownVisible[item.designName] && (
                    <div
                      className={`ml-6 space-y-1 transition-all duration-300 ease-in-out ${
                        dropdownVisible[item.designName]
                          ? "max-h-20 opacity-100"
                          : "max-h-0 opacity-0"
                      } overflow-hidden`}
                    >
                      {item?.designView.map((type) => (
                        <label
                          key={type}
                          className="flex cursor-pointer items-center gap-2"
                        >
                          <Controller
                            name={`${item.designName}_side`}
                            control={control}
                            render={({ field }) => (
                              <input
                                type="radio"
                                {...field}
                                value={type}
                                className="accent-[#ed8864]"
                              />
                            )}
                          />
                          <span className="select-none text-sm">{type}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="absolute -bottom-5 right-1/2 translate-x-1/2 md:right-8 md:translate-x-0">
                <button
                  type="submit"
                  className="rounded-[30px] bg-primary px-2.5 py-2 text-xs font-bold uppercase text-white sm:px-4 sm:text-base"
                >
                  Project Start
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
