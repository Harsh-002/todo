import { useContext, useState } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import { LuChevronLeft } from "react-icons/lu";

const Dropdown = ({ ref, visible, onChange, values, id }) => {
  const { darkMode } = useContext(DarkModeContext);
  const [activeSubOptions, setActiveSubOptions] = useState(null); // holds subOptions to show

  const handleShowSubOptions = (value) => {
    if (value.subOptions) {
      setActiveSubOptions(value.subOptions);
    } else {
      setActiveSubOptions(null);
    }
  };

  const handleMouseLeave = () => {
    setActiveSubOptions(null); // hide submenu
  };

  return (
    <div
      ref={ref}
      onMouseLeave={handleMouseLeave}
      className={`absolute text-md text-left z-50 top-full right-0 w-auto min-w-32 ${
        !visible && "hidden"
      }`}
    >
      <ul
        className={`list-none border rounded-md overflow-hidden shadow-lg w-full ${
          darkMode ? "bg-gray-500" : "bg-gray-100"
        }`}
      >
        {values.map((value, idx) => {
          return (
            <li
              onMouseEnter={() => handleShowSubOptions(value)}
              key={`${value.name}-${idx}`}
              onClick={() => onChange(id, value.name)}
              className={`relative px-2 cursor-pointer py-1 ${value.bgColor} ${
                darkMode
                  ? `hover:backdrop-brightness-120 ${value.darkText}`
                  : `hover:backdrop-brightness-90 ${value.textColor}`
              }
            `}
            >
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {value.subOptions && <LuChevronLeft />}
              </div>
              {value.name}
            </li>
          );
        })}
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
                onClick={() => onChange(id, opt.name)}
                className={`px-2 cursor-pointer py-1 hover:backdrop-brightness-90 ${
                  opt.textColor
                } ${opt.bgColor} ${
                  darkMode
                    ? `hover:backdrop-brightness-120 ${opt.darkText}`
                    : `hover:backdrop-brightness-90 ${opt.textColor}`
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
