import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { configApi } from "../libs/configApi";
import CountryList from "./CountryList";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { setUser } from "../Redux/features/userSlice";

const signUpSchema = z
    .object({
        country: z.string().nonempty("Country is required"),
        name: z.string().nonempty("Full Name is required"),
        username: z.string().nonempty("Username is required"),
        email: z.string().email("Invalid email address"),
        password: z
            .string()
            .min(6, "Password must be at least 6 characters long"),
        confirmPassword: z
            .string()
            .min(6, "Confirm password must be at least 6 characters long"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

function SignUpForm({ handleClick }) {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        country: "",
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [show, setShow] = useState(true);
    const navigate = useNavigate(); // Moved here

    const handleShow = () => {
        setShow(!show);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form data using Zod
        const validationResult = signUpSchema.safeParse(form);

        if (!validationResult.success) {
            const formErrors = validationResult.error.format();
            setErrors(formErrors); // Set errors in the state to display them
            Object.values(formErrors).forEach((error) => {
                if (error && error._errors) toast.error(error._errors[0]);
            });
            return;
        }

        // Clear errors if validation passes
        setErrors({});

        // If validation is successful, proceed with form submission
        try {
            const api = `${configApi.api}sign-up`;

            const { data } = await axios.post(api, {
                userName: form.username,
                fullName: form.name,
                email: form.email,
                country: form.country,
                password: form.password,
            });

            if (data.success) {
                const token = data.data;
                console.log(token);
                const user = {
                    userName: form.username,
                    name: form.name,
                    email: form.email,
                    country: form.country,
                    password: form.password,
                };
                dispatch(setUser({ user, token }));

                Cookies.set("authToken", JSON.stringify(token), {
                    expires: 10,
                });
                toast.success("User signed up successfully");
                setForm({
                    country: "",
                    name: "",
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });
                navigate("/setup-profile");
            } else {
                toast.error("User was not created");
            }
        } catch (error) {
            toast.error("Something went wrong!");
            console.error(error);
        }
    };

    return (
        <div>
            <CountryList country={form.country} handleChange={handleChange} />
            <label className="block px-2 pt-2">Full Name</label>
            <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="bg-white block w-full p-2 border border-solid border-[#e7e7e7] mt-3 outline-none"
            />
            <p className="text-red-600 text-xs mt-2 px-2 hidden">
                There was an error!
            </p>
            <label className="block px-2 pt-2">Username</label>
            <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="bg-white block w-full p-2 border border-solid border-[#e7e7e7] mt-3 outline-none"
            />
            <p className="text-red-600 text-xs mt-2 px-2 hidden">
                There was an error!
            </p>
            <label className="block px-2 pt-2">Email</label>
            <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="bg-white block w-full p-2 border border-solid border-[#e7e7e7] mt-3 outline-none"
            />
            <p className="text-red-600 text-xs mt-2 px-2 hidden">
                There was an error!
            </p>
            <label className="block px-2 pt-2">Set Password</label>
            <div className="relative">
                {show ? (
                    <button
                        className="absolute text-lg sm:text-2xl right-[20px] top-1/2 -translate-y-1/2 z-10 text-primary"
                        onClick={handleShow}
                    >
                        <FaEye />
                    </button>
                ) : (
                    <button
                        className="absolute text-lg sm:text-2xl right-[20px] top-1/2 -translate-y-1/2 z-10 text-primary"
                        onClick={handleShow}
                    >
                        <FaEyeSlash />
                    </button>
                )}
                <input
                    type={show ? "password" : "text"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="bg-white block w-full p-2 border border-solid border-[#e7e7e7] mt-3 z-0 outline-none"
                />
                <p className="text-red-600 text-xs mt-2 px-2 hidden">
                    There was an error!
                </p>
            </div>
            <label className="block px-2 pt-2">Confirm Password</label>
            <div className="relative">
                {show ? (
                    <button
                        className="absolute text-lg sm:text-2xl right-[20px] top-1/2 -translate-y-1/2 z-10 text-primary"
                        onClick={handleShow}
                    >
                        <FaEye />
                    </button>
                ) : (
                    <button
                        className="absolute text-lg sm:text-2xl right-[20px] top-1/2 -translate-y-1/2 z-10 text-primary"
                        onClick={handleShow}
                    >
                        <FaEyeSlash />
                    </button>
                )}
                <input
                    type={show ? "password" : "text"}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="bg-white block w-full p-2 border border-solid border-[#e7e7e7] mt-3 z-0 outline-none"
                />
                <p className="text-red-600 text-xs mt-2 px-2 hidden">
                    There was an error!
                </p>
            </div>
            <button
                type="submit"
                onClick={handleSubmit}
                className="my-4 py-2 sm:py-3 block w-full bg-primary text-white font-medium text-lg"
            >
                Sign Up
            </button>
            <p className="py-3 text-center text-sm">
                Already have an Account?{" "}
                <button
                    className="text-primary"
                    value="Sign In"
                    onClick={handleClick}
                >
                    Sign In
                </button>
            </p>
        </div>
    );
}

export default SignUpForm;
