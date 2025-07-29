import { useContext, useState } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import TaskTitle from "./TaskTitle";
import DatePicker from "./DatePicker";
import { TaskPriority } from "./TaskPriority";
import TaskStatus from "./TaskStatus";
import { LuGripVertical } from "react-icons/lu";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Task = ({ task, activeId, index, handlers }) => {
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

  const { id, date, priority, status, title, selected } = task;

  const {
    onTitleChange,
    onDateChange,
    onTaskSelect,
    onPriorityChange,
    onStatusChange,
  } = handlers;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const { darkMode } = useContext(DarkModeContext);

  const [mouseOver, setMouseOver] = useState(false);

  const formattedDate =
    monthOptions[date.getMonth()].short + " " + date.getDate();

  return (
    <div
      ref={setNodeRef}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      style={{
        touchAction: "none",
        transform: transform ? CSS.Transform.toString(transform) : undefined,
        transition,
      }}
      className={`${
        activeId === id && "backdrop-blur-xl brightness-115 z-10"
      } flex relative w-full justify-between py-2 border-b border-b-gray-300 px-4 ${
        darkMode ? "text-gray-200" : "text-gray-800"
      }`}
    >
      <LuGripVertical
        {...attributes}
        {...listeners}
        onMouseDown={(e) => e.preventDefault()}
        className={`grip-handle absolute -left-1 top-1/2 transform -translate-y-1/2 cursor-pointer ${
          !mouseOver && "lg:hidden"
        }`}
      />
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
