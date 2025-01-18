// import { Drawer } from "@mui/material";
import { Badge } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BiX } from "react-icons/bi";
import { BsCart4 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoSearch } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/MR Logo White.png";
import CartDrawer from "./CartDrawer";
import Navbar from "./Navbar";
import UserBox from "./UserBox";

import Drawer from "react-modern-drawer";
//react-drawer css
import "react-modern-drawer/dist/index.css";

import { IoSearch } from "react-icons/io5";
import useSyncCart from "../../hooks/useSyncCart";
import { useGetNotificationCountQuery } from "../../Redux/api/apiSlice";
import { useInboxBubbleCountingQuery } from "../../Redux/api/inboxApiSlice";
import { useLazyGetDesignsBySearchQuery } from "../../Redux/api/uploadDesignApiSlice";
import {
  setNotificationBubble,
  setOpenNotificationDrawer,
  setOpenNotifications,
  setSearchedText,
  setSearchResult,
} from "../../Redux/features/utilSlice";
import InboxDrawerModal from "../chat/InboxDrawerModal";
import NotificationModal from "../Notifications/NotificationModal";
import SearchBox from "./SearchBox";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { openNotifications, openNotificationDrawer, notificationBubble } =
    useSelector((state) => state.utils);
  const [getDesignsBySearch, { data: searchResults }] =
    useLazyGetDesignsBySearchQuery();

  const { user } = useSelector((state) => state.user);
  const { items: cartItems } = useSelector((state) => state.cart);

  const { data: inboxBubbleCount } = useInboxBubbleCountingQuery(null, {
    skip: !user,
  });
  const { data: notificationBubbleCount } = useGetNotificationCountQuery(null, {
    skip: !user,
    pollingInterval: 30000,
  });

  const [activeMenu, setActiveMenu] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openInboxDrawer, setOpenInboxDrawer] = useState(false);
  const [openSearchBox, setOpenSearchBox] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const isAuthorized = ["ADMIN", "SUPER_ADMIN", "SUB_ADMIN"].includes(
    user?.role,
  );

  const handleClose = () => {
    setActiveMenu(false);
  };

  const handleNotificationClick = () => {
    setActiveMenu(false);
    dispatch(setOpenNotifications(true));
  };

  const handleNotificationDrawerClick = () => {
    setActiveMenu(false);
    dispatch(setOpenNotificationDrawer(true));
  };
  useSyncCart();

  const handleSearch = async (e) => {
    dispatch(setSearchedText(searchValue));
    e.preventDefault();
    if (searchValue) {
      getDesignsBySearch(searchValue);
      navigate("/designs");
    }
    setSearchValue("");
  };

  useEffect(() => {
    if (searchResults) {
      dispatch(setSearchResult(searchResults));
    }
  }, [searchResults]);

  return (
    <>
      {/* <header className="sticky top-0 z-[99]"> */}
      <header className="relative z-[99]">
        <div className="relative z-10 bg-[#121212]">
          <div className="max-width flex h-16 items-center justify-between sm:h-20">
            <Link to="/">
              <img
                className="size-10 object-contain sm:size-16"
                src={logo}
                alt="MR Logo"
              />
            </Link>
            <form
              onSubmit={handleSearch}
              className="hidden min-w-[400px] rounded-md bg-white lg:block"
            >
              <div className="relative flex items-stretch">
                <input
                  className="w-full rounded-md px-4 py-2 text-base outline-none"
                  type="text"
                  value={searchValue}
                  name="searchText"
                  placeholder="What design you are looking for today?"
                  onChange={(e) => setSearchValue(e.target.value)}
                  // onClick={() => setOpenSearchBox(true)}
                />
                <button
                  className="m-px rounded-md bg-primary p-2"
                  type="submit"
                >
                  <GoSearch className="text-xl text-white" />
                </button>
              </div>
            </form>
            <nav className="flex items-center gap-6">
              <ul
                className={`z-[100] flex-col items-center gap-6 text-white duration-300 md:static md:flex-row ${
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
                {isAuthorized ? (
                  <li
                    className="text-white hover:text-gray-300"
                    onClick={handleClose}
                  >
                    <Badge
                      badgeContent={inboxBubbleCount ? inboxBubbleCount : 0}
                      // invisible={inboxBubbleCount ? false : true}
                      // variant="dot"
                      sx={{
                        "& .MuiBadge-badge": {
                          backgroundColor: "#1b8cdc",
                          color: "white",
                        },
                      }}
                    >
                      <button
                        type="button"
                        className="hidden md:block"
                        onClick={() => setOpenInboxDrawer(true)}
                      >
                        Inbox
                      </button>
                      {/* Inbox Drawer for pc version */}
                      {openInboxDrawer && (
                        <InboxDrawerModal close={setOpenInboxDrawer} />
                      )}

                      {/* Inbox Navlink for mobile version */}
                      <NavLink to="/inbox" className="block md:hidden">
                        Inbox
                      </NavLink>
                    </Badge>
                  </li>
                ) : (
                  <li
                    className="text-white hover:text-gray-300"
                    onClick={handleClose}
                  >
                    <Badge
                      badgeContent={inboxBubbleCount ? inboxBubbleCount : 0}
                      sx={{
                        "& .MuiBadge-badge": {
                          backgroundColor: "#1b8cdc",
                          color: "white",
                        },
                      }}
                    >
                      <NavLink to="/inbox">Inbox</NavLink>
                    </Badge>
                  </li>
                )}
                <li className="hidden md:block">
                  <Badge
                    badgeContent={
                      notificationBubbleCount > 0
                        ? notificationBubbleCount
                        : notificationBubble
                          ? notificationBubble
                          : 0
                    }
                    // variant="dot"
                    sx={{
                      "& .MuiBadge-badge": {
                        backgroundColor: "#1b8cdc",
                        color: "white",
                      },
                    }}
                  >
                    <button
                      className="text-white hover:text-gray-300"
                      onClick={handleNotificationClick}
                    >
                      Notifications
                    </button>
                    {/* Notification Modal */}
                    {openNotifications && (
                      <NotificationModal close={setOpenNotifications} />
                    )}
                  </Badge>
                </li>
                <li className="block md:hidden">
                  <Badge
                    badgeContent={
                      notificationBubbleCount > 0
                        ? notificationBubbleCount
                        : notificationBubble
                          ? notificationBubble
                          : 0
                    }
                    // variant="dot"
                    sx={{
                      "& .MuiBadge-badge": {
                        backgroundColor: "#1b8cdc",
                        color: "white",
                      },
                    }}
                  >
                    <button
                      className="text-white hover:text-gray-300"
                      onClick={handleNotificationDrawerClick}
                    >
                      Notifications
                    </button>
                  </Badge>
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
                  className={`${!user && "hidden md:block"} flex shrink-0 items-center text-white hover:text-gray-300`}
                >
                  {user ? <UserBox /> : <NavLink to="/join">Join</NavLink>}
                </li>
                <li>
                  {/* <NavLink to="/cart"> */}
                  <div
                    className="relative cursor-pointer"
                    onClick={() => setOpenDrawer(true)}
                  >
                    <Badge
                      badgeContent={cartItems.length}
                      sx={{
                        "& .MuiBadge-badge": {
                          backgroundColor: "#1b8cdc",
                          color: "white",
                        },
                      }}
                    >
                      <BsCart4
                        className="text-white hover:text-gray-300"
                        size={30}
                      />
                    </Badge>
                    {/* <span className="absolute -right-2 -top-2 size-6 rounded-full bg-primary text-center text-xs leading-[24px] text-white">
                      {cartItems.length}
                    </span> */}
                  </div>
                  <Drawer
                    open={openDrawer}
                    onClose={() => setOpenDrawer(false)}
                    direction="right"
                    className="drawer-scroller !w-full !max-w-[450px] !overflow-y-auto !bg-slate-100"
                  >
                    <CartDrawer close={() => setOpenDrawer(false)} />
                  </Drawer>
                  {/* </NavLink> */}
                </li>
                <li className="flex items-center lg:hidden">
                  <button onClick={() => setOpenSearchBox(true)}>
                    <IoSearch className="text-2xl text-white" />
                  </button>
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

      {/* Notification Drawer For Mobile Version */}
      {openNotificationDrawer && (
        <div className="fixed left-0 top-0 z-[9999999999] flex h-screen w-full items-start justify-center bg-black/50 p-5 backdrop-blur-sm">
          <NotificationModal close={setOpenNotificationDrawer} />
        </div>
      )}
      {/* SearchBox */}
      {openSearchBox && <SearchBox handleClose={setOpenSearchBox} />}
    </>
  );
}

export default Header;
