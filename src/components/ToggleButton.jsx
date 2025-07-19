import { LuSun } from "react-icons/lu";
import { LuMoon } from "react-icons/lu";
import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import { saveDarkMode } from "../services/localStorage";

const ToggleButton = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
    saveDarkMode(!darkMode);
  };

  return (
    <div
      onClick={handleToggleDarkMode}
      onMouseDown={(e) => e.preventDefault()}
      className={`w-14 h-7 border-2 border-white shadow-gray-400 shadow rounded-4xl flex items-center p-0.5 cursor-pointer relative transition-colors ${
        darkMode ? "bg-gray-800" : "bg-amber-500"
      }`}
    >
      <div
        className={`absolute flex items-center justify-center h-5 w-5 rounded-full transform transition-all bg-white ${
          darkMode ? "translate-x-7" : "translate-x-0"
        }`}
      >
        {darkMode ? (
          <LuMoon className="text-gray-800" />
        ) : (
          <LuSun className="text-amber-500" />
        )}
      </div>
    </div>
  );
};

export default ToggleButton;
