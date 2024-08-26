import { useState } from "react";

const SortDropdown = ({ options, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSortChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex w-full justify-center rounded-[30px] border border-primary bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption}
      </button>
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-gray-300">
          <div className="py-1">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
