import { useEffect, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useOutsideClick from "../../hooks/useOutsideClick";
import { useLazyGetDesignsBySearchQuery } from "../../Redux/api/uploadDesignApiSlice";
import {
  setSearchedText,
  setSearchResult,
} from "../../Redux/features/utilSlice";

const SearchBox = ({ handleClose }) => {
  // const [searchQuery, { data: searchResult, isLoading }] =
  //   useLazyGetDesignsBySearchQuery();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [getDesignsBySearch, { data: searchResults }] =
    useLazyGetDesignsBySearchQuery();

  const textRef = useRef(null);
  const searchBoxRef = useRef(null);
  const [textInput, setTextInput] = useState("");

  const handleInput = async (e) => {
    setTextInput(e.target.value);
  };

  const handleClearInput = () => {
    setTextInput("");
    textRef.current && textRef.current.focus();
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    dispatch(setSearchedText(textInput));
    if (textInput) {
      getDesignsBySearch(textInput);
      navigate("/designs");
    }
    setTextInput("");
    handleClose(false);
  };

  const handleEnterKeySearch = (e) => {
    if (e.key === "Enter") {
      dispatch(setSearchedText(textInput));
      if (textInput) {
        getDesignsBySearch(textInput);
        navigate("/designs");
      }
      setTextInput("");
      handleClose(false);
    }
  };

  useEffect(() => {
    if (searchResults) {
      dispatch(setSearchResult(searchResults));
    }
  }, [searchResults]);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.focus();
    }
  }, []);

  useOutsideClick(searchBoxRef, handleClose);

  return (
    <div className="fixed left-0 top-0 z-[99999] flex h-screen w-full items-start justify-center overflow-y-auto bg-black/80 px-5 py-10 backdrop-blur-sm">
      <div
        className="w-full max-w-[600px] rounded-lg bg-white p-3"
        ref={searchBoxRef}
      >
        <div className="flex items-center gap-2 rounded-lg border-2 border-primary p-3">
          {/* <IoSearch className="shrink-0 text-2xl text-gray-400" /> */}
          <input
            ref={textRef}
            type="text"
            placeholder="Search..."
            className={`${textInput ? "search-box" : ""} flex-1 outline-none`}
            onChange={handleInput}
            onKeyDown={handleEnterKeySearch}
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
            onClick={handleSearch}
            className="ml-auto flex shrink-0 items-center"
          >
            <IoSearch className="text-2xl text-gray-400" />
          </button>
        </div>
        {/* <div className="bg-white">
          {textInput?.length > 0 &&
            searchResult?.map((res, idx) => {
              return (
                <Link
                  className={`flex items-center justify-between border-t bg-transparent p-4 text-base font-semibold duration-300 first:mt-3 hover:bg-lightskyblue`}
                  to={`/design/${res?.designId}`}
                  onClick={() => handleClose()}
                  key={idx}
                >
                  <div className="flex items-center gap-3">
                    <FaAnglesRight />
                    <div className="flex flex-col">
                      <h2>{res?.title}</h2>
                      <div className="flex items-center text-[11px] leading-normal text-gray-500">
                        <span>design </span>
                        <MdChevronRight size={15} />
                        <span> {res?.designId}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-gray-500">
                    <IoMdReturnLeft />
                  </span>
                </Link>
              );
            })}
        </div> */}
      </div>
    </div>
  );
};

export default SearchBox;
