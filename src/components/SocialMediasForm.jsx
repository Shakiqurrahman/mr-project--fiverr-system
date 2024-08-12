import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";

const SocialMediasForm = () => {
    return (
        <section className="max-w-[800px] mx-auto">
            <h1 className="bg-primary text-white p-4">Social Media Links</h1>
            <form className="bg-[#edf7fd] p-4">
                <label className="block px-2 pt-2">Facebook</label>
                <div className="flex mt-1">
                    <div className="h-[50px] w-[50px] flex-shrink-0  p-2 bg-white border border-[#e7e7e7]">
                        <FaFacebookF className="flex-shrink-0 text-base  border border-primary rounded-full p-1.5 w-full h-full" />
                    </div>
                    <input
                        type="text"
                        name="facebook"
                        placeholder="https://"
                        className="bg-white block w-full p-2 sm:p-3 px-3 sm:px-4 border border-solid border-[#e7e7e7] outline-none"
                    />
                </div>
                <label className="block px-2 pt-2">Instagram</label>
                <div className="flex mt-1">
                    <div className="h-[50px] w-[50px] flex-shrink-0  p-2 bg-white border border-[#e7e7e7]">
                        <FaInstagram className="flex-shrink-0 text-base  border border-primary rounded-full p-1.5 w-full h-full" />
                    </div>
                    <input
                        type="text"
                        name="facebook"
                        placeholder="https://"
                        className="bg-white block w-full p-2 sm:p-3 px-3 sm:px-4 border border-solid border-[#e7e7e7] outline-none"
                    />
                </div>
                <label className="block px-2 pt-2">Linkedin</label>
                <div className="flex mt-1">
                    <div className="h-[50px] w-[50px] flex-shrink-0  p-2 bg-white border border-[#e7e7e7]">
                        <FaLinkedinIn className="flex-shrink-0 text-base  border border-primary rounded-full p-1.5 w-full h-full" />
                    </div>
                    <input
                        type="text"
                        name="facebook"
                        placeholder="https://"
                        className="bg-white block w-full p-2 sm:p-3 px-3 sm:px-4 border border-solid border-[#e7e7e7] outline-none"
                    />
                </div>
                <label className="block px-2 pt-2">Twitter</label>
                <div className="flex mt-1">
                    <div className="h-[50px] w-[50px] flex-shrink-0  p-2 bg-white border border-[#e7e7e7]">
                        <FaTwitter className="flex-shrink-0 text-base  border border-primary rounded-full p-1.5 w-full h-full" />
                    </div>
                    <input
                        type="text"
                        name="facebook"
                        placeholder="https://"
                        className="bg-white block w-full p-2 sm:p-3 px-3 sm:px-4 border border-solid border-[#e7e7e7] outline-none"
                    />
                </div>
                <div className="flex gap-4 mt-4">
                    <button className="flex-1 py-2.5 px-4 bg-primary text-white rounded-[30px]">
                        Save
                    </button>
                    <button className="flex-1 py-2.5 px-4 bg-[#7c7c7c] text-white rounded-[30px]">
                        Skip
                    </button>
                </div>
            </form>
        </section>
    );
};

export default SocialMediasForm;
