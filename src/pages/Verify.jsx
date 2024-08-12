import { useState } from "react";
import { Link } from "react-router-dom";

function Verify() {
    const [otp, setOtp] = useState("");
    const handleChange = (e) => {
        setOtp(e.target.value)
    }
    return (
        <div className="max-width mt-10 sm:mt-20">
            <form className="w-full max-w-[600px] mx-auto p-5 sm:p-10 bg-[#DCEEFA] text-center">
                <h1 className="text-primary text-2xl sm:text-3xl mb-5 font-medium">Verify OTP</h1>
                <p className="text-sm sm:text-base">Your code was sent to you via email</p>
                <input
                    type="text"
                    name="otp"
                    value={otp}
                    onChange={handleChange}
                    className="bg-white block w-full p-2 border border-solid border-[#e7e7e7] mt-2 outline-none isError"
                />
                <p className="text-red-600 text-xs mt-2 px-2 hidden text-start">There was an error!</p>
                <button type="submit" className="w-full p-3 bg-primary text-center block text-white my-5">Verify</button>
                <p className="text-sm sm:text-base">Didn&apos;t recieve code? <Link className="text-primary">Request again</Link></p>
            </form>
        </div>
    )
}

export default Verify