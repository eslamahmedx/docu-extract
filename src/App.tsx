import { useState } from "react";
import Sidebar from "./components/common/Sidebar";
import Dashboard from "./pages/dashboard/Dashboard";
import { Toaster } from "sonner";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [service, setService] = useState<"contract" | "invoice">("contract");

  return (
    <div className={darkMode ? "dark" : ""}>
      <Toaster richColors position="top-right" />
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