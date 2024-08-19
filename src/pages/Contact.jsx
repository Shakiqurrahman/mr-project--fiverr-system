import { useRef, useState } from 'react';
import { CgAttachment } from 'react-icons/cg';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Skeleton from '@mui/material/Skeleton';

function Contact() {
    const [value, setValue] = useState({
        name: '',
        email: '',
        link: '',
        Message: '',
    });
    const [selectedImages, setSelectedImages] = useState([]);
    const [loadingImages, setLoadingImages] = useState([]);
    const textarea = useRef();

    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const images = files.map(file => URL.createObjectURL(file));
        setSelectedImages(prevImages => [...prevImages, ...images]);
        setLoadingImages(images.map(() => true)); // Initialize loading states
    };

    const handleImageLoad = (index) => {
        setLoadingImages(prevLoadingImages => {
            const newLoadingImages = [...prevLoadingImages];
            newLoadingImages[index] = false; // Set the loading state to false when the image is loaded
            return newLoadingImages;
        });
    };

    const handleDeleteImage = (indexToRemove) => {
        setSelectedImages(prevImages => prevImages.filter((_, index) => index !== indexToRemove));
        setLoadingImages(prevLoadingImages => prevLoadingImages.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(value);
    };

    const handleKeyUp = (e) => {
        textarea.current.style.height = `${e.target.scrollHeight}px`;
    };

    return (
        <div className="max-width">
            <h1 className="text-center text-2xl mt-[40px] max-w-[700px] mx-auto">
                If you have any questions or inquiries about our services,
                please feel free to contact us by filling out this form
            </h1>

            <form
                onSubmit={handleSubmit}
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
                    id="file"
                    hidden
                    onChange={handleFileChange}
                />
                <label
                    className="p-3 w-full mt-5 flex justify-between bg-white border border-solid border-gray-400 cursor-pointer"
                    htmlFor="file"
                >
                    <span className="text-gray-400">Example design</span>
                    <CgAttachment className="text-gray-400" />
                </label>

                <div className="mt-5 flex gap-2 flex-wrap">
                    {selectedImages.map((image, index) => (
                        <div
                            key={index}
                            className="relative group"
                            style={{ width: '100px', height: '100px' }}
                        >
                            {loadingImages[index] && (
                                <Skeleton variant="rectangular" width={100} height={100} />
                            )}
                            <img
                                className={`w-[100px] h-[100px] object-fill ${loadingImages[index] ? 'hidden' : ''}`}
                                src={image}
                                alt={`Selected ${index}`}
                                onLoad={() => handleImageLoad(index)}
                            />
                            <button
                                type="button"
                                className="absolute top-2 right-2 text-white bg-black bg-opacity-50 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => handleDeleteImage(index)}
                            >
                                <RiDeleteBin6Line size={20} />
                            </button>
                        </div>
                    ))}
                </div>

                <textarea
                    name="Message"
                    className="mt-5 w-full p-3 outline-none border border-solid border-gray-400 h-auto cusotomTextarea"
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
