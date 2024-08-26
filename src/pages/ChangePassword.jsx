import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
    toggleShowConfirmPassword,
    toggleShowNewPassword,
    toggleShowOldPassword,
} from "../Redux/features/passwordVisibilitySlice";

function ChangePassword() {
    const dispatch = useDispatch();
    const { showOldPassword, showNewPassword, showConfirmPassword } =
        useSelector((state) => state.passwordVisibility);
    const [form, setForm] = useState({
        currentPassword: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { currentPassword, password, confirmPassword } = form;
        console.log(currentPassword, password, confirmPassword);
    };
    return (
        <div className="max-w-[600px] mx-auto mt-10 sm:mt-20">
            <h1 className="bg-primary text-white p-4">Change Password</h1>
            <div className="bg-[#DCEEFA] ">
                <p className="px-6 pt-4 text-sm">
                    8 characters ot longer. Combine upper and lowercase letters,
                    numbers and special characters.
                </p>
                <form onSubmit={handleSubmit} className="w-full p-5 sm:p-6">
                    <label className="block px-2 pt-2">Current Password</label>
                    <div className="relative flex items-center w-full mt-3">
                        <input
                            type={showOldPassword ? "text" : "password"}
                            placeholder="Create password"
                            value={form.currentPassword}
                            onChange={handleChange}
                            required
                            name="currentPassword"
                            className="w-full p-3 outline-none text-base"
                        />
                        <span
                            className="absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer text-2xl text-primary select-none"
                            onClick={() => dispatch(toggleShowOldPassword())}
                        >
                            {showOldPassword ? <FaEye /> : <FaEyeSlash />}
                        </span>
                    </div>
                    <label className="block px-2 pt-2">Set Password</label>
                    <div className="mt-3 relative flex items-center w-full">
                        <input
                            type={showNewPassword ? "text" : "password"}
                            placeholder="Create password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full p-3 outline-none text-base"
                        />
                        <span
                            className="absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer text-2xl text-primary select-none"
                            onClick={() => dispatch(toggleShowNewPassword())}
                        >
                            {showNewPassword ? <FaEye /> : <FaEyeSlash />}
                        </span>
                    </div>

                    <label className="block px-2 pt-2">Confirm Password</label>
                    <div className="mt-3 relative flex items-center w-full">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Create password"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full p-3 outline-none text-base"
                        />
                        <span
                            className="absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer text-2xl text-primary select-none"
                            onClick={() => dispatch(toggleShowConfirmPassword())}
                        >
                            {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                        </span>
                    </div>
                    <button
                        type="submit"
                        // onClick={handleSubmit}
                        className="w-full p-3 bg-primary text-center block text-white my-5"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
}
export default ChangePassword;
