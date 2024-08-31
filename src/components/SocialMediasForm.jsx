import React, { useEffect, useState } from "react";
import { FaFacebookF, FaGoogle, FaInstagram, FaPinterest, FaTiktok, FaTumblr, FaTwitter, FaYelp, FaYoutube } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import nextDoorIcon from '../assets/images/nextdoor_icon.png';
import axios from "axios";
import { configApi } from "../libs/configApi";

const SocialMediasForm = () => {
    // State to manage form inputs
    const email = 'sarkarsoumik215@gmail.com';
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
        nextdoor: ""
});

    // Fetch social media links on component mount
    useEffect(() => {
        const fetchSocialLinks = async () => {
            try {
                const api = `${configApi.api}social-media-link/${email}`;
                const { data } = await axios.get(api, { params: { email } });
                if (data.success) {
                    const { facebook,
                        instagram,
                        linkedin,
                        twitter,
                        pinterest,
                        google,
                        tumblr,
                        youtube,
                        yelp,
                        tiktok,
                        nextdoor, } = data.data;
                    setSocialLinks({
                        facebook,
                        instagram,
                        linkedin,
                        twitter,
                        pinterest,
                        google,
                        tumblr,
                        youtube,
                        yelp,
                        tiktok,
                        nextdoor
                    }); // Assuming the API returns the social links in `data.socialLinks`
                } else {
                    console.error('Failed to fetch social media links.');
                }
            } catch (error) {
                console.error('Error fetching social media links:', error);
            }
        };

        fetchSocialLinks();
    }, []);

    // Handler for input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSocialLinks(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const api = `${configApi.api}social-media-link`;

            // Create the request body from the state
            const requestBody = {
                facebook: socialLinks.facebook,
                instagram: socialLinks.instagram,
                linkedin: socialLinks.linkedin,
                twitter: socialLinks.twitter,
                pinterest: socialLinks.pinterest,
                google: socialLinks.google,
                tumblr: socialLinks.tumblr,
                youtube: socialLinks.youtube,
                yelp: socialLinks.yelp,
                tiktok: socialLinks.tiktok,
                nextdoor: socialLinks.nextdoor,
                email
            };

            const { data } = await axios.post(api, requestBody);
            console.log(data);

            if (data.success) {
                // Clear the state upon successful submission
                setSocialLinks({
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
                    nextdoor: ""
                });
                alert('Social media links saved successfully!');
            } else {
                alert('Failed to save social media links.');
            }
        } catch (error) {
            console.error('Error saving social media links:', error);
            alert('An error occurred while saving social media links.');
        }
    };

    return (
        <section className="max-w-[800px] mx-auto my-20">
            <h1 className="bg-primary text-white p-4">Social Media Links</h1>
            <form className="bg-[#edf7fd] p-4" onSubmit={handleSubmit}>
                {/* Facebook */}
                <label className="block px-2 pt-2">Facebook</label>
                <div className="flex mt-1">
                    <div className="h-[50px] w-[50px] flex-shrink-0 p-2 bg-white border border-[#e7e7e7]">
                        <FaFacebookF className="flex-shrink-0 text-base border border-primary rounded-full p-1.5 w-full h-full" />
                    </div>
                    <input
                        type="text"
                        name="facebook"
                        value={socialLinks.facebook}
                        onChange={handleChange}
                        placeholder="https://"
                        className="bg-white block w-full p-2 sm:p-3 px-3 sm:px-4 border border-solid border-[#e7e7e7] outline-none"
                    />
                </div>

                {/* Instagram */}
                <label className="block px-2 pt-2">Instagram</label>
                <div className="flex mt-1">
                    <div className="h-[50px] w-[50px] flex-shrink-0 p-2 bg-white border border-[#e7e7e7]">
                        <FaInstagram className="flex-shrink-0 text-base border border-primary rounded-full p-1.5 w-full h-full" />
                    </div>
                    <input
                        type="text"
                        name="instagram"
                        value={socialLinks.instagram}
                        onChange={handleChange}
                        placeholder="https://"
                        className="bg-white block w-full p-2 sm:p-3 px-3 sm:px-4 border border-solid border-[#e7e7e7] outline-none"
                    />
                </div>

                {/* LinkedIn */}
                <label className="block px-2 pt-2">LinkedIn</label>
                <div className="flex mt-1">
                    <div className="h-[50px] w-[50px] flex-shrink-0 p-2 bg-white border border-[#e7e7e7]">
                        <FaLinkedinIn className="flex-shrink-0 text-base border border-primary rounded-full p-1.5 w-full h-full" />
                    </div>
                    <input
                        type="text"
                        name="linkedin"
                        value={socialLinks.linkedin}
                        onChange={handleChange}
                        placeholder="https://"
                        className="bg-white block w-full p-2 sm:p-3 px-3 sm:px-4 border border-solid border-[#e7e7e7] outline-none"
                    />
                </div>

                {/* Twitter */}
                <label className="block px-2 pt-2">Twitter</label>
                <div className="flex mt-1">
                    <div className="h-[50px] w-[50px] flex-shrink-0 p-2 bg-white border border-[#e7e7e7]">
                        <FaTwitter className="flex-shrink-0 text-base border border-primary rounded-full p-1.5 w-full h-full" />
                    </div>
                    <input
                        type="text"
                        name="twitter"
                        value={socialLinks.twitter}
                        onChange={handleChange}
                        placeholder="https://"
                        className="bg-white block w-full p-2 sm:p-3 px-3 sm:px-4 border border-solid border-[#e7e7e7] outline-none"
                    />
                </div>

                {/* Pinterest */}
                <label className="block px-2 pt-2">Pinterest</label>
                <div className="flex mt-1">
                    <div className="h-[50px] w-[50px] flex-shrink-0 p-2 bg-white border border-[#e7e7e7]">
                        <FaPinterest className="flex-shrink-0 text-base border border-primary rounded-full p-1.5 w-full h-full" />
                    </div>
                    <input
                        type="text"
                        name="pinterest"
                        value={socialLinks.pinterest}
                        onChange={handleChange}
                        placeholder="https://"
                        className="bg-white block w-full p-2 sm:p-3 px-3 sm:px-4 border border-solid border-[#e7e7e7] outline-none"
                    />
                </div>

                {/* Google */}
                <label className="block px-2 pt-2">Google</label>
                <div className="flex mt-1">
                    <div className="h-[50px] w-[50px] flex-shrink-0 p-2 bg-white border border-[#e7e7e7]">
                        <FaGoogle className="flex-shrink-0 text-base border border-primary rounded-full p-1.5 w-full h-full" />
                    </div>
                    <input
                        type="text"
                        name="google"
                        value={socialLinks.google}
                        onChange={handleChange}
                        placeholder="https://"
                        className="bg-white block w-full p-2 sm:p-3 px-3 sm:px-4 border border-solid border-[#e7e7e7] outline-none"
                    />
                </div>

                {/* Tumblr */}
                <label className="block px-2 pt-2">Tumblr</label>
                <div className="flex mt-1">
                    <div className="h-[50px] w-[50px] flex-shrink-0 p-2 bg-white border border-[#e7e7e7]">
                        <FaTumblr className="flex-shrink-0 text-base border border-primary rounded-full p-1.5 w-full h-full" />
                    </div>
                    <input
                        type="text"
                        name="tumblr"
                        value={socialLinks.tumblr}
                        onChange={handleChange}
                        placeholder="https://"
                        className="bg-white block w-full p-2 sm:p-3 px-3 sm:px-4 border border-solid border-[#e7e7e7] outline-none"
                    />
                </div>

                {/* YouTube */}
                <label className="block px-2 pt-2">YouTube</label>
                <div className="flex mt-1">
                    <div className="h-[50px] w-[50px] flex-shrink-0 p-2 bg-white border border-[#e7e7e7]">
                        <FaYoutube className="flex-shrink-0 text-base border border-primary rounded-full p-1.5 w-full h-full" />
                    </div>
                    <input
                        type="text"
                        name="youtube"
                        value={socialLinks.youtube}
                        onChange={handleChange}
                        placeholder="https://"
                        className="bg-white block w-full p-2 sm:p-3 px-3 sm:px-4 border border-solid border-[#e7e7e7] outline-none"
                    />
                </div>

                {/* Yelp */}
                <label className="block px-2 pt-2">Yelp</label>
                <div className="flex mt-1">
                    <div className="h-[50px] w-[50px] flex-shrink-0 p-2 bg-white border border-[#e7e7e7]">
                        <FaYelp className="flex-shrink-0 text-base border border-primary rounded-full p-1.5 w-full h-full" />
                    </div>
                    <input
                        type="text"
                        name="yelp"
                        value={socialLinks.yelp}
                        onChange={handleChange}
                        placeholder="https://"
                        className="bg-white block w-full p-2 sm:p-3 px-3 sm:px-4 border border-solid border-[#e7e7e7] outline-none"
                    />
                </div>

                {/* TikTok */}
                <label className="block px-2 pt-2">TikTok</label>
                <div className="flex mt-1">
                    <div className="h-[50px] w-[50px] flex-shrink-0 p-2 bg-white border border-[#e7e7e7]">
                        <FaTiktok className="flex-shrink-0 text-base border border-primary rounded-full p-1.5 w-full h-full" />
                    </div>
                    <input
                        type="text"
                        name="tiktok"
                        value={socialLinks.tiktok}
                        onChange={handleChange}
                        placeholder="https://"
                        className="bg-white block w-full p-2 sm:p-3 px-3 sm:px-4 border border-solid border-[#e7e7e7] outline-none"
                    />
                </div>

                {/* Nextdoor */}
                <label className="block px-2 pt-2">Nextdoor</label>
                <div className="flex mt-1">
                    <div className="h-[50px] w-[50px] flex-shrink-0 p-2 bg-white border border-[#e7e7e7]">
                        <img src={nextDoorIcon} alt="Nextdoor" className="flex-shrink-0 border border-primary rounded-full p-1.5 w-full h-full" />
                    </div>
                    <input
                        type="text"
                        name="nextdoor"
                        value={socialLinks.nextdoor}
                        onChange={handleChange}
                        placeholder="https://"
                        className="bg-white block w-full p-2 sm:p-3 px-3 sm:px-4 border border-solid border-[#e7e7e7] outline-none"
                    />
                </div>

                <div className="flex gap-4 mt-4">
                    <button type="submit" className="flex-1 py-2.5 px-4 bg-primary text-white rounded-[30px]">
                        Save
                    </button>
                    <button type="button" className="flex-1 py-2.5 px-4 bg-[#7c7c7c] text-white rounded-[30px]">
                        Skip
                    </button>
                </div>
            </form>
        </section>
    );
};

export default SocialMediasForm;
