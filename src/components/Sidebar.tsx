import {
  LayoutDashboard,
  History,
  Settings,
  Moon,
  Sparkles
} from "lucide-react";

interface Props {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export default function Sidebar({ darkMode, setDarkMode }: Props) {
  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col justify-between p-6 transition-colors">
      <div>
        <div className="flex items-center gap-3 mb-10">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
            <Sparkles size={18} className="text-white" />
          </div>
          <span className="font-semibold text-lg dark:text-white">
            DocuExtract
          </span>
        </div>

        <nav className="space-y-2">
          <div className="flex items-center gap-3 bg-blue-50 dark:bg-gray-700 text-blue-600 px-4 py-2 rounded-lg font-medium cursor-pointer">
            <LayoutDashboard size={18} />
            Dashboard
          </div>

          <div className="flex items-center gap-3 text-gray-500 dark:text-gray-300 px-4 py-2">
            <History size={18} />
            History
          </div>

          <div className="flex items-center gap-3 text-gray-500 dark:text-gray-300 px-4 py-2">
            <Settings size={18} />
            Settings
          </div>
        </nav>
      </div>

      <div
        onClick={() => setDarkMode(!darkMode)}
        className="flex items-center gap-3 text-gray-500 dark:text-gray-300 px-4 py-2 cursor-pointer"
      >
        <Moon size={18} />
        Appearance
      </div>
    </div>
  );
}