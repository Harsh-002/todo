import React, { useEffect, useState } from "react";
import { TasksContext } from "./TasksContext";
import { getFromLocalStorage } from "../services/localStorage";

const TasksContextProvider = ({ children }) => {
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

  console.log(tasks);

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  );
};

export default TasksContextProvider;
