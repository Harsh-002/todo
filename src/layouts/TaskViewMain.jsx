import { useState } from "react";
import TaskList from "../components/TaskList";
import { LuPlus } from "react-icons/lu";
import { LuArrowDownUp } from "react-icons/lu";

const generateRandomId = () => {
  return Math.round(Math.random() * 1000) + 1;
};

const TaskViewMain = () => {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    const newTask = {
      id: generateRandomId(),
      title: "",
      status: "todo",
      priority: "low",
      date: new Date(),
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <div className="mt-5 mx-10 bg-gray-100 px-8 py-4 rounded-xl h-full">
      <div className="flex items-center w-full relative">
        <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>
        <div className="absolute right-10 text-sky-500 p-2 rounded-sm font-bold bg-gray-300 cursor-pointer hover:shadow">
          <LuArrowDownUp />
        </div>
        <div
          onClick={handleAddTask}
          className="absolute right-0 bg-sky-500 p-2 rounded-sm font-bold text-gray-100 cursor-pointer hover:shadow"
        >
          <LuPlus />
        </div>
      </div>
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default TaskViewMain;
