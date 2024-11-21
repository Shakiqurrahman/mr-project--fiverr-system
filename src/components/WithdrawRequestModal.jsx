import React, { useRef, useState } from "react";
import useOutsideClick from "../hooks/useOutsideClick";

const WithdrawRequestModal = ({ handleClose }) => {
  const modalRef = useRef(null);
  const [withDrawAmount, setWithDrawAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (withDrawAmount) {
      console.log("withdrawAmount", withDrawAmount);
    }
  };

  useOutsideClick(modalRef, () => handleClose(false));
  return (
    <div className="fixed left-0 top-0 z-[999] flex h-screen w-full items-center justify-center bg-black/20 p-4 backdrop-blur-sm">
      <form
        ref={modalRef}
        className="w-full max-w-[500px] rounded-md bg-white px-6 py-6"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-6 text-center text-xl font-semibold">
          Withdraw Request
        </h1>
        <input
          type="number"
          min={0}
          className={`mb-4 block w-full rounded border px-3 py-3 text-sm outline-none`}
          placeholder="Enter the Amount to Withdraw"
          name="withDrawAmount"
          value={withDrawAmount}
          onChange={(e) => setWithDrawAmount(e.target.value)}
        />

        <div className="mt-6 flex justify-end gap-4">
          <button
            type="button"
            onClick={handleClose}
            className="w-[110px] rounded bg-gray-500 px-5 py-2 text-lg font-semibold text-white outline-none duration-300 hover:bg-gray-500/80"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-[110px] rounded bg-primary px-5 py-2 text-lg font-semibold text-white outline-none duration-300 hover:bg-primary/80"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default WithdrawRequestModal;
