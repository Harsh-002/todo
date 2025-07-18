import { useRef, useState } from "react";
import { LuCalendar, LuCheck } from "react-icons/lu";
import Dropdown from "./Dropdown";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Task = ({
  date,
  priority,
  status,
  title,
  id,
  index,
  onTitleChange,
  onDateChange,
  selected,
  onTaskSelect,
  onPriorityChange,
  onStatusChange,
}) => {
  const monthOptions = [
    { name: "January", short: "Jan" },
    { name: "February", short: "Feb" },
    { name: "March", short: "Mar" },
    { name: "April", short: "Apr" },
    { name: "May", short: "May" },
    { name: "June", short: "Jun" },
    { name: "July", short: "Jul" },
    { name: "August", short: "Aug" },
    { name: "September", short: "Sep" },
    { name: "October", short: "Oct" },
    { name: "November", short: "Nov" },
    { name: "December", short: "Dec" },
  ];

  const inputRef = useRef();

  const priorityRef = useRef();

  const dropdownRef = useRef();

  const statusRef = useRef();

  const statusDropdownRef = useRef();

  const [visible, setVisible] = useState(false);

  const [statusVisible, setStatusVisible] = useState(false);

  // Function to close dropdown on clicking outside
  useOutsideClick([priorityRef, dropdownRef], () => setVisible(false));
  useOutsideClick([statusRef, statusDropdownRef], () =>
    setStatusVisible(false)
  );

  // Function to prevent text selection while selecting tasks;
  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  // Function to show date picker on clicking on date
  const showPicker = () => {
    if (inputRef.current?.showPicker) {
      inputRef.current.showPicker();
    } else {
      inputRef.current?.click();
    }
  };

  const formattedDate =
    monthOptions[date.getMonth()].short + " " + date.getDate();

  return (
    <div className="flex w-full justify-between py-2 border-b border-b-gray-300">
      <div className="flex items-center text-gray-700 lg:flex-5 flex-2">
        <div
          onMouseDown={(e) => handleMouseDown(e)}
          onClick={(e) => onTaskSelect(id, index, e)}
          className="md:h-5 md:w-5 w-4 h-4 border md:rounded-md rounded-sm cursor-pointer flex items-center justify-center"
        >
          {selected ? <LuCheck /> : ""}
        </div>
        <input
          type="text"
          name="title"
          id={`title-${id}`}
          value={title}
          onChange={(e) => onTitleChange(id, e.target.value)}
          placeholder="Click to add a task"
          className="px-2 md:ml-4 w-full text-wrap wrap-break-word outline-none text-md md:text-lg sm:text-md text-sm sm:text-md"
        />
      </div>
      <div
        onClick={showPicker}
        className="text-gray-500 font-bold flex-1 flex items-center justify-center cursor-pointer relative"
      >
        <LuCalendar
          className={`text-lg text-md md:text-lg sm:text-md ${
            date.getDate() < new Date().getDate() && "text-red-600"
          }`}
        />
        <p
          className={`md:pl-4 pl-1 text-md md:text-lg sm:text-md text-sm ${
            date.getDate() < new Date().getDate() && "text-red-600"
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
      <div className={`flex-1 flex items-center justify-center relative`}>
        <p
          onClick={() => setVisible(!visible)}
          ref={priorityRef}
          className={`${
            priority === "low"
              ? "bg-green-300 text-green-800"
              : priority === "mid"
              ? "bg-amber-300 text-amber-800"
              : "bg-red-300 text-red-800"
          } md:px-4 px-2 py-1 rounded-md cursor-pointer text-md md:text-lg sm:text-md text-sm`}
        >
          {priority}
        </p>
        <Dropdown ref={dropdownRef} visible={visible}>
          <li
            onClick={() => onPriorityChange(id, "low")}
            className="px-7 cursor-pointer text-green-800 hover:bg-green-300 py-1"
          >
            low
          </li>
          <li
            onClick={() => onPriorityChange(id, "mid")}
            className="px-7 cursor-pointer text-amber-800 hover:bg-amber-300 py-1"
          >
            mid
          </li>
          <li
            onClick={() => onPriorityChange(id, "high")}
            className="px-7 cursor-pointer text-red-800 hover:bg-red-300 py-1"
          >
            high
          </li>
        </Dropdown>
      </div>
      <div className="text-gray-700 flex-1 flex items-center justify-center relative">
        <p
          onClick={() => setStatusVisible(!statusVisible)}
          ref={statusRef}
          className={`${
            status === "todo"
              ? "bg-gray-300 text-gray-800"
              : status === "done"
              ? "bg-green-300 text-green-800"
              : "bg-yellow-300 text-yellow-800"
          } md:px-4 px-2 py-1 rounded-md  cursor-pointer text-md md:text-lg sm:text-md text-sm`}
        >
          {status}
        </p>
        <Dropdown ref={statusDropdownRef} visible={statusVisible}>
          <li
            onClick={() => onStatusChange(id, "done")}
            className="px-7 cursor-pointer text-green-800 hover:bg-green-300 py-1"
          >
            done
          </li>
          <li
            onClick={() => onStatusChange(id, "todo")}
            className="px-7 cursor-pointer text-gray-800 hover:bg-gray-300 py-1"
          >
            todo
          </li>
          <li
            onClick={() => onStatusChange(id, "in-progress")}
            className="px-7 cursor-pointer text-amber-800 hover:bg-amber-300 py-1"
          >
            in-progress
          </li>
        </Dropdown>
      </div>
    </div>
  );
};

export default Task;
