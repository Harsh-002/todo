import Greet from "./Greet";
import SearchFilter from "./SearchFilter";
import ToggleButton from "./ToggleButton";

const MenuBar = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full">
        <Greet />
        <div className="absolute right-10">
          <ToggleButton />
        </div>
      </div>
      <SearchFilter />
    </div>
  );
};

export default MenuBar;
