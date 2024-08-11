import React, { useState } from "react";
import { BiX } from "react-icons/bi";
import { BsCart4 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoSearch } from "react-icons/go";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/MR Logo White.png";
import Navbar from "./Navbar";
import UserBox from "./UserBox";

function Header() {
    const [user, setUser] = useState(false);
    const [activeMenu, setActiveMenu] = useState(false);

    const handleClose = () => {
        setActiveMenu(!activeMenu);
    };
    return (
        <>
            <header className="h-20">
                <div className="bg-[#121212] fixed top-0 w-full z-10">
                    <div className="h-20 max-width flex justify-between items-center">
                        <div>
                            <img className="size-16" src={logo} alt="MR Logo" />
                        </div>
                        <form className="hidden lg:block">
                            <div className="relative flex justify-center items-center">
                                <input
                                    className="min-w-[400px] bg-white px-4 py-2 rounded-md outline"
                                    type="text"
                                    placeholder="What design you are looking for today?"
                                />
                                <button
                                    className="absolute right-0.5 bg-primary p-2 rounded-md"
                                    type="submit"
                                >
                                    <GoSearch className="text-white text-xl" />
                                </button>
                            </div>
                        </form>
                        <nav className="flex gap-6 items-center">
                            <ul
                                className={`text-white md:static flex-col md:flex-row items-center gap-6 duration-300  ${
                                    activeMenu
                                        ? "flex absolute top-20 w-full left-0 py-16 bg-black md:bg-transparent"
                                        : "hidden md:flex"
                                }`}
                            >
                                <li
                                    className="text-white hover:text-gray-300"
                                    onClick={handleClose}
                                >
                                    <NavLink to="/">Home</NavLink>
                                </li>
                                <li
                                    className="text-white hover:text-gray-300"
                                    onClick={handleClose}
                                >
                                    <NavLink to="/messages">Messages</NavLink>
                                </li>
                                <li
                                    className="text-white hover:text-gray-300"
                                    onClick={handleClose}
                                >
                                    <NavLink to="/notifications">
                                        Notifications
                                    </NavLink>
                                </li>
                                <li
                                    className="text-white hover:text-gray-300"
                                    onClick={handleClose}
                                >
                                    <NavLink to="/contact">Contact</NavLink>
                                </li>
                            </ul>
                            <ul
                                className={`flex items-center gap-6 ${
                                    user && "flex-row-reverse"
                                }`}
                            >
                                <li className="text-white hover:text-gray-300">
                                    {user ? (
                                        <UserBox />
                                    ) : (
                                        <NavLink to="/join">Join</NavLink>
                                    )}
                                </li>
                                <li className="text-white hover:text-gray-300">
                                    <NavLink to="/notifications">
                                        <BsCart4 size={30} />
                                    </NavLink>
                                </li>
                            </ul>
                            <div>
                                <button
                                    className={`block md:hidden text-white w-6 focus:outline-none`}
                                    onClick={() => setActiveMenu(!activeMenu)}
                                >
                                    {activeMenu ? (
                                        <BiX size={30} />
                                    ) : (
                                        <GiHamburgerMenu size={24} />
                                    )}
                                </button>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
            <Navbar />
        </>
    );
}

export default Header;
