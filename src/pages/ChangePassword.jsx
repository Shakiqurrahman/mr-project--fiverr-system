import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function ChangePassword() {
    const [form, setForm] = useState({
        currentPassword: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [show, setShow] = useState(true);

    const handleShow = () => {
        setShow(!show);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { currentPassword, password, confirmPassword} = form;
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
                <div className="w-full p-5 sm:p-6">
                    <label className="block px-2 pt-2">Current Password</label>
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
                            name="currentPassword"
                            value={form.currentPassword}
                            onChange={handleChange}
                            className="bg-white block w-full p-2 border border-solid border-[#e7e7e7] mt-3 z-0 outline-none"
                        />
                        <p className="text-red-600 text-xs mt-2 px-2 hidden">
                            There was an error!
                        </p>
                    </div>
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
                        className="w-full p-3 bg-primary text-center block text-white my-5"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
export default ChangePassword;
