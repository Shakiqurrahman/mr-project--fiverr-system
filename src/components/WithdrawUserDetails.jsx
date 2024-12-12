import React, { useRef } from "react";
import useOutsideClick from "../hooks/useOutsideClick";

const WithdrawUserDetails = ({ info, close, reset }) => {
  const box = useRef(null);

  const outsiderClick = () => {
    close(false);
    reset(null);
  };

  useOutsideClick(box, () => outsiderClick());
  return (
    <div className="fixed left-0 top-0 z-[999999] flex h-screen w-full items-center justify-center overflow-y-auto bg-black/20 p-4 backdrop-blur">
      <div
        className="w-full max-w-[600px] rounded-lg bg-white p-8 shadow-btn-shadow"
        ref={box}
      >
        <h1 className="mb-5 text-xl font-semibold">Withdrawal Information</h1>
        <h2 className="font-semibold">Full Name</h2>
        <p className="mb-3">{info?.fullname}</p>
        <h2 className="font-semibold">Email</h2>
        <p className="mb-3">{info?.email}</p>
        <h2 className="font-semibold">Account Holder Name</h2>
        <p className="mb-3">{info?.accountHolderName}</p>
        <h2 className="font-semibold">Bank Name</h2>
        <p className="mb-3">{info?.bankName}</p>
        <h2 className="font-semibold">Account Number / IBAN</h2>
        <p className="mb-3">{info?.accountNumber}</p>
        <h2 className="font-semibold">SWIFT / BIC Code</h2>
        <p className="mb-3">{info?.SWIFTCode}</p>
        <h2 className="font-semibold">Bank Address</h2>
        <p className="mb-3">{info?.bankAddress}</p>
        <h2 className="font-semibold">Recipient Address</h2>
        <p className="mb-3">{info?.recipientAddress}</p>
      </div>
    </div>
  );
};

export default WithdrawUserDetails;
