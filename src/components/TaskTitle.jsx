const TaskTitle = ({
  onTaskSelect,
  selected,
  title,
  id,
  onTitleChange,
  darkMode,
  index,
}) => {
  // Function to prevent text selection while selecting tasks;
  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex items-center  lg:flex-5 flex-2">
      <div
        onMouseDown={(e) => handleMouseDown(e)}
        onClick={(e) => onTaskSelect(id, index, e)}
        className="md:h-5 md:w-5 w-4 h-4 border md:rounded-md rounded-sm cursor-pointer flex items-center justify-center"
      >
        {selected ? <LuCheck /> : ""}
      </div>
      <input
        type="text"
        name="title"
        id={`title-${id}`}
        value={title}
        onChange={(e) => onTitleChange(id, e.target.value)}
        placeholder="Click to add a task"
        className={`px-2 md:ml-4 w-full text-wrap wrap-break-word outline-none text-md md:text-lg sm:text-md text-sm sm:text-md ${
          darkMode ? "placeholder:text-gray-400" : "placeholder:text-gray-500"
        }`}
      />
    </div>
  );
};

export default TaskTitle;
