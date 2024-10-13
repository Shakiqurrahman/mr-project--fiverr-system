import { useState } from "react";

function UpdatePassword() {
    const [form, setForm] = useState({
        password: "",
        confirmPassword: ""
    });
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div className="max-width mt-10 sm:mt-20">
            <form onSubmit={handleSubmit} className="w-full max-w-[600px] mx-auto p-5 sm:p-10 bg-[#DCEEFA] text-center">
                <h1 className="text-primary text-2xl sm:text-3xl mb-5 font-medium">Change Your Password</h1>
                <label className="block px-2 pt-2 text-start mt-5">New Password</label>
                <input
                    type="text"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="bg-white block w-full p-2 border border-solid border-[#e7e7e7] mt-2 outline-none"
                />
                <p className="text-red-600 text-xs mt-2 px-2 hidden text-start">There was an error!</p>
                <label className="block px-2 pt-2 text-start">Confirm Password</label>
                <input
                    type="text"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="bg-white block w-full p-2 border border-solid border-[#e7e7e7] mt-2 outline-none"
                />
                <p className="text-red-600 text-xs mt-2 px-2 hidden text-start">There was an error!</p>
                <button type="submit" className="w-full p-3 bg-primary text-center block text-white my-5">Change Password</button>
            </form>
        </div>
    )
}

export default UpdatePassword;