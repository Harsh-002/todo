import { useContext } from "react";
import TaskList from "../components/TaskList";
import { LuPlus } from "react-icons/lu";
import { LuArrowDownUp } from "react-icons/lu";
import { saveToLocalStorage } from "../services/localStorage";
import { DarkModeContext } from "../context/DarkModeContext";
import { TasksContext } from "../context/TasksContext";

// Generate random ID for each task
const generateRandomId = () => {
  return Math.round(Math.random() * 100000) + 1;
};

// Main task view container
const TaskViewMain = ({ searchValue }) => {
  const { tasks, setTasks } = useContext(TasksContext);

  const { darkMode } = useContext(DarkModeContext);

  // Function to add new task with default values
  const handleAddTask = () => {
    const newTask = {
      id: generateRandomId(),
      title: "",
      status: "todo",
      priority: "low",
      date: new Date(),
      selected: false,
    };

    const updatedTasks = [...tasks, newTask];

    setTasks(updatedTasks);

    // Saving tasks to local storage on adding every task
    saveToLocalStorage(updatedTasks);
  };

  // Function to filter tasks based on search Value
  const filteredTasks = tasks.filter((task) => {
    let title = task.title;

    const words = title.split(" ");

    title = words.join("");

    return title.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <div
      className={`mt-5 mx-2 md:mx-10 bg-gray-100 md:px-8 px-2 py-4 rounded-xl h-full ${
        darkMode && "bg-gray-700"
      }`}
    >
      <div className="flex items-center w-full relative">
        <h1
          className={`md:text-3xl text-lg font-bold ${
            darkMode && "text-gray-200"
          }`}
        >
          My Tasks
        </h1>
        <div className="absolute right-10 text-sky-500 p-2 rounded-sm bg-gray-300 cursor-pointer hover:shadow">
          <LuArrowDownUp />
        </div>
        <div
          onClick={handleAddTask}
          className="absolute right-0 bg-sky-500 p-2 rounded-sm text-gray-100 cursor-pointer hover:shadow"
        >
          <LuPlus />
        </div>
      </div>
      <TaskList tasks={filteredTasks} />
    </div>
  );
};

export default TaskViewMain;
