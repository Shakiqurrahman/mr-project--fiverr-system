// import { Drawer } from "@mui/material";
import React, { useState } from "react";
import { BiX } from "react-icons/bi";
import { BsCart4 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoSearch } from "react-icons/go";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/MR Logo White.png";
import CartDrawer from "./CartDrawer";
import Navbar from "./Navbar";
import UserBox from "./UserBox";

import Drawer from "react-modern-drawer";
//react-drawer css
import "react-modern-drawer/dist/index.css";

function Header() {
  const { user, loading } = useSelector((state) => state.user);
  const { items: cartItems } = useSelector((state) => state.cart);
  const [activeMenu, setActiveMenu] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleClose = () => {
    setActiveMenu(false);
  };

  const toggleDrawer = () => {
    setOpenDrawer((prevState) => !prevState);
  };
  return (
    <>
      <header className="sticky top-0 z-[99]">
        <div className="z-10 bg-[#121212]">
          <div className="max-width flex h-16 items-center justify-between sm:h-20">
            <Link to="/">
              <img
                className="size-10 object-contain sm:size-16"
                src={logo}
                alt="MR Logo"
              />
            </Link>
            <form className="hidden lg:block">
              <div className="relative flex items-center justify-center">
                <input
                  className="min-w-[400px] rounded-md bg-white px-4 py-2 outline"
                  type="text"
                  placeholder="What design you are looking for today?"
                />
                <button
                  className="absolute right-0.5 rounded-md bg-primary p-2"
                  type="submit"
                >
                  <GoSearch className="text-xl text-white" />
                </button>
              </div>
            </form>
            <nav className="flex items-center gap-6">
              <ul
                className={`flex-col items-center gap-6 text-white duration-300 md:static md:flex-row ${
                  activeMenu
                    ? "absolute left-0 top-16 flex w-full bg-black py-16 sm:top-20 md:bg-transparent"
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
                  <NavLink to="/inbox">Inbox</NavLink>
                </li>
                <li
                  className="text-white hover:text-gray-300"
                  onClick={handleClose}
                >
                  <NavLink to="/notifications">Notifications</NavLink>
                </li>
                <li
                  className="text-white hover:text-gray-300"
                  onClick={handleClose}
                >
                  <NavLink to="/about">About</NavLink>
                </li>
                <li
                  className="text-white hover:text-gray-300"
                  onClick={handleClose}
                >
                  <NavLink to="/contact">Contact</NavLink>
                </li>
                {!user && (
                  <li
                    className="text-white hover:text-gray-300 md:hidden"
                    onClick={handleClose}
                  >
                    <NavLink to="/join">Join</NavLink>
                  </li>
                )}
              </ul>
              <ul
                className={`flex items-center gap-6 ${
                  user && "flex-row-reverse"
                }`}
              >
                <li
                  className={`${!user && "hidden md:block"} flex items-center text-white hover:text-gray-300`}
                >
                  {user ? <UserBox /> : <NavLink to="/join">Join</NavLink>}
                </li>
                <li>
                  {/* <NavLink to="/cart"> */}
                  <div
                    className="relative cursor-pointer"
                    onClick={() => setOpenDrawer(true)}
                  >
                    <BsCart4
                      className="text-white hover:text-gray-300"
                      size={30}
                    />
                    <span className="absolute -right-2 -top-2 size-6 rounded-full bg-primary text-center text-xs leading-[24px] text-white">
                      {cartItems.length}
                    </span>
                  </div>
                  <Drawer
                    open={openDrawer}
                    onClose={() => setOpenDrawer(false)}
                    direction="right"
                    className="!w-full !max-w-[450px] !bg-slate-100"
                  >
                    <CartDrawer close={() => setOpenDrawer(false)} />
                  </Drawer>
                  {/* </NavLink> */}
                </li>
              </ul>
              <div>
                <button
                  className={`block w-6 text-white focus:outline-none md:hidden`}
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
        <Navbar />
      </header>
    </>
  );
}

export default Header;
