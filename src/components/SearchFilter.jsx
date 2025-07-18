const SearchFilter = ({ searchValue, setSearchValue }) => {
  return (
    <div className="w-1/2 md:h-12 h-8 z-20">
      <input
        className="rounded-xl w-full h-full p-3 bg-gray-100 shadow outline-none placeholder:text-sm md:placeholder:text-lg"
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
