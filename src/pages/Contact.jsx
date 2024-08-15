import { useRef, useState } from 'react';
import { CgAttachment } from 'react-icons/cg';
import Image from '../assets/images/Website Image Size 2700x2000.jpg';

function Contact() {
    const [value, setValue] = useState({
        name: '',
        email: '',
        link: '',
        Message: '',
    });
    const textarea = useRef();

    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(value);
    };

    const handleKeyUp = (e) => {
        textarea.current.style.height = `${e.target.scrollHeight}px`;
    };

    return (
        <div className="max-width ">
            <h1 className="text-center text-2xl mt-[40px] max-w-[700px] mx-auto ">
                If you have any questions or inquiries about our services,
                please feel free to contact us by filling out this form
            </h1>

            <form
                onSubmit={handleSubmit}
                action=""
                className="bg-[#FFEFEF] p-5 rounded-xl max-w-[800px] mx-auto mt-10"
            >
                <input
                    className="block w-full mt-5 p-3 border border-solid border-gray-400 outline-0"
                    type="text"
                    name="name"
                    value={value.name}
                    placeholder="Name"
                    onChange={handleChange}
                />
                <input
                    className="block w-full mt-5 p-3 border border-solid border-gray-400 outline-0"
                    type="email"
                    name="email"
                    value={value.email}
                    placeholder="Email"
                    onChange={handleChange}
                />
                <input
                    className="block w-full mt-5 p-3 border border-solid border-gray-400 outline-0"
                    type="text"
                    name="link"
                    value={value.link}
                    placeholder="Website/Facebook"
                    onChange={handleChange}
                />
                <input
                    name="file"
                    type="file"
                    multiple
                    placeholder="Example design"
                    id="file"
                    hidden
                />
                <label
                    className=" p-3 w-full mt-5 flex justify-between bg-white border border-solid border-gray-400 cursor-pointer"
                    htmlFor="file"
                >
                    <span className="text-gray-400">Example design</span>
                    <CgAttachment className="text-gray-400" />
                </label>

                <div className="mt-5 flex gap-2 flex-wrap">
                    <img className="w-[24%]" src={Image} alt="" />
                    <img className="w-[24%]" src={Image} alt="" />
                    <img className="w-[24%]" src={Image} alt="" />
                    <img className="w-[24%]" src={Image} alt="" />
                </div>

                <textarea
                    name="Message"
                    id=""
                    className="mt-5 w-full p-3  outline-none border border-solid border-gray-400 h-auto cusotomTextarea"
                    value={value.Message}
                    onChange={handleChange}
                    placeholder="Message"
                    ref={textarea}
                    onKeyUp={handleKeyUp}
                ></textarea>

                <div className="text-center mt-5">
                    <button
                        type="submit"
                        className="p-3 text-white bg-[#248EDA] w-[200px] font-medium text-[20px] scro"
                    >
                        SUBMIT
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Contact;
