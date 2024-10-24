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
  const [loadingRequest, setLoadingRequest] = useState(false);

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
        console.log(response);
        setLoading(false);
        if (response?.data?.success) {
          navigate("/update-password", {
            state: { data: { ...response?.data?.data, email: state?.email } },
          });
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

  const requestAgainHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoadingRequest(true);
    try {
      const response = await axios.get(
        `${configApi.api}forgot-pass/${state?.email}`,
      );
      console.log(response);

      setLoadingRequest(false);
    } catch (error) {
      setError(
        error.response
          ? error?.response?.data?.message
          : "Something went wrong!",
      );
      setLoadingRequest(false);
    }
    setLoadingRequest(false);
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
        <p className="mb-6 text-sm sm:text-base">
          We’ve sent the code to your email. If it’s not in your inbox, please
          check your spam folder.
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
          disabled={loadingRequest || loading}
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
        {loadingRequest ? (
          <span>Please wait...</span>
        ) : (
          <button
            disabled={loading}
            onClick={requestAgainHandler}
            className="text-sm sm:text-base"
          >
            Didn&apos;t recieve code?{" "}
            <Link className="text-primary">Request again</Link>
          </button>
        )}
      </form>
    </div>
  );
}

export default Verify;
