import { Divider, Menu, MenuItem } from "@mui/material";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

function UserBox({ img }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <button
                onClick={handleClick}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
            >
                {img ? (
                    <img className="size-10" src={img} alt="user" />
                ) : (
                    <CgProfile size={32} />
                )}
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
                <MenuItem onClick={handleClose}>
                    <Link to="/profile">Profile</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link to="/my-account">My account</Link>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                    <Link to="/logout">Logout</Link>
                </MenuItem>
            </Menu>
        </>
    );
}

export default UserBox;
