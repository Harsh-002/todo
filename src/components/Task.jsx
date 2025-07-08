import { LuCalendar } from "react-icons/lu";

const Task = ({ date, priority, status, title, id, onTitleChange }) => {
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

  const formattedDate =
    monthOptions[date.getMonth()].short + " " + date.getDate();

  return (
    <div className="flex w-full justify-between py-2 border-b border-b-gray-300">
      <div className="flex text-gray-700 flex-5">
        <input
          type="checkbox"
          name="task"
          id={`task-${id}`}
          className="self-start my-2"
        />
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
      <div className="text-gray-500 font-bold flex-1 flex items-center justify-center">
        <LuCalendar className="cursor-pointer text-lg" />
        <p className="pl-4">{formattedDate}</p>
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
