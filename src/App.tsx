import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [service, setService] = useState<"contract" | "invoice">("contract");

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="h-screen flex bg-gray-100 dark:bg-gray-900 transition-colors">
        <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

        <div className="flex-1 flex justify-center px-8 py-8 gap-8 overflow-auto">
          <Dashboard service={service} setService={setService} />
        </div>
      </div>
    </div>
  );
}

export default App;