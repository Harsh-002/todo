import React, { useRef, useState } from "react";
import Dropdown from "./Dropdown";
import { useOutsideClick } from "../hooks/useOutsideClick";

const TaskStatus = ({ darkMode, onStatusChange, id, status }) => {
  const statusRef = useRef();

  const statusDropdownRef = useRef();

  const [statusVisible, setStatusVisible] = useState(false);

  // Function to close dropdown on clicking outside
  useOutsideClick([statusRef, statusDropdownRef], () =>
    setStatusVisible(false)
  );

  return (
    <div className=" flex-1 flex items-center justify-center relative">
      <p
        onClick={() => setStatusVisible(!statusVisible)}
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
        } md:px-4 w-full mx-2 text-center px-2 py-1 rounded-md  cursor-pointer text-md md:text-lg sm:text-md text-sm`}
      >
        {status}
      </p>
      <Dropdown ref={statusDropdownRef} visible={statusVisible}>
        <li
          onClick={() => onStatusChange(id, "done")}
          className={`px-7 cursor-pointer py-1 ${
            darkMode
              ? "text-green-300 hover:bg-green-800"
              : "text-green-800 hover:bg-green-300"
          }`}
        >
          done
        </li>
        <li
          onClick={() => onStatusChange(id, "todo")}
          className={`px-7 cursor-pointer py-1 ${
            darkMode
              ? "text-gray-300 hover:bg-gray-800"
              : "text-gray-800 hover:bg-gray-300"
          }`}
        >
          todo
        </li>
        <li
          onClick={() => onStatusChange(id, "in-progress")}
          className={`px-7 cursor-pointer py-1 ${
            darkMode
              ? "text-amber-300 hover:bg-amber-800"
              : "text-amber-800 hover:bg-amber-300"
          }`}
        >
          in-progress
        </li>
      </Dropdown>
    </div>
  );
};

export default TaskStatus;
