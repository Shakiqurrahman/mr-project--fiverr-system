import React, { useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/MR Logo White.png";
import UserBox from "./UserBox";

function Header() {
    const [user, setUser] = useState(true);
    return (
        <header className="bg-[#121212]">
            <div className="max-width h-20 flex justify-between items-center">
                <div>
                    <img className="size-16" src={logo} alt="MR Logo" />
                </div>
                <form>
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
                <nav className="flex gap-6">
                    <ul className="flex items-center gap-6">
                        <li className="text-white hover:text-gray-300">
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li className="text-white hover:text-gray-300">
                            <NavLink to="/messages">Messages</NavLink>
                        </li>
                        <li className="text-white hover:text-gray-300">
                            <NavLink to="/notifications">Notifications</NavLink>
                        </li>
                        <li className="text-white hover:text-gray-300">
                            <NavLink to="/contact">Contact</NavLink>
                        </li>
                    </ul>
                    <ul className={`flex items-center gap-6 ${user && 'flex-row-reverse'}`}>
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
                </nav>
            </div>
        </header>
    );
}

export default Header;
