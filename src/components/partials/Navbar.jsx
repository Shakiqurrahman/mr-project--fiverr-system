import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
    const { user } = useSelector((state) => state.user);

    const adminRole = user?.role === "ADMIN";
    // const userRole = user?.role === "USER";

    return (
        <nav className="bg-primary py-4">
            <ul className="max-width flex flex-wrap gap-x-6 gap-y-2 text-white justify-center">
                {adminRole && (
                    <>
                        <li className="hover:text-gray-300 duration-300">
                            <Link to="/upload">Upload</Link>
                        </li>
                        <li className="hover:text-gray-300 duration-300">
                            <Link to="/analytics">Analytics</Link>
                        </li>
                        <li className="hover:text-gray-300 duration-300">
                            <Link to="/admin-dashboard">Dashboard</Link>
                        </li>
                    </>
                )}
                <li className="hover:text-gray-300 duration-300">
                    <Link to="/designs">Designs</Link>
                </li>
                <li className="hover:text-gray-300 duration-300">
                    <Link to="/industries">Industries</Link>
                </li>
                <li className="hover:text-gray-300 duration-300">
                    <Link to="/dashboard">Price List</Link>
                </li>
                <li className="hover:text-gray-300 duration-300">
                    <Link to="/dashboard">Project</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
