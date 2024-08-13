import React, { useState } from "react";
import bigDealIcon from "../assets/images/Big Deal.svg";
import heroBanner from "../assets/images/Home Page Banner.jpg";
import shape from "../assets/images/free_shape.png";

const Hero = () => {
    const [selectedItems, setSelectedItems] = useState([]);

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;

        if (checked && selectedItems.length < 3) {
            setSelectedItems([...selectedItems, name]);
        } else if (!checked) {
            setSelectedItems(selectedItems.filter((item) => item !== name));
        }
    };

    const isDisabled = (name) => {
        return selectedItems.length >= 3 && !selectedItems.includes(name);
    };

    const checkboxData = [
        { name: "door_hanger", label: "Door Hanger" },
        { name: "rack_card", label: "Rack Card" },
        { name: "billboard", label: "Billboard" },
        { name: "flyer", label: "Flyer" },
        {
            name: "Social_Media_Post",
            label: "Social Media",
        },
        { name: "yard_sign", label: "Yard Sign" },
        { name: "postcard", label: "Postcard" },
        { name: "facebook_cover", label: "Facebook Cover" },
        { name: "roll_up_Banner", label: "Roll-up Banner" },
    ];

    return (
        <section
            className="py-20 flex items-center bg-cover bg-center"
            style={{ backgroundImage: `url(${heroBanner})` }}
        >
            <div className="max-width flex flex-col lg:flex-row gap-20 items-center">
                <div className="w-full">
                    <h2 className="text-center lg:text-left text-2xl sm:text-4xl font-bold uppercase text-primary mb-4">
                        WE specialize in crea ting advertisement designs.
                    </h2>
                    <p className="text-center lg:text-left text-lg sm:text-2xl">
                        You can create any advertising design for your business
                        through us.
                    </p>
                </div>
                <div className="relative w-[80%] lg:w-full border-2 border-dashed border-primary px-6 py-10">
                    <img
                        className="size-40 md:size-60 absolute ml-2 md:ml-0 -top-16 -left-20 md:-top-24 md:-left-28"
                        src={bigDealIcon}
                        alt="big deal icon"
                    />
                    <img
                        className="absolute -right-10 top-20 sm:mr-0 sm:-right-6 w-32"
                        src={shape}
                        alt="icon"
                    />
                    <h3 className="uppercase font-bold text-3xl text-center">
                        business card design is
                    </h3>
                    <h1 className="text-primary text-5xl my-2 sm:text-7xl font-bold text-center">
                        FREE
                    </h1>
                    <p className="font-medium text-2xl text-center">
                        if you create any{" "}
                        <span className="font-bold">3 designs</span> below
                        together
                    </p>

                    <form className="grid sm:grid-cols-2 md:grid-cols-3 mt-4 gap-2">
                        {checkboxData.map((item) => (
                            <div
                                className="flex items-center gap-2"
                                key={item.name}
                            >
                                <input
                                    className="size-5 accent-[#ed8864]"
                                    type="checkbox"
                                    name={item.name}
                                    id={item.name}
                                    onChange={handleCheckboxChange}
                                    disabled={isDisabled(item.name)}
                                />
                                <label
                                    className="text-lg select-none"
                                    htmlFor={item.name}
                                >
                                    {item.label}
                                </label>
                            </div>
                        ))}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Hero;
