import { useState } from "react";
import Avatar from "../assets/images/camera.jpg";
import CountryCode from "../components/CountryCode";
import CountryList from "../components/CountryList";

function SetupProfile() {
  const [form, setForm] = useState({
    profilePic: "",
    fullName: "",
    userName: "",
    industryName: "",
    country: "",
    city: "",
    address: "",
    email: "",
    phone: "",
    language: "",
    desc: "",
    countryCode: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div className="max-width mt-10 sm:mt-20">
      <form className="w-full max-w-[800px] mx-auto">
        <div className="text-center">
          <div className="h-[220px] w-[220px] flex items-center justify-center rounded-full  mx-auto mb-10 bg-[#DCEEFA] overflow-hidden">
            <label htmlFor="profilePic">
              <img
                src={Avatar}
                alt=""
                className="object-contain cursor-pointer"
              />
            </label>
          </div>
          <input
            type="file"
            name="profilePic"
            id="profilePic"
            accept="image/png, image/jpeg"
            hidden
          />
          <label
            htmlFor="profilePic"
            className="bg-primary py-3 px-5 text-white cursor-pointer"
          >
            Upload Profile Picture
          </label>
        </div>
        <div className="bg-[#DCEEFA] mt-10">
          <h1 className="bg-primary text-white p-3">Billing Information</h1>
          <div className="p-3">
            <label className="block px-2 pt-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="bg-white block w-full p-2 border border-solid border-[#e7e7e7] mt-3 outline-none"
            />
            <p className="text-red-600 text-xs mt-2 px-2 hidden">
              There was an error!
            </p>
            <label className="block px-2 pt-2">Username</label>
            <input
              type="text"
              name="userName"
              value={form.userName}
              onChange={handleChange}
              className="bg-white block w-full p-2 border border-solid border-[#e7e7e7] mt-3 outline-none"
            />
            <p className="text-red-600 text-xs mt-2 px-2 hidden">
              There was an error!
            </p>
            <label className="block px-2 pt-2">Industry Name</label>
            <input
              type="text"
              name="industryName"
              value={form.industryName}
              onChange={handleChange}
              className="bg-white block w-full p-2 border border-solid border-[#e7e7e7] mt-3 outline-none"
            />
            <p className="text-red-600 text-xs mt-2 px-2 hidden">
              There was an error!
            </p>
            <div className="flex gap-3">
              <div className="w-1/2">
                <CountryList
                  country={form.country}
                  handleChange={handleChange}
                />
              </div>
              <div className="w-1/2">
                <label className="block px-2 pt-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="bg-white block w-full p-2 border border-solid border-[#e7e7e7] mt-3 outline-none"
                />
                <p className="text-red-600 text-xs mt-2 px-2 hidden">
                  There was an error!
                </p>
              </div>
            </div>
            <label className="block px-2 pt-2">Address</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="bg-white block w-full p-2 border border-solid border-[#e7e7e7] mt-3 outline-none"
            />
            <p className="text-red-600 text-xs mt-2 px-2 hidden">
              There was an error!
            </p>
            <label className="block px-2 pt-2">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="bg-white block w-full p-2 border border-solid border-[#e7e7e7] mt-3 outline-none"
            />
            <p className="text-red-600 text-xs mt-2 px-2 hidden">
              There was an error!
            </p>
            <label className="block px-2 pt-2">Phone Number</label>
            <div className="flex mt-1">
              <div className="flex-shrink-0 flex items-center p-1 sm:p-2 bg-white border border-[#e7e7e7] select-none border-r-0">
                {/* +880 */}
                <CountryCode
                  countryCode={form.countryCode}
                  handleChange={handleChange}
                />
              </div>
              <input
                type="number"
                name="facebook"
                className="bg-white block w-full p-2 px-3 sm:px-4 border border-solid border-[#e7e7e7] outline-none border-l-0"
              />
              <p className="text-red-600 text-xs mt-2 px-2 hidden">
                There was an error!
              </p>
            </div>
            <label className="block px-2 pt-2">Language</label>
            <input
              type="text"
              name="language"
              value={form.language}
              placeholder="Example: English, Spanish"
              onChange={handleChange}
              className="bg-white block w-full p-2 border border-solid border-[#e7e7e7] mt-3 outline-none"
            />
            <p className="text-red-600 text-xs mt-2 px-2 hidden">
              There was an error!
            </p>
          </div>
        </div>
        <div className="bg-[#DCEEFA] mt-5">
          <h1 className="bg-primary text-white p-3">Description</h1>
          <div className="px-3 py-5">
            <textarea
              name="desc"
              value={form.desc}
              onChange={handleChange}
              className="bg-white block w-full p-2 border border-solid border-[#e7e7e7] mt-3 outline-none h-[200px] resize-y"
              placeholder="Write something about yourself and your industry"
            ></textarea>
            <div className="flex gap-3 mt-5">
              <button
                type="submit"
                className="flex-grow p-3 text-center text-white bg-primary rounded-3xl"
              >
                Save
              </button>
              <button
                type="button"
                className="flex-grow p-3 text-center text-white bg-gray-500 rounded-3xl"
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SetupProfile;
