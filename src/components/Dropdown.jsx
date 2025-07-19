import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";

const Dropdown = ({ ref, visible, onChange, values, id }) => {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div
      ref={ref}
      className={`absolute z-50 top-full w-11/12 ${visible ? "" : "hidden"}`}
    >
      <ul
        className={`list-none border rounded-md overflow-hidden shadow-lg w-full ${
          darkMode ? "bg-gray-500" : "bg-gray-100"
        }`}
      >
        {values.map((value) => (
          <li
            key={`${value.name}-${id}`}
            onClick={() => onChange(id, value.name)}
            className={`px-7 cursor-pointer py-1 ${
              darkMode
                ? `text-${value.textColor} hover:bg-${value.bgColor}`
                : `text-${value.bgColor} hover:bg-${value.textColor}`
            }`}
          >
            {value.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
