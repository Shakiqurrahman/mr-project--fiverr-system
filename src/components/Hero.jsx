import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import bigDealIcon from "../assets/images/Big Deal.svg";
import heroBanner from "../assets/images/icons/heroBanner.jpg";
import bulletDotOrange from "../assets/images/icons/bullet-dot-orange.svg";
import bulletDotBlue from "../assets/images/icons/bullet-dot-blue.svg";
import starBlue from "../assets/images/icons/banner-star-blue.svg";
import circleOrange from "../assets/images/icons/circle-orange.svg";
import cornerShape from "../assets/images/icons/left-bottom-circle-line.svg";
import bottomCenterCircle from "../assets/images/icons/bottom-center-cicle-line.svg";
import triangleOrange from "../assets/images/icons/triangle-orange.svg";
import starOrange from "../assets/images/icons/banner-star-orange.svg";

const Hero = () => {
    const { control, handleSubmit, watch, setValue } = useForm();
    const [selectedItems, setSelectedItems] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState({});

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
        const filteredData = Object.entries(data).filter(
            ([key, value]) =>
                value === true ||
                value === "single_side" ||
                value === "double_side"
        ); // for showing only those values are true or a side is selected
        console.log("Filtered Data:", Object.fromEntries(filteredData));
    };

    const checkboxData = [
        { name: "door_hanger", label: "Door Hanger" },
        { name: "rack_card", label: "Rack Card" },
        { name: "billboard", label: "Billboard" },
        { name: "flyer", label: "Flyer" },
        { name: "Social_Media_Post", label: "Social Media" },
        { name: "yard_sign", label: "Yard Sign" },
        { name: "postcard", label: "Postcard" },
        { name: "facebook_cover", label: "Facebook Cover" },
        { name: "roll_up_Banner", label: "Roll-up Banner" },
    ];

    return (
        <section
            className="bg-cover bg-center relative overflow-hidden"
            style={{ backgroundImage: `url(${heroBanner})` }}
        >
            <div className="absolute -top-32 left-6">
                <img src={bulletDotOrange} alt="bullet-dot-orange" />
            </div>
            <div className="absolute -bottom-40 right-3">
                <img src={bulletDotBlue} alt="bullet-dot-blue" />
            </div>
            <div className="absolute top-36 lg:top-20 left-5 lg:left-[25%]">
                <img src={starBlue} alt="star blue" />
            </div>
            <div className="absolute top-10 right-5 sm:right-10 md:left-[40%]">
                <img src={circleOrange} alt="circleOrange" />
            </div>
            <div className="absolute -bottom-48 -left-44">
                <img src={cornerShape} alt="cornerShape" />
            </div>
            <div className="absolute -top-56 lg:-top-48 -right-60 lg:-right-44 hidden md:block">
                <img src={bottomCenterCircle} alt="bottomCenterCircle" />
            </div>
            <div className="absolute -bottom-64 right-[30%] lg:right-[45%] hidden md:block">
                <img src={cornerShape} alt="bottomCenterCircle" />
            </div>
            <div className="absolute bottom-10 left-[15%]">
                <img src={triangleOrange} alt="triangleOrange" />
            </div>
            <div className="absolute bottom-16 left-[35%]">
                <img src={starOrange} alt="starOrange" />
            </div>
            <div className="py-28 md:py-24 flex items-center relative z-20">
                <div className="max-width pr-0 lg:pr-24 2xl:pr-0 flex flex-col lg:flex-row gap-16 lg:gap-10 items-center">
                    <div className="w-full">
                        <h2 className="text-center lg:text-left text-2xl sm:text-[36px] font-bold uppercase text-primary leading-snug mb-4">
                            WE specialize in creating advertisement designs.
                        </h2>
                        <p className="text-center lg:text-left text-lg sm:text-2xl">
                            You can create any advertising design for your
                            business through us.
                        </p>
                    </div>
                    <div className="relative w-[80%] lg:w-full border-2 border-dashed border-primary px-6 py-10">
                        {/* big deal */}
                        <img
                            className="size-32 sm:size-40 md:size-54 xl:size-60 absolute ml-2 md:ml-0 -top-16 -left-16 sm:-left-20 md:-top-20 xl:-top-24 md:-left-20 xl:-left-28 z-[80]"
                            src={bigDealIcon}
                            alt="big deal icon"
                        />
                        {/* discounts */}
                        <div className="absolute space-y-1 -right-5 sm:-right-10 top-[50%] sm:top-20 font-Oswald">
                            <h4 className="bg-primary text-base sm:text-xl text-white px-1.5 sm:px-3 py-0.5 sm:py-1 uppercase  -rotate-[10deg] font-light">
                                Only <span className="font-bold">$120</span>
                            </h4>
                            <h4 className="bg-[#E85426] text-base sm:text-xl text-white px-1.5 sm:px-3 py-0.5 sm:py-1 uppercase  -rotate-[10deg] relative sm:left-10 left-5 font-light">
                                Orig{" "}
                                <span className="font-bold line-through">
                                    $160
                                </span>
                            </h4>
                        </div>

                        <h3 className="uppercase font-bold text-2xl sm:text-3xl text-center relative z-[90]">
                            business card design is
                        </h3>
                        <h1 className="text-primary text-4xl my-2 sm:text-7xl font-bold text-center">
                            FREE
                        </h1>
                        <p className="font-medium text-lg sm:text-2xl text-center">
                            if you create any{" "}
                            <span className="font-bold">3 designs</span> below
                            together
                        </p>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="grid sm:grid-cols-2 lg:grid-cols-3 mt-4 gap-2"
                        >
                            {checkboxData.map((item) => (
                                <div
                                    className="flex flex-col gap-2"
                                    key={item.name}
                                >
                                    <div className="flex items-center gap-2">
                                        <Controller
                                            name={item.name}
                                            control={control}
                                            render={({ field }) => (
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        className="size-4 accent-[#ed8864]"
                                                        type="checkbox"
                                                        id={item.name}
                                                        {...field}
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            handleCheckboxChange(
                                                                item.name,
                                                                e.target.checked
                                                            );
                                                        }}
                                                        disabled={isDisabled(
                                                            item.name
                                                        )}
                                                    />
                                                    <span className="text-[17px] select-none">
                                                        {item.label}
                                                    </span>
                                                </label>
                                            )}
                                        />
                                    </div>
                                    {dropdownVisible[item.name] && (
                                        <div
                                            className={`ml-6 space-y-1 transition-all duration-300 ease-in-out ${
                                                dropdownVisible[item.name]
                                                    ? "max-h-20 opacity-100"
                                                    : "max-h-0 opacity-0"
                                            } overflow-hidden`}
                                        >
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <Controller
                                                    name={`${item.name}_side`}
                                                    control={control}
                                                    render={({ field }) => (
                                                        <input
                                                            type="radio"
                                                            {...field}
                                                            value="single_side"
                                                            className="accent-[#ed8864]"
                                                        />
                                                    )}
                                                />
                                                <span className="select-none text-sm">
                                                    Single Side
                                                </span>
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <Controller
                                                    name={`${item.name}_side`}
                                                    control={control}
                                                    render={({ field }) => (
                                                        <input
                                                            type="radio"
                                                            {...field}
                                                            value="double_side"
                                                            className="accent-[#ed8864]"
                                                        />
                                                    )}
                                                />
                                                <span className="select-none text-sm">
                                                    Double Side
                                                </span>
                                            </label>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="absolute -bottom-5 right-8">
                                <button
                                    type="submit"
                                    className="bg-primary uppercase text-white py-2 px-4 font-bold rounded-[30px]"
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
