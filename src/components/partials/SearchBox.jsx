import { useRef, useState } from "react";
import { IoClose, IoSearch } from "react-icons/io5";

const SearchBox = ({ handleClose }) => {
  const textRef = useRef(null);
  const [textInput, setTextInput] = useState("");

  const handleInput = (e) => {
    setTextInput(e.target.value);
  };

  const handleClearInput = () => {
    setTextInput("");
    textRef.current && textRef.current.focus();
  };

  return (
    <div className="fixed left-0 top-0 z-[99999] flex h-screen w-full items-start justify-center overflow-y-auto bg-black/80 px-5 py-10 backdrop-blur-sm">
      <div className="w-full max-w-[600px] rounded-lg bg-white p-3">
        <div className="flex items-center gap-2 rounded-lg border-2 border-primary p-3">
          <IoSearch className="shrink-0 text-2xl text-gray-400" />
          <input
            ref={textRef}
            type="text"
            placeholder="Search..."
            className={`${textInput ? "search-box" : ""} flex-1 outline-none`}
            onChange={handleInput}
            value={textInput}
          />
          {textInput && (
            <button
              className="shrink-0 text-sm font-medium text-primary"
              onClick={handleClearInput}
            >
              Clear
            </button>
          )}
          <button
            onClick={() => handleClose(false)}
            className="flex shrink-0 items-center"
          >
            <IoClose className="text-2xl text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
