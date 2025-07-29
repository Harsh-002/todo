import { useRef, useState } from "react";
import Dropdown from "./Dropdown";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { statusOptions } from "../data/OptionsData";

const TaskStatus = ({ darkMode, onStatusChange, id, status }) => {
  const statusRef = useRef();

  const statusDropdownRef = useRef();

  const [statusVisible, setStatusVisible] = useState(false);

  // Function to close dropdown on clicking outside
  useOutsideClick([statusRef, statusDropdownRef], () =>
    setStatusVisible(false)
  );

  const values = statusOptions;

  return (
    <div
      onClick={() => setStatusVisible(!statusVisible)}
      className="flex-1 flex items-center justify-center relative"
    >
      <div className="relative w-5/6">
        <p
          ref={statusRef}
          className={`${
            status === "todo"
              ? darkMode
                ? "bg-gray-800 text-gray-300"
                : "bg-gray-300 text-gray-800"
              : status === "done"
              ? darkMode
                ? "bg-green-800 text-green-300"
                : "bg-green-300 text-green-800"
              : darkMode
              ? "bg-yellow-800 text-yellow-300"
              : "bg-yellow-300 text-yellow-800"
          } md:px-4 w-full mx-0 text-center px-2 py-1 rounded-md  cursor-pointer text-md md:text-lg sm:text-md text-sm`}
        >
          {status === "in-progress" ? "ongoing" : status}
        </p>
        <Dropdown
          ref={statusDropdownRef}
          visible={statusVisible}
          onChange={onStatusChange}
          values={values}
          id={id}
        />
      </div>
    </div>
  );
};

export default TaskStatus;
