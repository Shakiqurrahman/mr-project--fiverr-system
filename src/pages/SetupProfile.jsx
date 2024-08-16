import { useState, useEffect, useCallback } from "react";
import Avatar from "../assets/images/camera.jpg";
import CountryCode from "../components/CountryCode";
import CountryList from "../components/CountryList";
import axios from "axios";
import toast from 'react-hot-toast';
import { configApi } from "../libs/configApi";
import Cookies from 'js-cookie';
import fetchData from 'data-fetch-ts';

function SetupProfile() {
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    image: "",
    fullName: "",
    userName: "",
    industryName: "",
    country: "",
    city: "",
    address: "",
    email: "",
    number: 0,
    language: "",
    description: "",
    countryCode: "",
  });


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdateProfileData = async (e) => {
    e.preventDefault();

    try {
      setUploading(true);
      // Example API endpoint
      const { data } = await axios.post(`${configApi.api}/update-user`, form);
      console.log(data);

      if (data.success === true) {
        toast.success('Add data successfull');
        setUploading(false);
        return;
      }
    } catch (error) {
      console.error("Error saving data to the database:", error);
      setUploading(false);
    }
  };

  const token = Cookies.get('authToken');

  // Parse local storage data once at the top
  const dataFromLocalStorage = JSON.parse(localStorage.getItem('profileData') || '{}');

  const fetchDataFromApi = useCallback(async () => {
    const endpoint = `${configApi.api}get-singel-user`;
    const res = await fetchData({ endpoint, token });
    try {

      if (res?.success) {
        const apiData = res.data;

        // Update the form with either API data or fallback to localStorage data
        setForm((prev) => ({
          ...prev,
          country: apiData?.country ?? dataFromLocalStorage?.country,
          email: apiData?.email ?? dataFromLocalStorage?.email,
          userName: apiData?.userName ?? dataFromLocalStorage?.userName,
          fullName: apiData?.fullName ?? dataFromLocalStorage?.fullName,
          address: apiData?.address ?? dataFromLocalStorage?.address,
          city: apiData?.city ?? dataFromLocalStorage?.city,
          image: apiData?.image ?? dataFromLocalStorage?.image,
          industryName: apiData?.industryName ?? dataFromLocalStorage?.industryName,
          number: apiData?.number ?? dataFromLocalStorage?.number,
          language: apiData?.language ?? dataFromLocalStorage?.language,
          description: apiData?.description ?? dataFromLocalStorage?.description,
        }));
      } else {
        toast.error("Profile not updated");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch profile data");
    }
  }, [token, dataFromLocalStorage]);

  // Fetch data when the component mounts or token changes
  useEffect(() => {
    if (token) {
      fetchDataFromApi();
    }
  }, []);



  const handleSkip = () => {
    try {
      // Save the form data to localStorage
      localStorage.setItem('profileData', JSON.stringify(form));
      toast.success('Data stored in local storage.');
    } catch (error) {
      console.error("Error saving data to local storage:", error);
    }
  };




  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      const apiKey = "7a4a20aea9e7d64e24c6e75b2972ff00";
      const uploadUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;

      try {
        setUploading(true);
        const response = await axios.post(uploadUrl, formData);
        const imageUrl = response.data.data.url;
        setForm((prevForm) => ({ ...prevForm, image: imageUrl }));
        localStorage.setItem('profileData', JSON.stringify(form));
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="max-width mt-10 sm:mt-20">
      <form onSubmit={handleUpdateProfileData} className="w-full max-w-[800px] mx-auto">
        <div className="text-center">
          <div className="h-[220px] w-[220px] flex items-center justify-center rounded-full mx-auto mb-10 bg-[#DCEEFA] overflow-hidden">
            <label htmlFor="image">
              {form.image ? (
                <img src={form.image} alt="Profile" className="object-contain cursor-pointer" />
              ) : (
                // <span className="text-gray-500">No image uploaded</span>
                <img src={Avatar} alt="Profile" className="object-contain cursor-pointer" />
              )}
            </label>
          </div>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/png, image/jpeg"
            hidden
            onChange={handleFileChange}
          />
          <label
            htmlFor="image"
            className="bg-primary py-3 px-5 text-white cursor-pointer"
          >
            {uploading ? "Uploading..." : "Upload Profile Picture"}
          </label>
        </div>

        <div className="bg-[#DCEEFA] mt-10">
          <h1 className="bg-primary text-white p-3">Billing Information</h1>
          <div className="p-3">
            <label className="block px-2 pt-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              disabled
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
              disabled
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
              disabled
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
                <CountryCode
                  countryCode={form.countryCode}
                  handleChange={handleChange}
                />
              </div>
              <input
                type="number"
                name="number"
                value={form.number}
                onChange={handleChange}
                className="bg-white block w-full p-2 px-3 sm:px-4 border border-solid border-[#e7e7e7] outline-none border-l-0"
              />
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
              name="description"
              value={form.description}
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
                onClick={handleSkip}
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
