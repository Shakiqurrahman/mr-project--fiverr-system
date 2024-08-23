import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import * as z from "zod";
import { configApi } from "../libs/configApi";
import {
  toggleShowConfirmPassword,
  toggleShowNewPassword,
  toggleShowPassword,
} from "../Redux/features/passwordVisibilitySlice";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// Zod schema for validation
const schema = z.object({
  currentPassword: z.string().min(6, "Please enter your current password"),
  password: z.string().min(8, "New password must be at least 8 characters long."),
  confirmPassword: z.string().min(1, "Please confirm your new password"),
}).superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      path: ["confirmPassword"],
      message: "Passwords do not match",
    });
  }
});

function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showPassword, showNewPassword, showConfirmPassword } = useSelector(
    (state) => state.passwordVisibility,
  );
  
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    const { currentPassword, password } = data;
    setApiError("");

    try {
      const response = await axios.put(`${configApi.api}set-new-pass`, {
        currentPassword,
        password,
      });

      if (response.status !== 200) {
        setApiError("Failed to change password");
      }

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Password changed successfully!",
        showConfirmButton: true,
        timer: 1200,
        customClass: {
          confirmButton: "successfull-button",
        },
      });
      navigate('/');
    } catch (error) {
      console.error("Error:", error);
      setApiError("Failed to change password. Please try again.");
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-[600px] sm:mt-20">
      <h1 className="bg-primary p-4 text-white">Change Password</h1>
      <div className="bg-[#DCEEFA]">
        <p className="px-6 pt-4 text-sm">
          8 characters or longer. Combine upper and lowercase letters, numbers,
          and special characters.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full p-5 sm:p-6">
          {/* Current Password Input */}
          <label className="block px-2 pt-2">Current Password</label>
          <div className="relative mt-3 flex w-full items-center">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter current password"
              {...register("currentPassword")}
              className="w-full p-3 text-base outline-none"
            />
            <span
              className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer select-none text-2xl text-primary"
              onClick={() => dispatch(toggleShowPassword())}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          {errors.currentPassword && (
            <p className="mt-2 text-sm text-red-500">
              {errors.currentPassword.message}
            </p>
          )}

          {/* New Password Input */}
          <label className="block px-2 pt-2">Set Password</label>
          <div className="relative mt-3 flex w-full items-center">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="Set new password"
              {...register("password")}
              className="w-full p-3 text-base outline-none"
            />
            <span
              className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer select-none text-2xl text-primary"
              onClick={() => dispatch(toggleShowNewPassword())}
            >
              {showNewPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          {errors.password && (
            <p className="mt-2 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}

          {/* Confirm Password Input */}
          <label className="block px-2 pt-2">Confirm Password</label>
          <div className="relative mt-3 flex w-full items-center">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              {...register("confirmPassword")}
              className="w-full p-3 text-base outline-none"
            />
            <span
              className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer select-none text-2xl text-primary"
              onClick={() => dispatch(toggleShowConfirmPassword())}
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          {errors.confirmPassword && (
            <p className="mt-2 text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="my-5 block w-full bg-primary p-3 text-center text-white"
          >
            Save Changes
          </button>

          {/* API Error Message */}
          {apiError && (
            <p className="mt-2 text-sm text-red-500 text-center">
              {apiError}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
