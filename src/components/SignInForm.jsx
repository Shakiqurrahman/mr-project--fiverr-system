import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { z } from "zod";
import { configApi } from "../libs/configApi";
import { connectSocket } from "../libs/socketService";
import {
  clearPasswordVisibility,
  toggleShowPassword,
} from "../Redux/features/passwordVisibilitySlice";
import { setUser } from "../Redux/features/userSlice";

// Define the validation schema using Zod
const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  isRemember: z.boolean(),
});

function SignInForm({ handleClick }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showPassword } = useSelector((state) => state.passwordVisibility);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // Use React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const api = `${configApi.api}sign-in`;
      const response = await axios.post(api, {
        email: data.email,
        password: data.password,
      });

      const userData = response?.data?.data;
      dispatch(setUser({ user: userData.user, token: userData.token }));
      connectSocket(`${configApi.socket}`, userData.token);
      setLoading(false);
      setError("");
      dispatch(clearPasswordVisibility());

      if (!response.data.success) {
        setError("User not found");
        reset();
        return;
      }

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Signed In successfully!",
        showConfirmButton: true,
        timer: 1200,
        customClass: {
          confirmButton: "successfull-button",
        },
      });
      const token = userData.token; // from response data
      const expiresInDays = data.isRemember ? 30 : 10;
      Cookies.set("authToken", JSON.stringify(token), {
        expires: expiresInDays,
      });
      reset();
      navigate(from, { replace: true });
    } catch (error) {
      setLoading(false);
      setError("Sign in failed. Please check your credentials.");
      reset();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="block px-2 pt-2">Email</label>
        <input
          type="email"
          {...register("email")}
          className={`${
            errors.email ? "border-red-500" : "border-[#e7e7e7]"
          } mt-3 block w-full border border-solid bg-white p-2 outline-none`}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}

        <label className="mt-4 block px-2 pt-2">Password</label>
        <div className="relative">
          <button
            type="button"
            className="absolute right-[20px] top-1/2 z-10 -translate-y-1/2 text-lg text-primary sm:text-2xl"
            onClick={() => dispatch(toggleShowPassword())}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className={`${
              errors.password ? "border-red-500" : "border-[#e7e7e7]"
            } z-0 mt-3 block w-full border border-solid bg-white p-2 outline-none`}
          />
        </div>
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}

        <div className="mt-3 flex justify-between">
          <label className="select-none">
            <input type="checkbox" {...register("isRemember")} /> Remember me
          </label>
          <Link className="text-primary">Forgot password?</Link>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="my-4 flex h-[45px] w-full items-center justify-center bg-primary text-lg font-medium text-white disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="animate-spin text-xl">
              <FaSpinner />
            </span>
          ) : (
            "Sign In"
          )}
        </button>
        {error && <p className="text-center text-sm text-red-500">{error}</p>}
      </form>
      <p className="py-3 text-center text-sm">
        Don&apos;t have an Account?{" "}
        <button className="text-primary" value="Sign Up" onClick={handleClick}>
          Sign Up
        </button>
      </p>
    </>
  );
}

export default SignInForm;
