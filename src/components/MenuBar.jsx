import { useState } from "react";
import Greet from "./Greet";
import SearchFilter from "./SearchFilter";
import ToggleButton from "./ToggleButton";
import Lottie from "lottie-react";

const MenuBar = ({ searchValue, setSearchValue }) => {
  const [animation, setAnimation] = useState(null);

  return (
    <div className="relative flex md:h-34 flex-col items-center justify-center max-w-lvw z-10 overflow-hidden">
      <Lottie
        className="absolute left-0 -top-6 h-30 md:h-40 w-full max-w-none animate-move md:top-0"
        animationData={animation}
      />
      <div className="w-full">
        <Greet setAnimation={setAnimation} />
        <div className="absolute md:right-10 right-2">
          <ToggleButton />
        </div>
      </div>
      <SearchFilter searchValue={searchValue} setSearchValue={setSearchValue} />
    </div>
  );
};

export default MenuBar;
