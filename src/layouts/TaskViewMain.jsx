import { useEffect, useState } from "react";
import TaskList from "../components/TaskList";
import { LuPlus } from "react-icons/lu";
import { LuArrowDownUp } from "react-icons/lu";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../services/localStorage";

// Generate random ID for each task
const generateRandomId = () => {
  return Math.round(Math.random() * 1000) + 1;
};

// Main task view container
const TaskViewMain = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Get saved tasks from local storage
    const savedTasks = getFromLocalStorage("tasks");

    // Change date format from string to Date() object for using Date.getMonth() and getDate() functions
    if (savedTasks) {
      const parsedTasks = savedTasks.map((task) => ({
        ...task,
        date: new Date(task.date),
        selected: false,
      }));
      // Update tasks array
      setTasks(parsedTasks);
    }
  }, []);

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

  return (
    <div className="mt-5 mx-10 bg-gray-100 px-8 py-4 rounded-xl h-full">
      <div className="flex items-center w-full relative">
        <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>
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
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default TaskViewMain;
