import { useState } from "react";
import { FaEye, FaEyeSlash, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { configApi } from "../libs/configApi";
import axios from 'axios';
import Cookies from 'js-cookie';
import toast from "react-hot-toast";
import { z } from "zod";

// Define the validation schema using Zod
const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  isRemember: z.boolean(),
});

function SignInForm({ handleClick }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);


  const [form, setForm] = useState({
    email: "",
    password: "",
    isRemember: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(prev => !prev);

  const handleInputChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data with Zod
    const validation = signInSchema.safeParse(form);

    if (!validation.success) {
      validation.error.errors.forEach(err => toast.error(err.message));
      return;
    }

    try {
      setLoading(true);
      const api = `${configApi.api}sign-in`;
      const data = await axios.post(api, {
        email: form.email,
        password: form.password,
      });

      const response = await data.data;
      setLoading(false);

      if (!response.success) {
        toast.error('User are not found');
        return;
      }
      else if (response?.success) {
        toast.success('User signed in successfully');
        const token = data.data.token;
        const expiresInDays = form.isRemember ? 30 : 10;
        Cookies.set('authToken', JSON.stringify({ token, data }), { expires: expiresInDays });
        setForm({ email: "", password: "", isRemember: false });
        navigate('/profile');
        return;
      }

      toast.error('Sign in failed. Please check your credentials.');

    } catch (error) {
      console.log('Error:', error.response.data.message);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <label className="block px-2 pt-2">Email</label>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleInputChange}
        className="bg-white block w-full p-2 border border-solid border-[#e7e7e7] mt-3 outline-none"
      />
      <label className="block px-2 pt-2 mt-4">Password</label>
      <div className="relative">
        <button
          className="absolute text-lg sm:text-2xl right-[20px] top-1/2 -translate-y-1/2 z-10 text-primary"
          onClick={handleShowPassword}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={form.password}
          onChange={handleInputChange}
          className="bg-white block w-full p-2 border border-solid border-[#e7e7e7] mt-3 z-0 outline-none"
        />
      </div>
      <div className="flex mt-3 justify-between">
        <label className="select-none">
          <input
            type="checkbox"
            name="isRemember"
            checked={form.isRemember}
            onChange={handleInputChange}
          />{" "}
          Remember me
        </label>
        <Link className="text-primary">Forgot password?</Link>
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="my-4 py-2 sm:py-3 block w-full bg-primary text-white font-medium text-lg"
      >
        {loading ? 'loading ....' : 'Sign In'}
      </button>
      <p className="py-3 text-center text-sm">
        Don&apos;t have an Account?{" "}
        <button className="text-primary" onClick={handleClick}>
          Sign Up
        </button>
      </p>
    </div>
  );
}

export default SignInForm;
