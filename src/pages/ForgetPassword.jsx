import { useState } from "react"
import { Link } from "react-router-dom"

function ForgetPassword() {
    const [email, setEmail] = useState("");
    const handleChange = (e) => {
        setEmail(e.target.value)
    }
    return (
        <div className="max-width mt-10 sm:mt-20">
            <form className="w-full max-w-[600px] mx-auto p-5 sm:p-10 bg-[#DCEEFA] text-center">
                <h1 className="text-primary text-2xl sm:text-3xl mb-5 font-medium">Forget Password</h1>
                <p className="text-sm sm:text-base">Remember your password? <Link to={"/join"} className="text-primary">Login here</Link></p>
                <label className="block px-2 pt-2 text-start font-medium mt-5">Email Address</label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    className="bg-white block w-full p-2 border border-solid border-[#e7e7e7] mt-2 outline-none isError"
                />
                <p className="text-red-600 text-xs mt-2 px-2 hidden text-start">There was an error!</p>
                <button type="submit" className="w-full p-3 bg-primary text-center block text-white mt-5">Reset Password</button>
            </form>
        </div>
    )
}

export default ForgetPassword