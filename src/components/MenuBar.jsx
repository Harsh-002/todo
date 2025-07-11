import { useState } from "react";
import Greet from "./Greet";
import SearchFilter from "./SearchFilter";
import ToggleButton from "./ToggleButton";
import Lottie from "lottie-react";

const MenuBar = () => {
  const [animation, setAnimation] = useState(null);

  return (
    <div className="flex flex-col items-center w-full z-10">
      <Lottie
        className="absolute left-0 top-0 h-40 w-full max-w-none animate-move"
        animationData={animation}
      />
      <div className="w-full">
        <Greet setAnimation={setAnimation} />
        <div className="absolute right-10">
          <ToggleButton />
        </div>
      </div>
      <SearchFilter />
    </div>
  );
};

export default MenuBar;
