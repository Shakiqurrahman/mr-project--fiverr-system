import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { configApi } from "../libs/configApi";

function UpdatePassword() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const forgetPasswordToken = state?.data?.forgetPasswordToken;
  const email = state?.data?.email;
  console.log(forgetPasswordToken, "email", email);

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (state?.data) {
      const updatedData = { password: form.password, email };
      try {
        const response = await axios.put(
          `${configApi.api}set-forget-pass/${forgetPasswordToken}`,
          updatedData,
        );
        console.log(response);
        setLoading(false);
        if (response?.data?.success) {
          navigate("/");
          toast.success("Password updated successfully!");
        }
      } catch (error) {
        setLoading(false);
        setError(
          error.response
            ? error?.response?.data?.message
            : "Something went wrong!",
        );
        toast.error("Password updated failed!");
      }
    }
  };

  return (
    <div className="max-width mt-10 sm:mt-20">
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-[600px] bg-[#DCEEFA] p-5 text-center sm:p-10"
      >
        <h1 className="mb-5 text-2xl font-medium text-primary sm:text-3xl">
          Change Your Password
        </h1>

        <label className="mt-5 block px-2 pt-2 text-start">New Password</label>
        <input
          type="text"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="mt-2 block w-full border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
        />

        <label className="block px-2 pt-2 text-start">Confirm Password</label>
        <input
          type="text"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          className="mt-2 block w-full border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
        />

        <button
          type="submit"
          className="mt-5 block w-full bg-primary p-3 text-center text-white"
        >
          Change Password
        </button>
        {error && (
          <p className="mt-2 px-2 text-center text-xs text-red-600">{error}</p>
        )}
      </form>
    </div>
  );
}

export default UpdatePassword;
