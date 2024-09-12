import { Dialog, Slide } from "@mui/material";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ProfileInfo = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <div>
        <h1 className="bg-primary p-4 text-white">Client Information</h1>
        <div>
            <p>Full Name</p>
            <h4>Client Name</h4>
        </div>
        <div>
            <p>Username</p>
            <h4>Client userName</h4>
        </div>
        <div>
            <p>Industry Name</p>
            <h4>Client Name</h4>
        </div>
        <div>
            <p>Website</p>
            <h4>Client Name</h4>
        </div>
        <div>
            <p>Country</p>
            <h4>Bangladesh</h4>
        </div>
        <div>
            <p>City</p>
            <h4>Sylhet</h4>
        </div>
        </div>
      </Dialog>
    </>
  );
};

export default ProfileInfo;
