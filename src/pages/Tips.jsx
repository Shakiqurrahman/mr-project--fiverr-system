import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image from "../assets/images/Website Image Size 2700x2000.jpg";

let initialValue = 1000;

export default function Tips() {
  const [tip, setTip] = useState(0);
  const [tip2, setTip2] = useState(0);
  const [clickBtn, setClickBtn] = useState("clicked");

  const handleClickBtn = (e) => {
    setClickBtn(e.target.value);
  };

  const handleDonation = () => {
    if (initialValue <= 100) {
      setTip(5);
      setTip2(10);
    } else if (initialValue <= 300) {
      setTip(7);
      setTip2(15);
    } else if (initialValue <= 500) {
      setTip(10);
      setTip2(20);
    } else if (initialValue <= 750) {
      setTip(15);
      setTip2(25);
    } else if (initialValue <= 1000) {
      setTip(20);
      setTip2(35);
    } else {
      setTip(30);
      setTip2(50);
    }
  };

  useEffect(() => {
    handleDonation();
  }, []);

  return (
    <div className="mt-10 flex flex-wrap justify-center gap-10">
      <div>
        <h3 className="mt-5 text-center text-2xl font-semibold text-black md:text-start">
          Thanks for your review!
        </h3>
        <p className="text-center md:text-start">
          Show your appreciation to your designer by giving a tip.
        </p>

        <div className="flex flex-col items-center justify-center md:justify-normal">
          <div className="mt-10 flex w-[350px] border border-solid border-gray-400 text-center font-semibold text-black sm:w-[400px] lg:w-[480px]">
            <button
              value="clicked"
              className={`text-md border-r border-solid border-gray-400 p-4 px-6 lg:px-10 ${
                clickBtn === "clicked" ? "bg-primary text-white" : ""
              }`}
              onClick={handleClickBtn}
            >
              ${tip}
            </button>
            <button
              value="NotClicked"
              className={`text-md border-r border-solid border-gray-400 p-4 px-6 lg:px-10 ${
                clickBtn === "NotClicked" ? "bg-primary text-white" : ""
              }`}
              onClick={handleClickBtn}
            >
              ${tip2}
            </button>
            <div className="flex items-center justify-between gap-3 px-6 lg:flex-grow">
              <label className="font-regular sm:text- text-sm">
                Custom Tip
              </label>
              <div className="flex w-[100px] items-center border-2">
                <span className="px-3 py-1">$</span>
                <input
                  type="number"
                  className="block w-full flex-grow outline-none"
                />
              </div>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-center gap-5 py-2 lg:justify-end">
            <Link
              to="#"
              className="decoration-solid hover:text-red-500 hover:underline"
            >
              No Thanks
            </Link>
            <button className="w-[200px] rounded-[5px] bg-primary py-1 font-semibold text-white hover:bg-blue-400">
              Send Tip
            </button>
          </div>
        </div>
      </div>
      <div className="flex max-w-[300px] flex-col items-center justify-center">
        <div className="mt-5 bg-lightskyblue p-3">
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
  );
}
