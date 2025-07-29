import { useContext, useRef, useState } from "react";
import TaskList from "../components/TaskList";
import { LuPlus } from "react-icons/lu";
import { LuArrowDownUp } from "react-icons/lu";
import { saveToLocalStorage } from "../services/localStorage";
import { DarkModeContext } from "../context/DarkModeContext";
import { TasksContext } from "../context/TasksContext";
import Dropdown from "../components/Dropdown";
import { generateRandomId } from "../utils/commonFunctions";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { useIsMobile } from "../hooks/useIsMobile";
import { sortOptionsData } from "../data/OptionsData";

// Main task view container
const TaskViewMain = ({ searchValue }) => {
  const [visible, setVisible] = useState(false);

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

  const ref = useRef();

  useOutsideClick([ref], () => setVisible(false));

  const sortOptions = sortOptionsData;

  // Function to sort tasks based on value (using chatGPT)
  const handleSort = (id, value) => {
    const updatedTasks = [...tasks];

    if (value === "low first") {
      const priorityOrder = { low: 1, mid: 2, high: 3 };
      updatedTasks.sort(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
      );
    } else if (value === "high first") {
      const priorityOrder = { high: 1, mid: 2, low: 3 };
      updatedTasks.sort(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
      );
    } else if (value === "farthest first") {
      updatedTasks.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (value === "closest first") {
      updatedTasks.sort((a, b) => new Date(a.date) - new Date(b.date)); // earliest first
    }

    setTasks(updatedTasks);
    saveToLocalStorage(updatedTasks);
  };

  const isMobile = useIsMobile();

  return (
    <div
      className={`mt-5 mx-2 md:mx-10 bg-gray-100 px-2 py-4 rounded-xl h-full ${
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
        <div
          onClick={() => setVisible(!visible)}
          className={`${
            darkMode ? "text-gray-300 bg-gray-500" : "text-sky-500 bg-gray-300"
          } absolute flex items-center text-sm gap-2 right-18 p-2 rounded-sm cursor-pointer hover:shadow`}
        >
          Sort by
          <LuArrowDownUp />
          <Dropdown
            ref={ref}
            visible={visible}
            onChange={handleSort}
            values={sortOptions}
          />
        </div>
        <div
          onClick={handleAddTask}
          className="absolute right-0 flex items-center text-sm gap-2 bg-sky-500 p-2 rounded-sm text-gray-100 cursor-pointer hover:shadow"
        >
          Add
          <LuPlus />
        </div>
      </div>
      <TaskList tasks={filteredTasks} isMobile={isMobile} />
    </div>
  );
};

export default TaskViewMain;
