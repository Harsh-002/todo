import DarkModeContextProvider from "./context/DarkModeContextProvider";
import MainPanel from "./layouts/MainPanel";

function App() {
  return (
    <DarkModeContextProvider>
      <MainPanel />
    </DarkModeContextProvider>
  );
}

export default App;
