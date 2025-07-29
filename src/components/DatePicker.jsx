import { useRef } from "react";
import { LuCalendar } from "react-icons/lu";

const DatePicker = ({ date, darkMode, formattedDate, id, onDateChange }) => {
  // Function to show date picker on clicking on date
  const showPicker = () => {
    if (inputRef.current?.showPicker) {
      inputRef.current.showPicker();
    } else {
      inputRef.current?.click();
    }
  };

  const inputRef = useRef();

  return (
    <div
      onClick={showPicker}
      className="text-gray-500 font-bold flex-1 flex justify-center items-center cursor-pointer relative"
    >
      <LuCalendar
        className={`text-lg text-md md:text-lg sm:text-sm ${
          date < new Date()
            ? "text-red-400"
            : darkMode
            ? "text-gray-300"
            : "text-gray-600"
        }`}
      />
      <p
        className={`md:pl-4 pl-1 text-md md:text-lg sm:text-md text-sm ${
          date < new Date()
            ? "text-red-400"
            : darkMode
            ? "text-gray-300"
            : "text-gray-600"
        }`}
      >
        {formattedDate}
      </p>
      <input
        ref={inputRef}
        id={id}
        name="date"
        type="date"
        className="opacity-0 absolute bottom-0 left-0 w-0 h-0"
        onChange={(e) => onDateChange(id, e.target.valueAsDate)}
      />
    </div>
  );
};

export default DatePicker;
