import { useContext, useState } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import { LuChevronLeft } from "react-icons/lu";

const Dropdown = ({ values, ref: dropdownRef, visible, onChange, id }) => {
  const { darkMode } = useContext(DarkModeContext);
  const [activeSubOptions, setActiveSubOptions] = useState(null);

  const handleShowSubOptions = (value) => {
    if (value.subOptions) {
      setActiveSubOptions(value.subOptions);
    } else {
      setActiveSubOptions(null);
    }
  };

  const handleMouseLeave = () => {
    setActiveSubOptions(null);
  };

  return (
    <div
      ref={dropdownRef}
      onMouseLeave={handleMouseLeave}
      className={`absolute text-sm md:text-md text-left z-50 top-full right-0 w-auto min-w-full ${
        !visible && "hidden"
      }`}
    >
      <ul
        className={`list-none border rounded-md overflow-hidden shadow-lg w-full ${
          darkMode ? "bg-gray-500" : "bg-gray-100"
        }`}
      >
        {values.map((value, idx) => (
          <li
            key={`${value.name}-${idx}`}
            onTouchStart={() => handleShowSubOptions(value)}
            onMouseEnter={() => handleShowSubOptions(value)}
            onClick={() => {
              if (value.subOptions) {
                setActiveSubOptions(value.subOptions);
                // Do NOT close or select here! Let user pick sub-option.
              } else {
                onChange(id, value.name);
              }
            }}
            className={`relative px-2 cursor-pointer py-1 ${value.bgColor} ${
              darkMode
                ? `hover:backdrop-brightness-120 active:backdrop-brightness-120 ${value.darkText}`
                : `hover:backdrop-brightness-90 active:backdrop-brightness-90 ${value.textColor}`
            }`}
          >
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {value.subOptions && <LuChevronLeft />}
            </div>
            {value.name}
          </li>
        ))}
      </ul>
      {activeSubOptions && (
        <div className="absolute right-full top-0 w-28 z-50">
          <ul
            className={`list-none border rounded-md overflow-hidden shadow-lg w-full ${
              darkMode ? "bg-gray-500" : "bg-gray-100"
            }`}
          >
            {activeSubOptions.map((opt, idx) => (
              <li
                key={`sub-${opt.name}-${idx}`}
                onClick={() => {
                  onChange(id, opt.name);
                  setActiveSubOptions(null);
                }}
                className={`px-2 cursor-pointer py-1 hover:backdrop-brightness-90 ${
                  opt.textColor
                } ${opt.bgColor} ${
                  darkMode
                    ? `hover:backdrop-brightness-120 active:backdrop-brightness-120 ${opt.darkText}`
                    : `hover:backdrop-brightness-90 active:backdrop-brightness-90 ${opt.textColor}`
                }`}
              >
                {opt.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
