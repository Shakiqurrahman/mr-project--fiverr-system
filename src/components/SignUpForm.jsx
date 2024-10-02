import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { configApi } from "../libs/configApi";
import { connectSocket } from "../libs/socketService";
import {
  clearPasswordVisibility,
  toggleShowConfirmPassword,
  toggleShowNewPassword,
} from "../Redux/features/passwordVisibilitySlice";
import { setUser } from "../Redux/features/userSlice";
import CountryList from "./CountryList";

// Define the validation schema using Zod
const signUpSchema = z
  .object({
    country: z.string(),
    name: z.string().min(1, "Full Name is required"),
    username: z
      .string()
      .min(1, "Username is required")
      .regex(/^[\w]+$/, "Username should only contain letters, numbers"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(1, "Passwords do not match"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

function SignUpForm({ handleClick }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showNewPassword, showConfirmPassword } = useSelector(
    (state) => state.passwordVisibility,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Use React Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      country: "",
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const api = `${configApi.api}sign-up`;

      const response = await axios.post(api, {
        userName: data.username,
        fullName: data.name,
        email: data.email,
        country: data.country,
        password: data.password,
      });

      if (response.data.success) {
        const token = response.data.data;
        const user = {
          userName: data.username,
          name: data.name,
          email: data.email,
          country: data.country,
        };
        dispatch(setUser({ user, token }));
        connectSocket(`${configApi.socket}`, token);
        Cookies.set("authToken", JSON.stringify(token), { expires: 10 });
        // toast.success("Signed Up successfully");
        reset();
        dispatch(clearPasswordVisibility());
        navigate("/setup-profile");
      } else {
        setError("User was not created");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.status === 409) {
        setError(error?.response?.data?.message);
      } else if (error.code === "ERR_NETWORK") {
        setError("Network error occurred! Please try again!");
      } else {
        setError("Something went wrong!");
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <CountryList country={field.value} handleChange={field.onChange} />
          )}
        />
        <label className="block px-2 pt-2">Full Name</label>
        <input
          type="text"
          {...control.register("name")}
          className={`${
            errors.name ? "border-red-500" : "border-[#e7e7e7]"
          } mt-3 block w-full border border-solid bg-white p-2 outline-none`}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}

        <label className="block px-2 pt-2">Username</label>
        <input
          type="text"
          {...control.register("username")}
          className={`${
            errors.username ? "border-red-500" : "border-[#e7e7e7]"
          } mt-3 block w-full border border-solid bg-white p-2 outline-none`}
        />
        {errors.username && (
          <p className="text-sm text-red-500">{errors.username.message}</p>
        )}

        <label className="block px-2 pt-2">Email</label>
        <input
          type="email"
          {...control.register("email")}
          className={`${
            errors.email ? "border-red-500" : "border-[#e7e7e7]"
          } mt-3 block w-full border border-solid bg-white p-2 outline-none`}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}

        <label className="block px-2 pt-2">Set Password</label>
        <div className="relative">
          <button
            type="button"
            className="absolute right-[20px] top-1/2 z-10 -translate-y-1/2 text-lg text-primary sm:text-2xl"
            onClick={() => dispatch(toggleShowNewPassword())}
          >
            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          <input
            type={showNewPassword ? "text" : "password"}
            {...control.register("password")}
            className={`${
              errors.password ? "border-red-500" : "border-[#e7e7e7]"
            } z-0 mt-3 block w-full border border-solid bg-white p-2 outline-none`}
          />
        </div>
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}

        <label className="block px-2 pt-2">Confirm Password</label>
        <div className="relative">
          <button
            type="button"
            className="absolute right-[20px] top-1/2 z-10 -translate-y-1/2 text-lg text-primary sm:text-2xl"
            onClick={() => dispatch(toggleShowConfirmPassword())}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          <input
            type={showConfirmPassword ? "text" : "password"}
            {...control.register("confirmPassword")}
            className={`${
              errors.confirmPassword ? "border-red-500" : "border-[#e7e7e7]"
            } z-0 mt-3 block w-full border border-solid bg-white p-2 outline-none`}
          />
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}

        <button
          type="submit"
          className={`my-4 flex h-[45px] w-full items-center justify-center bg-primary py-2 text-lg font-medium text-white disabled:cursor-not-allowed`}
          disabled={loading}
        >
          {loading ? (
            <span className="animate-spin text-xl">
              <FaSpinner />
            </span>
          ) : (
            "Sign Up"
          )}
        </button>

        {error && <p className="text-center text-sm text-red-500">{error}</p>}
      </form>
      <p className="py-3 text-center text-sm">
        Already have an Account?{" "}
        <button className="text-primary" value="Sign In" onClick={handleClick}>
          Sign In
        </button>
      </p>
    </>
  );
}

export default SignUpForm;
