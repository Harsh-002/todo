import { useState } from "react";

const SearchFilter = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="w-1/2 h-12">
      <input
        className="rounded-xl w-full h-full p-3 bg-gray-100 shadow outline-none"
        type="text"
        id="search"
        name="search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Type here to search"
      />
    </div>
  );
};

export default SearchFilter;
