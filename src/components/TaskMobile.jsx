import { useContext, useState } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import TaskTitle from "./TaskTitle";
import DatePicker from "./DatePicker";
import { TaskPriority } from "./TaskPriority";
import TaskStatus from "./TaskStatus";
import { LuGripVertical } from "react-icons/lu";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const TaskMobile = ({ task, activeId, index, handlers }) => {
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

  const [touchActive, setTouchActive] = useState(false);

  const formattedDate =
    monthOptions[date.getMonth()].short + " " + date.getDate();

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: transform ? CSS.Transform.toString(transform) : undefined,
        transition,
        touchAction: "pan-y",
      }}
      className={`
        ${touchActive && "backdrop-blur-md ring-2 ring-blue-500 z-10"}
        ${activeId === id && "z-10"}
        w-full mx-auto rounded-xl shadow-md  border-1 border-gray-400
        ${darkMode ? "text-gray-200" : "text-gray-800"}
        px-1 py-1 flex flex-col relative
        card-mobile flex-1 min-w-56 gap-2 scroll-auto
      `}
    >
      <div
        className="absolute right-1 top-2"
        onTouchStart={() => setTouchActive(true)}
        onTouchEnd={() => setTouchActive(false)}
      >
        <LuGripVertical
          style={{ touchAction: "none" }}
          {...attributes}
          {...listeners}
          size={18}
          className="text-gray-400 z-50 ring-0"
        />
      </div>

      {/* Top Row: Task Title */}
      <div className="pl-1 pr-4">
        <TaskTitle
          onTaskSelect={onTaskSelect}
          title={title}
          selected={selected}
          id={id}
          onTitleChange={onTitleChange}
          darkMode={darkMode}
          index={index}
        />
      </div>

      {/* Middle Row: Priority, Date, Status (stack vertically or grid in mobile cards) */}
      <div className="flex flex-col sm:flex-row w-full mt-2">
        <div className="flex">
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
          <DatePicker
            id={id}
            date={date}
            darkMode={darkMode}
            formattedDate={formattedDate}
            onDateChange={onDateChange}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskMobile;
