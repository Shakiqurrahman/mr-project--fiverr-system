import React from 'react';
import { GoSearch } from 'react-icons/go';

const SearchBox = () => {
    return (
        <div className="mt-6 bg-lightskyblue p-4">
            <h1 className="mb-2 text-lg font-semibold text-primary">
              Search Project
            </h1>
            <div className="relative flex items-stretch border">
                <input
                  className="w-full rounded-sm px-3 py-1 outline-none text-sm"
                  type="text"
                  placeholder="Project Number or Username"
                />
                <button
                  className="rounded-sm bg-primary p-2"
                  type="submit"
                >
                  <GoSearch className="text-base text-white" />
                </button>
              </div>
          </div>
    );
};

export default SearchBox;