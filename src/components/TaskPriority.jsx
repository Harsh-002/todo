import React, { useRef, useState } from "react";
import Dropdown from "./Dropdown";
import { useOutsideClick } from "../hooks/useOutsideClick";

export const TaskPriority = ({ priority, darkMode, onPriorityChange, id }) => {
  const [visible, setVisible] = useState(false);

  const priorityRef = useRef();
  const dropdownRef = useRef();

  useOutsideClick([priorityRef, dropdownRef], () => setVisible(false));

  const values = [
    {
      name: "low",
      textColor: "green-300",
      bgColor: "green-800",
    },
    {
      name: "mid",
      textColor: "amber-300",
      bgColor: "amber-800",
    },
    {
      name: "high",
      textColor: "red-300",
      bgColor: "red-800",
    },
  ];

  return (
    <div className={`flex-1 flex items-center justify-center relative`}>
      <p
        onClick={() => setVisible(!visible)}
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
        } md:px-4 px-2 py-1 mx-2 w-full text-center rounded-md cursor-pointer text-md md:text-lg sm:text-md text-sm`}
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
  );
};
