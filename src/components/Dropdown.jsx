import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";

const Dropdown = ({ children, ref, visible }) => {
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
        {children}
      </ul>
    </div>
  );
};

export default Dropdown;
