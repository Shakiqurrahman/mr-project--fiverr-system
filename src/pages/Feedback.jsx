import Rating from '@mui/material/Rating';
import { useState } from 'react';
import { GiCheckMark } from 'react-icons/gi';
import { IoStarOutline, IoStarSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import Image from '../assets/images/project-thumbnail.jpg';
import Divider from '../components/Divider';

function Feedback() {
    const [thumbnail, setThumbnail] = useState(true);
    const [value, setValue] = useState(2);
    const [text, setText] = useState('');

    const handleText = (e) => {
        setText(e.target.value);
    };

    return (
        <div className="max-width">
            <div className="flex flex-col md:flex-row gap-10 justify-center mt-10">
                <div className="w-full md:w-2/4 lg:w-3/4">
                    <h1 className="text-xl lg:text-2xl font-semibold text-center md:text-start">
                        Public Feedback
                    </h1>
                    <p className="font-medium text-center md:text-start">
                        Please share your valuable experience with this project
                    </p>
                    <Divider className="w-full border-[1px] border-solid border-gray-300 mt-5" />

                    <form action="">
                        <div className="text-center my-5 sm:my-10">
                            <Rating
                                className="!text-primary rating-icon !text-[40px] lg:!text-[60px]"
                                name="simple-controlled"
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                                icon={<IoStarSharp />}
                                emptyIcon={<IoStarOutline />}
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch gap-3">
                            <textarea
                                className="flex-grow block resize-none border-2 border-solid px-4 py-3 outline-none h-[200px] sm:h-auto"
                                value={text}
                                onChange={handleText}
                                name=""
                                id=""
                                placeholder="Type your experience"
                            ></textarea>
                            <div className="relative select-none">
                                <span className="text-center block">
                                    Add your review
                                </span>
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
                                    className="absolute bottom-2 right-2 flex justify-center items-center text-sm text-primary *:opacity-0 peer-[.is-checked]:peer-checked:*:opacity-100 bg-white border border-solid h-[20px] w-[20px]"
                                >
                                    <GiCheckMark />
                                </label>
                            </div>
                        </div>
                        <div className="mt-5 lg:mt-10 w-full flex justify-center mx-auto relative">
                            <button className="w-[200px] bg-primary hover:bg-blue-400 text-center p-2 text-xl font-semibold text-white">
                                Send Feedback
                            </button>
                            <Link
                                to="#"
                                className="p-1 hover:underline hover:text-red-500 absolute bottom-2 right-2"
                            >
                                Skip
                            </Link>
                        </div>
                    </form>
                </div>
                <div className="w-full md:w-1/4 flex flex-col justify-center items-center lg:mt-[-80px]">
                    <div className=" bg-lightskyblue p-5 w-full md:w-auto">
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
        </div>
    );
}

export default Feedback;
