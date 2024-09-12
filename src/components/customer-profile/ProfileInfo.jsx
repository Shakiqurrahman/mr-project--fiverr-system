import { Dialog } from "@mui/material";
import React from "react";

const ProfileInfo = ({ handleProfileInfo, profileInfo, user }) => {
  const {
    fullName,
    userName,
    industryName,
    website,
    country,
    city,
    address,
    email,
    number,
    language,
  } = user || {};
  return (
    <>
      <Dialog
        open={profileInfo}
        keepMounted
        onClose={handleProfileInfo}
        aria-describedby="dialog-profile-info"
        className="profile-info"
      >
        <div className="w-full max-w-[600px]">
          <h1 className="bg-primary p-4 pl-6 text-xl font-semibold text-white sm:pl-8">
            Client Information
          </h1>
          <div className="space-y-4 p-6 text-sm sm:p-8">
            {fullName && (
              <div className="flex items-center gap-4">
                <p className="w-3/4 sm:w-[60%]">Full Name</p>
                <h4 className="w-full font-semibold">{fullName}</h4>
              </div>
            )}
            {userName && (
              <div className="flex items-center gap-4">
                <p className="w-3/4 sm:w-[60%]">Username</p>
                <h4 className="w-full font-semibold">{userName}</h4>
              </div>
            )}
            {industryName && (
              <div className="flex items-center gap-4">
                <p className="w-3/4 sm:w-[60%]">Industry Name</p>
                <h4 className="w-full font-semibold">{industryName}</h4>
              </div>
            )}
            {website && (
              <div className="flex items-center gap-4">
                <p className="w-3/4 sm:w-[60%]">Website</p>
                <h4 className="w-full font-semibold">{website}</h4>
              </div>
            )}
            {country && (
              <div className="flex items-center gap-4">
                <p className="w-3/4 sm:w-[60%]">Country</p>
                <h4 className="w-full font-semibold">{country}</h4>
              </div>
            )}
            {city && (
              <div className="flex items-center gap-4">
                <p className="w-3/4 sm:w-[60%]">City</p>
                <h4 className="w-full font-semibold">{city}</h4>
              </div>
            )}
            {address && (
              <div className="flex items-center gap-4">
                <p className="w-3/4 sm:w-[60%]">Address</p>
                <h4 className="w-full font-semibold">{address}</h4>
              </div>
            )}
            {email && (
              <div className="flex items-center gap-4">
                <p className="w-3/4 sm:w-[60%]">Email</p>
                <h4 className="w-full font-semibold">{email}</h4>
              </div>
            )}
            {number && (
              <div className="flex items-center gap-4">
                <p className="w-3/4 sm:w-[60%]">Phone Number</p>
                <h4 className="w-full font-semibold">{number}</h4>
              </div>
            )}
            {language && (
              <div className="flex items-center gap-4">
                <p className="w-3/4 sm:w-[60%]">Language</p>
                <h4 className="w-full font-semibold">{language}</h4>
              </div>
            )}
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ProfileInfo;
