import { useRef, useState } from "react";
import { ImPlus } from "react-icons/im";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosAttach,
  IoMdClose,
} from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import thumbnailDemo from "../../assets/images/project-thumbnail.jpg";
import useOutsideClick from "../../hooks/useOutSideClick";

const CreateOfferModal = ({ handleClose, onOfferSubmit, values }) => {
  const [collapse, setCollapse] = useState(false);
  const [form, setForm] = useState({
    thumbnail: null,
    title: "",
    deliveryCount: "",
    deliveryWay: "hours",
    price: "",
    desc: "",
  });
  const fileInputRef = useRef(null);
  const formRef = useRef(null);
  const [requirements, setRequirements] = useState([
    "Which industry do you work in?",
    "Do you have your own company logo?",
    "",
  ]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, thumbnail: url }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const addRequirements = () => {
    setCollapse(true);
    setRequirements([...requirements, ""]);
  };

  const deleteRequirements = (index) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    const { title, thumbnail, price, deliveryCount, desc } = form;
    e.preventDefault();
    if (values && title && thumbnail && price && deliveryCount && desc) {
      const date = new Date();
      const msgDate = date.toLocaleDateString([], {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      const msgTime = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      const maxId =
        values?.length > 0
          ? Math.max(...values?.map((item) => item.messageId)) + 1
          : 1;
      const formData = {
        ...form,
        requirements,
      };
      const offerMessage = {
        messageId: maxId,
        msgDate,
        msgTime,
        messageText: "",
        attachment: null,
        customOffer: formData,
        contactForm: null,
      };
      onOfferSubmit.emit("message", offerMessage);
      // onOfferSubmit((prev) => [...prev, offerMessage]);
      setForm({
        thumbnail: null,
        title: "",
        deliveryCount: "",
        deliveryWay: "hours",
        price: "",
        desc: "",
      });
      handleClose(false);
    }
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
            <input
              type="file"
              hidden
              id="offer-thumbnail"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <label htmlFor="offer-thumbnail" className="cursor-pointer">
              <IoIosAttach className="text-2xl" />
            </label>
          </div>
        </div>
        <div className="px-3 py-4">
          <label className="block w-full font-medium">Title</label>
          <div className="flex items-start gap-3 border bg-white p-4">
            <img
              src={form.thumbnail ? form.thumbnail : thumbnailDemo}
              alt=""
              className="h-[100px] w-[100px] shrink-0 object-cover"
            />
            <input
              type="text"
              name="title"
              className="grow text-2xl font-semibold outline-none"
              placeholder="Enter Title"
              value={form.title}
              onChange={handleChange}
            />
          </div>
          <div className="my-5 flex items-center justify-between gap-3">
            <div className="flex w-1/2 items-center gap-3">
              <p className="text-sm font-medium">Delivery</p>
              <div className="flex items-center border bg-white pr-3">
                <input
                  type="number"
                  className="w-auto max-w-[100px] p-2 font-semibold outline-none"
                  name="deliveryCount"
                  value={form.deliveryCount}
                  onChange={handleChange}
                />
                <select
                  name="deliveryWay"
                  value={form.deliveryWay}
                  onChange={handleChange}
                  className="block p-2 font-semibold outline-none"
                >
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
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                />
                <span className="p-2 font-semibold">$</span>
              </div>
            </div>
          </div>
          <textarea
            name="desc"
            value={form.desc}
            onChange={handleChange}
            placeholder="Type here"
            className="block h-[150px] w-full resize-none border bg-white p-3 outline-none"
          ></textarea>
          <div className="my-5">
            <div className="flex items-center justify-between bg-primary p-3 text-white">
              <h1>Requirements</h1>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="bg-transparent"
                  onClick={() => setCollapse(!collapse)}
                >
                  {collapse ? (
                    <IoIosArrowUp className="text-2xl" />
                  ) : (
                    <IoIosArrowDown className="text-2xl" />
                  )}
                </button>
                <ImPlus onClick={addRequirements} className="cursor-pointer" />
              </div>
            </div>
            <div
              className={`${collapse ? "block" : "hidden"} ${requirements.length > 0 ? "border p-3" : ""} max-h-[100px] overflow-y-auto bg-white`}
            >
              {requirements.length > 0 &&
                requirements.map((requirement, index) => (
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
