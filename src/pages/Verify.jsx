import axios from "axios";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { configApi } from "../libs/configApi";

function Verify() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (state.email) {
      try {
        const response = await axios.get(
          `${configApi.api}verify-otp/${state?.email}?code=${otp}`,
        );
        setLoading(false);
        if (response?.data?.success) {
          navigate("/update-password");
        }
      } catch (error) {
        setError(
          error.response
            ? error?.response?.data?.message
            : "Something went wrong!",
        );
        setLoading(false);
      }
    }
    setLoading(false);
  };
  return (
    <div className="max-width mt-10 sm:mt-20">
      <form
        onSubmit={handleVerifyOtp}
        className="mx-auto w-full max-w-[600px] bg-[#DCEEFA] p-5 text-center sm:p-10"
      >
        <h1 className="mb-5 text-2xl font-medium text-primary sm:text-3xl">
          Verify OTP
        </h1>
        <p className="text-sm sm:text-base">
          Your code was sent to you via email
        </p>
        <input
          type="number"
          name="otp"
          value={otp}
          onChange={handleChange}
          required
          className={`mt-2 block w-full border border-solid border-[#e7e7e7] bg-white p-2 outline-none ${error && "isError"}`}
        />
        <p className="mt-2 hidden px-2 text-start text-xs text-red-600">
          {error}
        </p>
        <button
          type="submit"
          className="my-5 flex h-[45px] w-full items-center justify-center bg-primary text-lg font-medium text-white disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="animate-spin text-xl">
              <FaSpinner />
            </span>
          ) : (
            "Verify"
          )}
        </button>
        <p className="text-sm sm:text-base">
          Didn&apos;t recieve code?{" "}
          <Link className="text-primary">Request again</Link>
        </p>
      </form>
    </div>
  );
}

export default Verify;
