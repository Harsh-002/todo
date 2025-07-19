import { useContext } from "react";
import Dropdown from "./Dropdown";
import { DarkModeContext } from "../context/DarkModeContext";
import TaskTitle from "./TaskTitle";
import DatePicker from "./DatePicker";
import { TaskPriority } from "./TaskPriority";
import TaskStatus from "./TaskStatus";

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

  const { darkMode } = useContext(DarkModeContext);

  const formattedDate =
    monthOptions[date.getMonth()].short + " " + date.getDate();

  return (
    <div
      className={`flex w-full justify-between py-2 border-b border-b-gray-300 ${
        darkMode ? "text-gray-200" : "text-gray-800"
      }`}
    >
      <TaskTitle
        onTaskSelect={onTaskSelect}
        title={title}
        selected={selected}
        id={id}
        onTitleChange={onTitleChange}
        darkMode={darkMode}
        index={index}
      />
      <DatePicker
        id={id}
        date={date}
        darkMode={darkMode}
        formattedDate={formattedDate}
        onDateChange={onDateChange}
      />
      <TaskPriority
        id={id}
        priority={priority}
        darkMode={darkMode}
        onPriorityChange={onPriorityChange}
      />
      <TaskStatus
        id={id}
        onStatusChange={onStatusChange}
        status={status}
        darkMode={darkMode}
      />
    </div>
  );
};

export default Task;
