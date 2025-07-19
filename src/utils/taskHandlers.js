// Function to change title of task and saving it to local storage on every key stroke
export const updateTitleChange = (tasks, id, newTitle) => {
  return tasks.map((task) =>
    task.id === id ? { ...task, title: newTitle } : task
  );
};

// Function to change date of task and adding to local storage
export const updateDateChange = (tasks, id, newDate) => {
  return tasks.map((task) =>
    task.id === id ? { ...task, date: newDate } : task
  );
};

// Function to select and unselect task
export const updateTaskSelect = (
  tasks,
  id,
  index,
  lastSelectedIndex,
  event
) => {
  // If shift key is pressed select whole range
  if (event.nativeEvent.shiftKey && lastSelectedIndex !== null) {
    const [start, end] = [lastSelectedIndex, index].sort((a, b) => a - b);

    const isSelected = !tasks[index].selected;

    return tasks.map((task, i) =>
      i >= start && i <= end ? { ...task, selected: isSelected } : task
    );
  } else {
    return tasks.map((task) =>
      task.id === id ? { ...task, selected: !task.selected } : task
    );
  }
};

// Function to select and unselect all tasks
export const updateSelectAll = (tasks, newSelectAll) => {
  return tasks.map((task) => ({
    ...task,
    selected: newSelectAll,
  }));
};

// Function to delete selected tasks
export const updateDeleteTasks = (tasks) => {
  return tasks.filter((task) => !task.selected);
};

// Function to change priority
export const updatePriorityChange = (tasks, id, value) => {
  return tasks.map((task) =>
    task.id === id ? { ...task, priority: value } : task
  );
};

// Function to change status
export const updateStatusChange = (tasks, id, value) => {
  return tasks.map((task) =>
    task.id === id ? { ...task, status: value } : task
  );
};
