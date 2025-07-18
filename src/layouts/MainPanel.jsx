import { useContext, useEffect, useState } from "react";
import MenuBar from "../components/MenuBar";
import TaskViewMain from "./TaskViewMain";
import { DarkModeContext } from "../context/DarkModeContext";
import { getFromLocalStorage } from "../services/localStorage";

const MainPanel = () => {
  const [searchValue, setSearchValue] = useState("");
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    setDarkMode(getFromLocalStorage("darkMode"));
  }, [setDarkMode]);

  return (
    <>
      <MenuBar searchValue={searchValue} setSearchValue={setSearchValue} />
      <TaskViewMain searchValue={searchValue} />
    </>
  );
};

export default MainPanel;
