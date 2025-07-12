import { useRef } from "react";
import { LuCalendar, LuCheck } from "react-icons/lu";

const Task = ({
  date,
  priority,
  status,
  title,
  id,
  onTitleChange,
  onDateChange,
  selected,
  onTaskSelect,
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
      <div className="flex text-gray-700 flex-5">
        <div
          onClick={() => onTaskSelect(id)}
          className="h-5 w-5 my-2 border rounded-md cursor-pointer flex items-center justify-center"
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
          className="px-1 ml-4 w-full outline-none"
        />
      </div>
      <div
        onClick={showPicker}
        className="text-gray-500 font-bold flex-1 flex items-center justify-center cursor-pointer relative"
      >
        <LuCalendar className="text-lg" />
        <p className="pl-4">{formattedDate}</p>
        <input
          ref={inputRef}
          id={id}
          name="date"
          type="date"
          className="opacity-0 absolute bottom-0 left-0 w-0 h-0"
          onChange={(e) => onDateChange(id, e.target.valueAsDate)}
        />
      </div>
      <div className={`flex-1 flex items-center justify-center`}>
        <p
          className={`${
            priority === "low"
              ? "bg-green-300 text-green-800"
              : priority === "mid"
              ? "bg-amber-300 text-amber-800"
              : "bg-red-300 text-red-800"
          } px-4 py-1 rounded-md cursor-pointer`}
        >
          {priority}
        </p>
      </div>
      <div className="text-gray-700 flex-1 flex items-center justify-center">
        <p
          className={`${
            status === "todo"
              ? "bg-gray-300 text-gray-800"
              : status === "done"
              ? "bg-green-300 text-green-800"
              : "bg-yellow-300 text-yellow-800"
          } px-4 py-1 rounded-md  cursor-pointer`}
        >
          {status}
        </p>
      </div>
    </div>
  );
};

export default Task;
