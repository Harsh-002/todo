import Task from "./Task";
import Lottie from "lottie-react";
import empty from "../assets/lotties/empty.json";

const TaskList = ({ tasks, setTasks }) => {
  const rows = [];

  const handleTitleChange = (id, newTitle) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    );
  };

  const handleDateChange = (id, newDate) => {
    console.log(id, tasks);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, date: newDate } : task
      )
    );
  };

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
          onTitleChange={handleTitleChange}
          onDateChange={handleDateChange}
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
    <div className="my-2 flex flex-col">
      <div className="flex w-full justify-between">
        <div className="font-bold text-lg text-gray-500 flex-5">Task</div>
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
  );
};

export default TaskList;
