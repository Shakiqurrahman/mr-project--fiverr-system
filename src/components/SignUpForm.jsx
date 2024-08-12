import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import CountryList from "./CountryList";

function SignUpForm({ handleClick }) {
  const [form, setForm] = useState({
    country: "",
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState(true);

  const handleShow = () => {
    setShow(!show);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      form.country &&
      form.email &&
      form.name &&
      form.username &&
      form.password &&
      form.confirmPassword
    ) {
      if (form.password == form.confirmPassword) {
        console.log(form);
        setForm({
          country: "",
          name: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }
    }
  };
  return (
    <div>
      <CountryList country={form.country} handleChange={handleChange} />
      <label className="block px-2 pt-2">Full Name</label>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        className="bg-white block w-full p-2 border border-solid border-[#e7e7e7] mt-3 outline-none"
      />
      <p className="text-red-600 text-xs mt-2 px-2 hidden">There was an error!</p>
      <label className="block px-2 pt-2">Username</label>
      <input
        type="text"
        name="username"
        value={form.username}
        onChange={handleChange}
        className="bg-white block w-full p-2 border border-solid border-[#e7e7e7] mt-3 outline-none"
      />
      <p className="text-red-600 text-xs mt-2 px-2 hidden">There was an error!</p>
      <label className="block px-2 pt-2">Email</label>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        className="bg-white block w-full p-2 border border-solid border-[#e7e7e7] mt-3 outline-none"
      />
      <p className="text-red-600 text-xs mt-2 px-2 hidden">There was an error!</p>
      <label className="block px-2 pt-2">Set Password</label>
      <div className="relative">
        {show ? (
          <button
            className="absolute text-lg sm:text-2xl right-[20px] top-1/2 -translate-y-1/2 z-10 text-primary"
            onClick={handleShow}
          >
            <FaEye />
          </button>
        ) : (
          <button
            className="absolute text-lg sm:text-2xl right-[20px] top-1/2 -translate-y-1/2 z-10 text-primary"
            onClick={handleShow}
          >
            <FaEyeSlash />
          </button>
        )}
        <input
          type={show ? "password" : "text"}
          name="password"
          value={form.password}
          onChange={handleChange}
          className="bg-white block w-full p-2 border border-solid border-[#e7e7e7] mt-3 z-0 outline-none"
        />
        <p className="text-red-600 text-xs mt-2 px-2 hidden">There was an error!</p>
      </div>
      <label className="block px-2 pt-2">Confirm Password</label>
      <div className="relative">
        {show ? (
          <button
            className="absolute text-lg sm:text-2xl right-[20px] top-1/2 -translate-y-1/2 z-10 text-primary"
            onClick={handleShow}
          >
            <FaEye />
          </button>
        ) : (
          <button
            className="absolute text-lg sm:text-2xl right-[20px] top-1/2 -translate-y-1/2 z-10 text-primary"
            onClick={handleShow}
          >
            <FaEyeSlash />
          </button>
        )}
        <input
          type={show ? "password" : "text"}
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          className="bg-white block w-full p-2 border border-solid border-[#e7e7e7] mt-3 z-0 outline-none"
        />
        <p className="text-red-600 text-xs mt-2 px-2 hidden">There was an error!</p>
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="my-4 py-2 sm:py-3 block w-full bg-primary text-white font-medium text-lg"
      >
        Sign Up
      </button>
      <p className="py-3 text-center text-sm">
        Already have an Account?{" "}
        <button className="text-primary" value="Sign In" onClick={handleClick}>
          Sign In
        </button>
      </p>
    </div>
  );
}

export default SignUpForm;
