import { Backdrop, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaFacebookF,
  FaGoogle,
  FaInstagram,
  FaPinterest,
  FaTiktok,
  FaTumblr,
  FaYelp,
  FaYoutube,
} from "react-icons/fa";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import nextDoorIcon from "../assets/images/nextdoor_icon.png";
import {
  useFetchSocialMediasQuery,
  useUpdateSocialMediasMutation,
} from "../Redux/api/apiSlice";

const SocialMediasForm = () => {
  const { state } = useLocation();
  const {
    data: socialMediasData,
    isLoading,
    error,
  } = useFetchSocialMediasQuery();
  const [updateSocialMedias, { isLoading: isUpdating }] =
    useUpdateSocialMediasMutation();
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

    // Check if any of the fields have changed
    const hasChanges = Object.entries(socialLinks)?.some(
      ([key, value]) => value !== socialMediasData?.[key]
    );
    if (!hasChanges) {
      toast.error("Nothing to update!");
      navigate(-1);
      return;
    }
    try {
      const result = await updateSocialMedias(socialLinks).unwrap();
      console.log(result);

      if (state === "newUser") {
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
        navigate("/");
      } else {
        toast.success("Saved Successfully!");
        navigate(-1);
      }
    } catch (error) {
      console.error("Error saving social media links:", error);
      toast.error("Unable to save!");
    }
  };

  const handleSkip = () => {
    if (state === "newUser") {
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
      navigate("/");
    } else {
      navigate(-1);
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
            type="url"
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
            type="url"
            name="instagram"
            value={socialLinks.instagram}
            onChange={handleChange}
            placeholder="https://"
            className="block w-full border border-solid border-[#e7e7e7] bg-white p-2 px-3 outline-none sm:p-3 sm:px-4"
          />
        </div>

        {/* Twitter */}
        <label className="block px-2 pt-2">Twitter</label>
        <div className="mt-1 flex">
          <div className="h-[50px] w-[50px] flex-shrink-0 border border-[#e7e7e7] bg-white p-2">
            <FaXTwitter className="h-full w-full flex-shrink-0 rounded-full border border-primary p-1.5 text-base" />
          </div>
          <input
            type="url"
            name="twitter"
            value={socialLinks.twitter}
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
            type="url"
            name="linkedin"
            value={socialLinks.linkedin}
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
            type="url"
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
            type="url"
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
            type="url"
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
            type="url"
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
            type="url"
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
            type="url"
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
            type="url"
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
            {state === "newUser" ? "Skip" : "Cancel"}
          </button>
        </div>
      </form>
      {(isLoading || isUpdating) && (
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </section>
  );
};

export default SocialMediasForm;
