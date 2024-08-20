import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../assets/images/Website Image Size 2700x2000.jpg';

let initialValue = 1000;

export default function Tips() {
    const [tip, setTip] = useState(0);
    const [tip2, setTip2] = useState(0);
    const [clickBtn, setClickBtn] = useState('clicked');

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
        <div className="flex flex-wrap gap-10 justify-center mt-10">
            <div>
                <h3 className="text-black font-semibold text-center md:text-start text-2xl mt-5">
                    Thanks for your review!
                </h3>
                <p className="text-center md:text-start">
                    Show your appreciation to your designer by giving a tip.
                </p>

                <div className="flex justify-center flex-col items-center md:justify-normal ">
                    <div className="mt-10 border border-solid border-gray-400 flex text-black font-semibold text-center w-[350px] sm:w-[400px] lg:w-[480px] ">
                        <button
                            value="clicked"
                            className={`text-md p-4 px-6 lg:px-10 border-r border-solid border-gray-400 ${
                                clickBtn === 'clicked'
                                    ? 'text-white bg-primary'
                                    : ''
                            }`}
                            onClick={handleClickBtn}
                        >
                            ${tip}
                        </button>
                        <button
                            value="NotClicked"
                            className={`text-md p-4 px-6 lg:px-10 border-r border-solid border-gray-400 ${
                                clickBtn !== 'clicked'
                                    ? 'text-white bg-primary'
                                    : ''
                            }`}
                            onClick={handleClickBtn}
                        >
                            ${tip2}
                        </button>
                        <div className="px-6 flex items-center gap-3 justify-between lg:flex-grow ">
                            <label className="font-regular text-sm sm:text-">
                                Custom Tip
                            </label>
                            <div className="w-[100px] flex items-center border-2">
                                <span className="py-1 px-3">$</span>
                                <input
                                    type="number"
                                    className=" flex-grow w-full block outline-none"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center lg:justify-end gap-5 py-2 mt-5 items-center">
                        <Link
                            to="#"
                            className="hover:underline decoration-solid hover:text-red-500"
                        >
                            No Thanks
                        </Link>
                        <button className="bg-primary text-white w-[200px] py-1 rounded-[5px] font-semibold hover:bg-blue-400">
                            Send Tip
                        </button>
                    </div>
                </div>
            </div>
            <div className="max-w-[300px] flex flex-col justify-center items-center">
                <div className=" bg-lightskyblue mt-5 p-3">
                    <h4 className="text-black text-xl my-2 font-semibold">
                        Project Details
                    </h4>
                    <div className="flex bg-white px-2 gap-2">
                        <img
                            src={Image}
                            alt=""
                            className="w-auto h-[60px] mt-1"
                        />
                        <div className="p-1">
                            <p className="w-[90%] leading-[15px]">
                                Door Hanger Design
                            </p>
                            <p className="mt-2 text-primary font-semibold">
                                Complete
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between mt-5">
                            <p>Project by</p>
                            <span className="font-semibold">
                                clientsuserame
                            </span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <p>Quantity</p>
                            <span className="font-semibold">1</span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <p>Duration</p>
                            <span className="font-semibold">2 Days</span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <p>Total price</p>
                            <span className="font-semibold">$40</span>
                        </div>
                        <div className="flex justify-between mt-2 my-3">
                            <p>Project number</p>
                            <span className="font-semibold">#MR1N5ZPN</span>
                        </div>
                    </div>
                </div>
                <h2 className="text-center mt-6 text-[#000] font-semibold">
                    Back to the project page
                </h2>
            </div>
        </div>
    );
}
