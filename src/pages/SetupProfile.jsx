import axios from "axios";
import fetchData from "data-fetch-ts";
import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import Avatar from "../assets/images/camera.jpg";
import CountryCode from "../components/CountryCode";
import CountryList from "../components/CountryList";
import { configApi } from "../libs/configApi";
import { setUser } from "../Redux/features/userSlice";
import Swal from "sweetalert2";

function SetupProfile() {
  const dispatch = useDispatch();
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
    number: "",
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
      dispatch(setUser({ user: data.data }));

      if (data.success === true) {
        toast.success("Add data successfull");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Thank you very much!",
          html: "<p>for joining us. Your registration is successful.</p>",
          showConfirmButton: true,
          timer: 1500,
          customClass: {
              confirmButton: 'successfull-button'
          }
      });
        setUploading(false);
        // dispatch(setUser(data?.data))
        return;
      }
    } catch (error) {
      console.error("Error saving data to the database:", error);
      setUploading(false);
    }
  };

  const token = Cookies.get("authToken");

  // Parse local storage data once at the top
  const dataFromLocalStorage = JSON.parse(
    localStorage.getItem("profileData") || "{}",
  );

  const fetchDataFromApi = useCallback(async () => {
    const endpoint = `${configApi.api}get-singel-user`;
    const res = await fetchData({ endpoint, token });
    try {
      if (res?.success) {
        const apiData = res.data;
        dispatch(setUser({ user: apiData, token }));
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
          industryName:
            apiData?.industryName ?? dataFromLocalStorage?.industryName,
          number: apiData?.number ?? dataFromLocalStorage?.number,
          language: apiData?.language ?? dataFromLocalStorage?.language,
          description:
            apiData?.description ?? dataFromLocalStorage?.description,
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
      localStorage.setItem("profileData", JSON.stringify(form));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Thank you very much!",
        html: "<p>for joining us. Your registration is successful.</p>",
        showConfirmButton: true,
        timer: 1200,
        customClass: {
            confirmButton: 'successfull-button'
        }
    });
    
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
        localStorage.setItem("profileData", JSON.stringify(form));
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="max-width mt-10 sm:mt-20">
      <form
        onSubmit={handleUpdateProfileData}
        className="mx-auto w-full max-w-[800px]"
      >
        <div className="text-center">
          <div className="mx-auto mb-10 flex h-[220px] w-[220px] items-center justify-center overflow-hidden rounded-full bg-[#DCEEFA]">
            <label htmlFor="image">
              {form.image ? (
                <img
                  src={form.image}
                  alt="Profile"
                  className="cursor-pointer object-cover"
                />
              ) : (
                // <span className="text-gray-500">No image uploaded</span>
                <img
                  src={Avatar}
                  alt="Profile"
                  className="cursor-pointer object-contain"
                />
              )}
            </label>
          </div>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />
          <label
            htmlFor="image"
            className="cursor-pointer bg-primary px-5 py-3 text-white"
          >
            {uploading ? "Uploading..." : "Upload Profile Picture"}
          </label>
        </div>

        <div className="mt-10 bg-[#DCEEFA]">
          <h1 className="bg-primary p-3 text-white">Billing Information</h1>
          <div className="p-3">
            <label className="block px-2 pt-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="mt-3 block w-full border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
            />
            <p className="mt-2 hidden px-2 text-xs text-red-600">
              There was an error!
            </p>
            <label className="block px-2 pt-2">Username</label>
            <input
              type="text"
              name="userName"
              value={form.userName}
              disabled
              onChange={handleChange}
              className="mt-3 block w-full border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
            />
            <p className="mt-2 hidden px-2 text-xs text-red-600">
              There was an error!
            </p>
            <label className="block px-2 pt-2">Industry Name</label>
            <input
              type="text"
              name="industryName"
              value={form.industryName}
              onChange={handleChange}
              className="mt-3 block w-full border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
            />
            <p className="mt-2 hidden px-2 text-xs text-red-600">
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
                  className="mt-3 block w-full border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
                />
                <p className="mt-2 hidden px-2 text-xs text-red-600">
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
              className="mt-3 block w-full border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
            />
            <p className="mt-2 hidden px-2 text-xs text-red-600">
              There was an error!
            </p>
            <label className="block px-2 pt-2">Email</label>
            <input
              type="email"
              name="email"
              disabled
              value={form.email}
              onChange={handleChange}
              className="mt-3 block w-full border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
            />
            <p className="mt-2 hidden px-2 text-xs text-red-600">
              There was an error!
            </p>
            <label className="block px-2 pt-2">Phone Number</label>
            <div className="mt-1 flex">
              <div className="flex flex-shrink-0 select-none items-center border border-r-0 border-[#e7e7e7] bg-white p-1 sm:p-2">
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
                className="block w-full border border-l-0 border-solid border-[#e7e7e7] bg-white p-2 px-3 outline-none sm:px-4"
              />
            </div>
            <label className="block px-2 pt-2">Language</label>
            <input
              type="text"
              name="language"
              value={form.language}
              placeholder="Example: English, Spanish"
              onChange={handleChange}
              className="mt-3 block w-full border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
            />
            <p className="mt-2 hidden px-2 text-xs text-red-600">
              There was an error!
            </p>
          </div>
        </div>
        <div className="mt-5 bg-[#DCEEFA]">
          <h1 className="bg-primary p-3 text-white">Description</h1>
          <div className="px-3 py-5">
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="mt-3 block h-[200px] w-full resize-y border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
              placeholder="Write something about yourself and your industry"
            ></textarea>
            <div className="mt-5 flex gap-3">
              <button
                type="submit"
                className="flex-grow rounded-3xl bg-primary p-3 text-center text-white"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleSkip}
                className="flex-grow rounded-3xl bg-gray-500 p-3 text-center text-white"
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
