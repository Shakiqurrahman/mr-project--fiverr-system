import axios from "axios";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { configApi } from "../libs/configApi";

function ForgetPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await axios.get(`${configApi.api}forgot-pass/${email}`);
      setLoading(false);
      if (response?.data?.success) {
        navigate("/otp-verification", {
          state: { email: response?.data?.data.email },
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
    setLoading(false);
  };
  return (
    <div className="max-width mt-10 sm:mt-20">
      <form
        onSubmit={handleForgetPassword}
        className="mx-auto w-full max-w-[600px] bg-[#DCEEFA] p-5 text-center sm:p-10"
      >
        <h1 className="mb-5 text-2xl font-medium text-primary sm:text-3xl">
          Forget Password
        </h1>
        <p className="text-sm sm:text-base">
          Remember your password?{" "}
          <Link to={"/join"} className="text-primary">
            Login here
          </Link>
        </p>
        <label className="mt-5 block px-2 pt-2 text-start font-medium">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
          className={`mt-2 block w-full border border-solid border-[#e7e7e7] bg-white p-2 outline-none ${error && "isError"}`}
        />

        <p className="mt-2 hidden px-2 text-start text-xs text-red-600">
          {error}
        </p>

        <button
          type="submit"
          disabled={loading}
          className="mt-5 flex h-[45px] w-full items-center justify-center bg-primary text-lg font-medium text-white disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="animate-spin text-xl">
              <FaSpinner />
            </span>
          ) : (
            "Reset Password"
          )}
        </button>
      </form>
    </div>
  );
}

export default ForgetPassword;
