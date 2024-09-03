import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaFacebookF,
  FaGoogle,
  FaInstagram,
  FaPinterest,
  FaTiktok,
  FaTumblr,
  FaTwitter,
  FaYelp,
  FaYoutube,
} from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import nextDoorIcon from "../assets/images/nextdoor_icon.png";
import {
  useFetchSocialMediasQuery,
  useUpdateSocialMediasMutation,
} from "../Redux/api/apiSlice";

const SocialMediasForm = () => {
  const {
    data: socialMediasData,
    isLoading,
    error,
  } = useFetchSocialMediasQuery();
  const [updateSocialMedias] = useUpdateSocialMediasMutation();
  const navigate = useNavigate();

  // State to manage form inputs
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    pinterest: "",
    google: "",
    tumblr: "",
    youtube: "",
    yelp: "",
    tiktok: "",
    nextdoor: "",
  });

  // Use useEffect to update the state when socialMediasData is fetched
  useEffect(() => {
    if (socialMediasData) {
      setSocialLinks((prevState) => ({
        ...prevState,
        ...socialMediasData,
      }));
    }
  }, [socialMediasData]);

  // Handler for input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await updateSocialMedias(socialLinks).unwrap();
      console.log(result);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Thank you very much!",
        html: "<p>for joining us. Your registration is successful.</p>",
        showConfirmButton: true,
        timer: 1500,
        customClass: {
          confirmButton: "successfull-button",
        },
    });
    navigate('/');

      console.log("Social media links saved successfully!");
    } catch (error) {
      console.error("Error saving social media links:", error);
      toast.error("Unable to save!");
    }
  };

  const handleSkip = () => {
    if (!from_profile) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Thank you very much!",
        html: "<p>for joining us. Your registration is successful.</p>",
        showConfirmButton: true,
        timer: 1200,
        customClass: {
          confirmButton: "successfull-button",
        },
      });
    } else {
      navigate("/");
    }
  };

  return (
    <section className="mx-auto my-20 max-w-[800px]">
      <h1 className="bg-primary p-4 text-white">Social Media Links</h1>
      <form className="bg-[#edf7fd] p-4" onSubmit={handleSubmit}>
        {/* Facebook */}
        <label className="block px-2 pt-2">Facebook</label>
        <div className="mt-1 flex">
          <div className="h-[50px] w-[50px] flex-shrink-0 border border-[#e7e7e7] bg-white p-2">
            <FaFacebookF className="h-full w-full flex-shrink-0 rounded-full border border-primary p-1.5 text-base" />
          </div>
          <input
            type="text"
            name="facebook"
            value={socialLinks.facebook}
            onChange={handleChange}
            placeholder="https://"
            className="block w-full border border-solid border-[#e7e7e7] bg-white p-2 px-3 outline-none sm:p-3 sm:px-4"
          />
        </div>

        {/* Instagram */}
        <label className="block px-2 pt-2">Instagram</label>
        <div className="mt-1 flex">
          <div className="h-[50px] w-[50px] flex-shrink-0 border border-[#e7e7e7] bg-white p-2">
            <FaInstagram className="h-full w-full flex-shrink-0 rounded-full border border-primary p-1.5 text-base" />
          </div>
          <input
            type="text"
            name="instagram"
            value={socialLinks.instagram}
            onChange={handleChange}
            placeholder="https://"
            className="block w-full border border-solid border-[#e7e7e7] bg-white p-2 px-3 outline-none sm:p-3 sm:px-4"
          />
        </div>

        {/* LinkedIn */}
        <label className="block px-2 pt-2">LinkedIn</label>
        <div className="mt-1 flex">
          <div className="h-[50px] w-[50px] flex-shrink-0 border border-[#e7e7e7] bg-white p-2">
            <FaLinkedinIn className="h-full w-full flex-shrink-0 rounded-full border border-primary p-1.5 text-base" />
          </div>
          <input
            type="text"
            name="linkedin"
            value={socialLinks.linkedin}
            onChange={handleChange}
            placeholder="https://"
            className="block w-full border border-solid border-[#e7e7e7] bg-white p-2 px-3 outline-none sm:p-3 sm:px-4"
          />
        </div>

        {/* Twitter */}
        <label className="block px-2 pt-2">Twitter</label>
        <div className="mt-1 flex">
          <div className="h-[50px] w-[50px] flex-shrink-0 border border-[#e7e7e7] bg-white p-2">
            <FaTwitter className="h-full w-full flex-shrink-0 rounded-full border border-primary p-1.5 text-base" />
          </div>
          <input
            type="text"
            name="twitter"
            value={socialLinks.twitter}
            onChange={handleChange}
            placeholder="https://"
            className="block w-full border border-solid border-[#e7e7e7] bg-white p-2 px-3 outline-none sm:p-3 sm:px-4"
          />
        </div>

        {/* Pinterest */}
        <label className="block px-2 pt-2">Pinterest</label>
        <div className="mt-1 flex">
          <div className="h-[50px] w-[50px] flex-shrink-0 border border-[#e7e7e7] bg-white p-2">
            <FaPinterest className="h-full w-full flex-shrink-0 rounded-full border border-primary p-1.5 text-base" />
          </div>
          <input
            type="text"
            name="pinterest"
            value={socialLinks.pinterest}
            onChange={handleChange}
            placeholder="https://"
            className="block w-full border border-solid border-[#e7e7e7] bg-white p-2 px-3 outline-none sm:p-3 sm:px-4"
          />
        </div>

        {/* Google */}
        <label className="block px-2 pt-2">Google</label>
        <div className="mt-1 flex">
          <div className="h-[50px] w-[50px] flex-shrink-0 border border-[#e7e7e7] bg-white p-2">
            <FaGoogle className="h-full w-full flex-shrink-0 rounded-full border border-primary p-1.5 text-base" />
          </div>
          <input
            type="text"
            name="google"
            value={socialLinks.google}
            onChange={handleChange}
            placeholder="https://"
            className="block w-full border border-solid border-[#e7e7e7] bg-white p-2 px-3 outline-none sm:p-3 sm:px-4"
          />
        </div>

        {/* Tumblr */}
        <label className="block px-2 pt-2">Tumblr</label>
        <div className="mt-1 flex">
          <div className="h-[50px] w-[50px] flex-shrink-0 border border-[#e7e7e7] bg-white p-2">
            <FaTumblr className="h-full w-full flex-shrink-0 rounded-full border border-primary p-1.5 text-base" />
          </div>
          <input
            type="text"
            name="tumblr"
            value={socialLinks.tumblr}
            onChange={handleChange}
            placeholder="https://"
            className="block w-full border border-solid border-[#e7e7e7] bg-white p-2 px-3 outline-none sm:p-3 sm:px-4"
          />
        </div>

        {/* YouTube */}
        <label className="block px-2 pt-2">YouTube</label>
        <div className="mt-1 flex">
          <div className="h-[50px] w-[50px] flex-shrink-0 border border-[#e7e7e7] bg-white p-2">
            <FaYoutube className="h-full w-full flex-shrink-0 rounded-full border border-primary p-1.5 text-base" />
          </div>
          <input
            type="text"
            name="youtube"
            value={socialLinks.youtube}
            onChange={handleChange}
            placeholder="https://"
            className="block w-full border border-solid border-[#e7e7e7] bg-white p-2 px-3 outline-none sm:p-3 sm:px-4"
          />
        </div>

        {/* Yelp */}
        <label className="block px-2 pt-2">Yelp</label>
        <div className="mt-1 flex">
          <div className="h-[50px] w-[50px] flex-shrink-0 border border-[#e7e7e7] bg-white p-2">
            <FaYelp className="h-full w-full flex-shrink-0 rounded-full border border-primary p-1.5 text-base" />
          </div>
          <input
            type="text"
            name="yelp"
            value={socialLinks.yelp}
            onChange={handleChange}
            placeholder="https://"
            className="block w-full border border-solid border-[#e7e7e7] bg-white p-2 px-3 outline-none sm:p-3 sm:px-4"
          />
        </div>

        {/* TikTok */}
        <label className="block px-2 pt-2">TikTok</label>
        <div className="mt-1 flex">
          <div className="h-[50px] w-[50px] flex-shrink-0 border border-[#e7e7e7] bg-white p-2">
            <FaTiktok className="h-full w-full flex-shrink-0 rounded-full border border-primary p-1.5 text-base" />
          </div>
          <input
            type="text"
            name="tiktok"
            value={socialLinks.tiktok}
            onChange={handleChange}
            placeholder="https://"
            className="block w-full border border-solid border-[#e7e7e7] bg-white p-2 px-3 outline-none sm:p-3 sm:px-4"
          />
        </div>

        {/* Nextdoor */}
        <label className="block px-2 pt-2">Nextdoor</label>
        <div className="mt-1 flex">
          <div className="h-[50px] w-[50px] flex-shrink-0 border border-[#e7e7e7] bg-white p-2">
            <img
              src={nextDoorIcon}
              alt="Nextdoor"
              className="h-full w-full flex-shrink-0 rounded-full border border-primary p-1.5"
            />
          </div>
          <input
            type="text"
            name="nextdoor"
            value={socialLinks.nextdoor}
            onChange={handleChange}
            placeholder="https://"
            className="block w-full border border-solid border-[#e7e7e7] bg-white p-2 px-3 outline-none sm:p-3 sm:px-4"
          />
        </div>

        <div className="mt-4 flex gap-4">
          <button
            type="submit"
            className="flex-1 rounded-[30px] bg-primary px-4 py-2.5 text-white"
          >
            Save
          </button>
          <button
          onClick={handleSkip}
            type="button"
            className="flex-1 rounded-[30px] bg-[#7c7c7c] px-4 py-2.5 text-white"
          >
            Skip
          </button>
        </div>
      </form>
    </section>
  );
};

export default SocialMediasForm;
