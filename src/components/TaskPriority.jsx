import React, { useRef, useState } from "react";
import Dropdown from "./Dropdown";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { priorityOptions } from "../data/OptionsData";

export const TaskPriority = ({ priority, darkMode, onPriorityChange, id }) => {
  const [visible, setVisible] = useState(false);

  const priorityRef = useRef();
  const dropdownRef = useRef();

  useOutsideClick([priorityRef, dropdownRef], () => setVisible(false));

  const values = priorityOptions;

  return (
    <div
      onClick={() => setVisible(!visible)}
      className={`flex-1 flex items-center justify-center`}
    >
      <div className="relative w-5/6">
        <p
          ref={priorityRef}
          className={`${
            priority === "low"
              ? darkMode
                ? "bg-green-800 text-green-300"
                : "bg-green-300 text-green-800"
              : priority === "mid"
              ? darkMode
                ? "bg-amber-800 text-amber-300"
                : "bg-amber-300 text-amber-800"
              : darkMode
              ? "bg-red-800 text-red-300"
              : "bg-red-300 text-red-800"
          } md:px-4 px-0 py-1 mx-0 w-full text-center rounded-md cursor-pointer text-md md:text-lg sm:text-md text-sm relative`}
        >
          {priority}
        </p>
        <Dropdown
          ref={dropdownRef}
          visible={visible}
          values={values}
          id={id}
          onChange={onPriorityChange}
        />
      </div>
    </div>
  );
};
