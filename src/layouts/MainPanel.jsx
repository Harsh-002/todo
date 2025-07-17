import { useState } from "react";
import MenuBar from "../components/MenuBar";
import TaskViewMain from "./TaskViewMain";

const MainPanel = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div>
      <MenuBar searchValue={searchValue} setSearchValue={setSearchValue} />
      <TaskViewMain searchValue={searchValue} />
    </div>
  );
};

export default MainPanel;
