import React from "react";

const SocialMediasForm = () => {
    return (
        <section className="max-w-[800px] mx-auto">
            <h1 className="bg-primary text-white p-4">Social Media Links</h1>
            <form className="bg-[#edf7fd] p-4">
                <label className="block px-2 pt-2">Facebook</label>
                <input
                    type="text"
                    name="facebook"
                    placeholder="https://"
                    className="bg-white block w-full p-2 px-3 sm:px-4 border border-solid border-[#e7e7e7] mt-1 outline-none"
                />
            </form>
        </section>
    );
};

export default SocialMediasForm;
