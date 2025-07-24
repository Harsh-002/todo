import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import { LuCheck, LuTrash2 } from "react-icons/lu";

const TaskHeader = ({
  handleSelectAll,
  selectAll,
  checkSelected,
  handleDeleteTasks,
}) => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div
      className={`flex w-full justify-between px-4 ${
        darkMode ? "text-gray-200" : "text-gray-800"
      }`}
    >
      <div className="font-bold md:text-lg sm:text-md text-sm lg:flex-5 flex-2 flex items-center">
        <div
          onClick={handleSelectAll}
          className="md:h-5 md:w-5 w-4 h-4 my-2 border md:rounded-md rounded-sm cursor-pointer flex items-center justify-center md:mr-5 mr-2"
        >
          {selectAll ? <LuCheck /> : ""}
        </div>
        Task
        <div className={`mx-5 ${!checkSelected() && "hidden"}`}>
          <LuTrash2
            onClick={handleDeleteTasks}
            className="text-red-500 cursor-pointer"
          />
        </div>
      </div>

      <div className="font-bold md:text-lg sm:text-md text-sm flex-1 text-center">
        Due Date
      </div>
      <div className="font-bold md:text-lg sm:text-md text-sm flex-1 text-center">
        Priority
      </div>
      <div className="font-bold md:text-lg sm:text-md text-sm flex-1 text-center">
        Status
      </div>
    </div>
  );
};

export default TaskHeader;
