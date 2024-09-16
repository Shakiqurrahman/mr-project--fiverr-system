import { useRef, useState } from "react";
import { ImPlus } from "react-icons/im";
import { IoIosAttach, IoMdClose } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import thumbnail from "../../assets/images/project-thumbnail.jpg";
import useOutsideClick from "../../hooks/useOutSideClick";

const CreateOfferModal = ({ handleClose, onOfferSubmit }) => {
  const formRef = useRef(null);
  const [requirements, setRequirements] = useState([
    "Which industry do you work in?",
    "Do you have your own company logo?",
    "",
  ]);

  const addRequirements = () => {
    setRequirements([...requirements, ""]);
  };

  const deleteRequirements = (index) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useOutsideClick(formRef, () => handleClose(false));

  return (
    <div className="fixed left-0 top-0 z-[9999999] flex h-screen w-full items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <button
        className="absolute right-10 top-10"
        onClick={() => handleClose(false)}
      >
        <IoMdClose className="text-3xl text-canceled" />
      </button>
      <form
        ref={formRef}
        className="w-full max-w-[600px] bg-lightskyblue"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-between bg-primary p-3 text-white">
          <h1 className="text-lg font-medium">Create a single payment offer</h1>
          <div>
            <input type="file" hidden id="offer-thumbnail" />
            <label htmlFor="offer-thumbnail" className="cursor-pointer">
              <IoIosAttach className="text-2xl" />
            </label>
          </div>
        </div>
        <div className="px-3 py-4">
          <label className="block w-full font-medium">Title</label>
          <div className="flex items-start gap-3 border bg-white p-4">
            <img
              src={thumbnail}
              alt=""
              className="w-[100px] shrink-0 object-cover"
            />
            <input
              type="text"
              name="title"
              className="grow text-2xl font-semibold outline-none"
              placeholder="Enter Title"
            />
          </div>
          <div className="my-5 flex items-center justify-between gap-3">
            <div className="flex w-1/2 items-center gap-3">
              <p className="text-sm font-medium">Delivery</p>
              <div className="flex items-center border bg-white">
                <input
                  type="number"
                  className="w-auto max-w-[100px] p-2 font-semibold outline-none"
                />
                <select name="" className="p-2 font-semibold outline-none">
                  <option value="hours">hours</option>
                  <option value="day">day</option>
                  <option value="days">days</option>
                </select>
              </div>
            </div>
            <div className="flex w-1/2 items-center justify-end gap-3">
              <p className="text-sm font-medium">Price</p>
              <div className="flex items-center border bg-white">
                <input
                  type="number"
                  className="max-w-[100px] p-2 font-semibold outline-none"
                />
                <span className="p-2 font-semibold">$</span>
              </div>
            </div>
          </div>
          <textarea
            name=""
            placeholder="Type here"
            className="block h-[150px] w-full resize-none border bg-white p-3 outline-none"
          ></textarea>
          <div>
            <div className="flex justify-between bg-primary p-3 text-white">
              <h1 className="">Requirements</h1>
              <ImPlus onClick={addRequirements} />
            </div>
            <div className="p-3">
              {requirements.map((requirement, index) => (
                <div key={index} className="mb-2 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type"
                    value={requirement}
                    onChange={(e) => {
                      const newRequirements = [...requirements];
                      newRequirements[index] = e.target.value;
                      setRequirements(newRequirements);
                    }}
                    className="block w-full border border-solid border-[#e7e7e7] bg-white p-2 outline-none"
                  />
                  <RiDeleteBin6Line
                    className="cursor-pointer text-gray-500"
                    onClick={() => deleteRequirements(index)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              className="w-1/2 bg-canceled p-2 font-medium text-white"
              onClick={() => handleClose(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 bg-primary p-2 font-medium text-white"
            >
              Send Offer
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateOfferModal;
