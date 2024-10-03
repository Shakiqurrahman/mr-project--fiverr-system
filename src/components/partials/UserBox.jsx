import { Divider, Menu, MenuItem, Skeleton } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../Redux/features/userSlice";
import { disconnectSocket } from "../../libs/socketService";

function UserBox() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading } = useSelector((state) => state.user);
  const isAuthorized = ["ADMIN", "SUPER_ADMIN"].includes(user?.role);  

  const handleLogout = () => {
    dispatch(logout());
    disconnectSocket();
    navigate("/join");
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const letterLogo = user?.userName?.trim().charAt(0).toUpperCase();

  let content;
  if (user.image) {
    content = (
      <img
        className="size-10 rounded-full bg-[rgba(255,255,255,0.20)] object-cover"
        src={user?.image}
        alt="user"
      />
    );
  } else {
    content = (
      <div className="flex size-10 items-center justify-center rounded-full bg-[#ffefef]/80 object-cover text-3xl font-bold text-[#3b3b3b]/50">
        {letterLogo}
      </div>
    );
  }
  return (
    <>
      <button
        onClick={handleClick}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        {loading && (
          <Skeleton
            className="!bg-[rgba(255,255,255,0.20)]"
            variant="circular"
            width={40}
            height={40}
          />
        )}
        {!loading && content}
      </button>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link to={`/${user?.userName}`}>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>
        <Link to="/billing-information">
          <MenuItem onClick={handleClose}>Billing Information</MenuItem>
        </Link>
        {isAuthorized && (
          <Link to="/payment-methods">
            <MenuItem onClick={handleClose}>Payment Methods</MenuItem>
          </Link>
        )}
        <Link to="/affiliate">
          <MenuItem onClick={handleClose}>Affiliate</MenuItem>
        </Link>
        <Link to="/change-password">
          <MenuItem onClick={handleClose}>Change Password</MenuItem>
        </Link>
        <Divider />
        <div onClick={handleLogout}>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </div>
      </Menu>
    </>
  );
}

export default UserBox;
