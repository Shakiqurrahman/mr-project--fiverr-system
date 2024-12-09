import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiChevronRight } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useSaveWithdrawInfoMutation } from "../Redux/api/affiliateApiSlice";

const AffiliatePaymentMethods = () => {
  const navigate = useNavigate();

  const [saveWithdrawInfo] = useSaveWithdrawInfoMutation();

  const { user } = useSelector((state) => state.user);

  const [form, setForm] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    accountHolderName: "",
    bankName: "",
    accountNumber: "",
    swiftCode: "",
    bankAddress: "",
    recipientAddress: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const data = {
      fullname: form.fullName,
      email: form.email,
      accountHolderName: form.accountHolderName,
      bankName: form.bankName,
      accountNumber: form.accountNumber,
      SWIFTCode: form.swiftCode,
      bankAddress: form.bankAddress,
      recipientAddress: form.recipientAddress,
    };

    try {
      const res = await saveWithdrawInfo(data);
      if (res?.data?.success) {
        toast.success("Information saved successfully!");
        navigate("/affiliate");
      }
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
  };
  return (
    <section className="mx-auto my-16 max-w-[600px] rounded-xl bg-lightskyblue p-8">
      <p className="flex items-center font-medium text-gray-600">
        <Link className="hover:text-primary" to={"/affiliate"}>
          Affiliate
        </Link>{" "}
        <FiChevronRight />{" "}
        <span className="font-semibold text-black">Payment Method</span>
      </p>
      <form onSubmit={handleSave}>
        <div className="mt-6">
          <h2 className="mb-2 text-xl font-semibold">Contact info</h2>
          <label className="block px-2 pt-2 text-base font-medium">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-solid border-[#e7e7e7] bg-white p-2.5 text-sm outline-none"
          />
          <label className="block px-2 pt-2 text-base font-medium">Email</label>
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-solid border-[#e7e7e7] bg-white p-2.5 text-sm outline-none"
          />
        </div>
        <div className="mt-6">
          <h2 className="mb-2 text-xl font-semibold">Payment info</h2>
          <label className="block px-2 pt-2 text-base font-medium">
            Account Holder Name
          </label>
          <input
            type="text"
            name="accountHolderName"
            value={form.accountHolderName}
            placeholder="Account Holder Name"
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-solid border-[#e7e7e7] bg-white p-2.5 text-sm outline-none"
            required
          />
          <label className="block px-2 pt-2 text-base font-medium">
            Bank Name
          </label>
          <input
            type="text"
            name="bankName"
            value={form.bankName}
            onChange={handleChange}
            placeholder="Bank Name"
            required
            className="mt-1 block w-full rounded-md border border-solid border-[#e7e7e7] bg-white p-2.5 text-sm outline-none"
          />
          <label className="block px-2 pt-2 text-base font-medium">
            Account Number / IBAN
          </label>
          <input
            type="text"
            name="accountNumber"
            value={form.accountNumber}
            placeholder="Account Number"
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-solid border-[#e7e7e7] bg-white p-2.5 text-sm outline-none"
            required
          />
          <label className="block px-2 pt-2 text-base font-medium">
            SWIFT / BIC Code
          </label>
          <input
            type="text"
            name="swiftCode"
            value={form.swiftCode}
            onChange={handleChange}
            placeholder="SWIFT / BIC Code"
            className="mt-1 block w-full rounded-md border border-solid border-[#e7e7e7] bg-white p-2.5 text-sm outline-none"
            required
          />
          <label className="block px-2 pt-2 text-base font-medium">
            Bank Address
          </label>
          <input
            type="text"
            name="bankAddress"
            value={form.bankAddress}
            placeholder="Bank Address"
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-solid border-[#e7e7e7] bg-white p-2.5 text-sm outline-none"
            required
          />
          <label className="block px-2 pt-2 text-base font-medium">
            Recipient Address
          </label>
          <input
            type="text"
            name="recipientAddress"
            value={form.recipientAddress}
            onChange={handleChange}
            placeholder="Recipient Address"
            className="mt-1 block w-full rounded-md border border-solid border-[#e7e7e7] bg-white p-2.5 text-sm outline-none"
            required
          />
        </div>
        <div className="mt-6 flex items-center justify-end gap-4">
          <Link
            to={"/affiliate"}
            className="w-28 rounded-lg border border-gray-400 px-6 py-2 font-semibold text-black"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="w-28 rounded-lg bg-primary px-6 py-2 font-semibold text-white duration-300 hover:bg-primary/75"
          >
            Save
          </button>
        </div>
      </form>
    </section>
  );
};

export default AffiliatePaymentMethods;
