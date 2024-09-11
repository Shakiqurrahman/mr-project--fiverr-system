import { Dialog, Slide } from "@mui/material";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ProfileInfo = ({ handleProfileInfo, profileInfo }) => {
  return (
    <>
      <Dialog
        open={profileInfo}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleProfileInfo}
        aria-describedby="dialog-profile-info"
      >
        <div className="w-full max-w-[800px]">
          <h1 className="bg-primary p-4 text-white">Client Information</h1>
          <div className="p-10">
            <div className="flex items-center gap-4">
              <p>Full Name</p>
              <h4>Client Name</h4>
            </div>
            <div className="flex items-center gap-4">
              <p>Username</p>
              <h4>Client userName</h4>
            </div>
            <div className="flex items-center gap-4">
              <p>Industry Name</p>
              <h4>Client Name</h4>
            </div>
            <div className="flex items-center gap-4">
              <p>Website</p>
              <h4>Client Name</h4>
            </div>
            <div className="flex items-center gap-4">
              <p>Country</p>
              <h4>Bangladesh</h4>
            </div>
            <div className="flex items-center gap-4">
              <p>City</p>
              <h4>Sylhet</h4>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ProfileInfo;
