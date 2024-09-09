import React from "react";
import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div id="search" className="relative lg:w-11/12">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="w-full py-2 pl-10 pr-4 text-black bg-white border rounded-full focus:outline-none focus:border-blue-500"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="w-5 h-5 text-gray-700" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
