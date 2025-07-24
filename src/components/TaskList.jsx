import Task from "./Task";
import Lottie from "lottie-react";
import empty from "../assets/lotties/empty.json";
import { saveToLocalStorage } from "../services/localStorage";
import { useContext, useEffect, useState } from "react";
import { TasksContext } from "../context/TasksContext";
import TaskHeader from "./TaskHeader";
import {
  updateDateChange,
  updateDeleteTasks,
  updatePriorityChange,
  updateSelectAll,
  updateStatusChange,
  updateTaskSelect,
  updateTitleChange,
} from "../utils/taskHandlers";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

const TaskList = ({ tasks }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [lastSelectedIndex, setLastSelectedIndex] = useState(null);
  const [activeId, setActiveId] = useState(null);

  const { setTasks } = useContext(TasksContext);

  // Drag and drop for mobile
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200, // a delay to prevent accidental scrolls while dragging
        tolerance: 5, // minimum move to activate drag
      },
    }),
    useSensor(KeyboardSensor)
  );

  // Function to update tasks state and in local storage
  const updateTasks = (updatedTasks) => {
    setTasks(updatedTasks);
    saveToLocalStorage(updatedTasks);
  };

  // Function to change title of task and saving it to local storage on every key stroke
  const handleTitleChange = (id, newTitle) => {
    const updatedTasks = updateTitleChange(tasks, id, newTitle);
    updateTasks(updatedTasks);
  };

  // Function to change date of task and adding to local storage
  const handleDateChange = (id, newDate) => {
    const updatedTasks = updateDateChange(tasks, id, newDate);
    updateTasks(updatedTasks);
  };

  // Function to select and unselect task
  const handleTaskSelect = (id, index, event) => {
    // If shift key is pressed select whole range
    const updatedTasks = updateTaskSelect(
      tasks,
      id,
      index,
      lastSelectedIndex,
      event
    );
    updateTasks(updatedTasks);
    setLastSelectedIndex(index);
  };

  // Function to select and unselect all tasks
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    const updatedTasks = updateSelectAll(tasks, newSelectAll);
    setSelectAll(newSelectAll);
    updateTasks(updatedTasks);
  };

  // Function to delete selected tasks
  const handleDeleteTasks = () => {
    const updatedTasks = updateDeleteTasks(tasks);
    updateTasks(updatedTasks);
  };

  // Function to check if any task is selected to show and hide buttons like delete
  const checkSelected = () => {
    return tasks.some((task) => task.selected);
  };

  // to check if every task is selected or not
  useEffect(() => {
    if (tasks.length > 0 && tasks.every((task) => task.selected)) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [tasks]);

  // Function to change priority
  const handlePriorityChange = (id, value) => {
    const updatedTasks = updatePriorityChange(tasks, id, value);

    updateTasks(updatedTasks);
  };

  // Function to change status
  const handleStatusChange = (id, value) => {
    const updatedTasks = updateStatusChange(tasks, id, value);

    updateTasks(updatedTasks);
  };

  // Rendering an empty animation
  if (tasks.length === 0) {
    return (
      <div className="h-1/4 w-full flex flex-col items-center justify-center">
        <Lottie animationData={empty} loop={true} />
        <div className="text-2xl font-bold text-gray-600">
          You don't have any tasks!
        </div>
      </div>
    );
  }

  // Drag and drop logic starts here
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    setActiveId(null);
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = tasks.findIndex((t) => t.id === active.id);
      const newIndex = tasks.findIndex((t) => t.id === over.id);
      setTasks(arrayMove(tasks, oldIndex, newIndex));
      saveToLocalStorage(arrayMove(tasks, oldIndex, newIndex));
    }
  };

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <div className="my-2 flex flex-col">
        <TaskHeader
          handleSelectAll={handleSelectAll}
          selectAll={selectAll}
          checkSelected={checkSelected}
          handleDeleteTasks={handleDeleteTasks}
        />
        <SortableContext items={tasks.map((t) => t.id)}>
          {tasks.map((task, index) => (
            <Task
              key={task.id}
              id={task.id}
              activeId={activeId}
              index={index}
              date={task.date}
              priority={task.priority}
              status={task.status}
              title={task.title}
              selected={task.selected}
              onTitleChange={handleTitleChange}
              onDateChange={handleDateChange}
              onTaskSelect={handleTaskSelect}
              onPriorityChange={handlePriorityChange}
              onStatusChange={handleStatusChange}
            />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
};

export default TaskList;
