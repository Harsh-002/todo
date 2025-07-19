import DarkModeContextProvider from "./context/DarkModeContextProvider";
import TasksContextProvider from "./context/TasksContextProvider";
import MainPanel from "./layouts/MainPanel";

function App() {
  return (
    <DarkModeContextProvider>
      <TasksContextProvider>
        <MainPanel />
      </TasksContextProvider>
    </DarkModeContextProvider>
  );
}

export default App;
