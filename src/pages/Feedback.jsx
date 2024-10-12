import Rating from "@mui/material/Rating";
import { useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import { IoStarOutline, IoStarSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import Image from "../assets/images/project-thumbnail.jpg";
import Divider from "../components/Divider";

function Feedback() {
  const [thumbnail, setThumbnail] = useState(true);
  const [value, setValue] = useState(2);
  const [text, setText] = useState("");

  const handleText = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="max-width">
      <div className="mt-10 flex flex-col justify-center gap-10 md:flex-row">
        <div className="w-full md:w-2/4 lg:w-3/4">
          <h1 className="text-center text-xl font-semibold md:text-start lg:text-2xl">
            Public Feedback
          </h1>
          <p className="text-center font-medium md:text-start">
            Please share your valuable experience with this project
          </p>
          <Divider className="mt-5 w-full border-[1px] border-solid border-gray-300" />

          <form action="">
            <div className="my-5 text-center sm:my-10">
              <Rating
                className="rating-icon !text-[40px] !text-primary lg:!text-[60px]"
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                icon={<IoStarSharp />}
                emptyIcon={<IoStarOutline />}
              />
            </div>

            <div className="flex flex-col items-stretch gap-3 sm:flex-row">
              <textarea
                className="block h-[200px] flex-grow resize-none border-2 border-solid px-4 py-3 outline-none sm:h-auto"
                value={text}
                onChange={handleText}
                name=""
                id=""
                placeholder="Type your experience"
              ></textarea>
              <div className="relative select-none">
                <span className="block text-center">Add your review</span>
                <img
                  src={Image}
                  alt=""
                  className="h-full w-full sm:h-[150px] sm:w-[150px]"
                />
                <input
                  type="checkbox"
                  className="is-checked peer"
                  name="thumbnail"
                  id="thumbnail"
                  checked={thumbnail}
                  onChange={() => setThumbnail(!thumbnail)}
                  hidden
                />
                <label
                  htmlFor="thumbnail"
                  className="absolute bottom-2 right-2 flex h-[20px] w-[20px] cursor-pointer items-center justify-center border border-solid bg-white text-sm text-primary *:opacity-0 peer-[.is-checked]:peer-checked:*:opacity-100"
                >
                  <GiCheckMark />
                </label>
              </div>
            </div>
            <div className="relative mx-auto mt-5 flex w-full justify-center lg:mt-10">
              <button className="w-[200px] bg-primary p-2 text-center text-xl font-semibold text-white hover:bg-blue-400">
                Send Feedback
              </button>
              <Link
                to="#"
                className="absolute bottom-2 right-2 p-1 hover:text-red-500 hover:underline"
              >
                Skip
              </Link>
            </div>
          </form>
        </div>
        <div className="flex w-full flex-col items-center justify-center md:w-1/4 lg:mt-[-80px]">
          <div className="w-full bg-lightskyblue p-5 md:w-auto">
            <h4 className="my-2 text-xl font-semibold text-black">
              Project Details
            </h4>
            <div className="flex gap-2 bg-white px-2">
              <img src={Image} alt="" className="mt-1 h-[60px] w-auto" />
              <div className="p-1">
                <p className="w-[90%] leading-[15px]">Door Hanger Design</p>
                <p className="mt-2 font-semibold text-primary">Complete</p>
              </div>
            </div>
            <div>
              <div className="mt-5 flex justify-between">
                <p>Project by</p>
                <span className="font-semibold">clientsuserame</span>
              </div>
              <div className="mt-2 flex justify-between">
                <p>Quantity</p>
                <span className="font-semibold">1</span>
              </div>
              <div className="mt-2 flex justify-between">
                <p>Duration</p>
                <span className="font-semibold">2 Days</span>
              </div>
              <div className="mt-2 flex justify-between">
                <p>Total price</p>
                <span className="font-semibold">$40</span>
              </div>
              <div className="my-3 mt-2 flex justify-between">
                <p>Project number</p>
                <span className="font-semibold">#MR1N5ZPN</span>
              </div>
            </div>
          </div>
          <h2 className="mt-6 text-center font-semibold text-[#000]">
            Back to the project page
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
