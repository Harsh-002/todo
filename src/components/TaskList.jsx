import Task from "./Task";
import Lottie from "lottie-react";
import empty from "../assets/lotties/empty.json";
import { saveToLocalStorage } from "../services/localStorage";
import { LuTrash2 } from "react-icons/lu";

const TaskList = ({ tasks, setTasks }) => {
  const rows = [];

  // Function to change title of task and saving it to local storage on every key stroke
  const handleTitleChange = (id, newTitle) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, title: newTitle } : task
    );
    setTasks(updatedTasks);
    saveToLocalStorage(updatedTasks);
  };

  // Function to change date of task and adding to local storage
  const handleDateChange = (id, newDate) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, date: newDate } : task
    );
    setTasks(updatedTasks);
    saveToLocalStorage(updatedTasks);
  };

  // Function to select and unselect task
  const handleTaskSelect = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, selected: !task.selected } : task
    );
    setTasks(updatedTasks);
    saveToLocalStorage(updatedTasks);
  };

  // Function to delete selected tasks
  const handleDeleteTasks = () => {
    const updatedTasks = tasks.filter((task) => !task.selected);
    setTasks(updatedTasks);
    saveToLocalStorage(updatedTasks);
  };

  // Function to check if any task is selected to show and hide buttons like delete
  const checkSelected = () => {
    console.log("Function check selected");
    return tasks.some((task) => task.selected);
  };

  // Rendering all tasks if tasks are not null else return an empty animation
  if (tasks.length > 0) {
    tasks.map((task) => {
      rows.push(
        <Task
          key={task.id}
          id={task.id}
          date={task.date}
          priority={task.priority}
          status={task.status}
          title={task.title}
          selected={task.selected}
          onTitleChange={handleTitleChange}
          onDateChange={handleDateChange}
          onTaskSelect={handleTaskSelect}
        />
      );
    });
  } else {
    return (
      <div className="h-1/4 w-full flex flex-col items-center justify-center">
        <Lottie animationData={empty} loop={true} />
        <div className="text-2xl font-bold text-gray-600">
          You don't have any tasks!
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="my-2 flex flex-col">
        <div className="flex w-full justify-between">
          <div className="font-bold text-lg text-gray-500 flex-5 flex items-center">
            Task
            <div className={`mx-5 ${!checkSelected() && "hidden"}`}>
              <LuTrash2
                onClick={handleDeleteTasks}
                className="text-red-500 cursor-pointer"
              />
            </div>
          </div>

          <div className="font-bold text-lg text-gray-500 flex-1 text-center">
            Due Date
          </div>
          <div className="font-bold text-lg text-gray-500 flex-1 text-center">
            Priority
          </div>
          <div className="font-bold text-lg text-gray-500 flex-1 text-center">
            Status
          </div>
        </div>
        {rows}
      </div>
    </>
  );
};

export default TaskList;
