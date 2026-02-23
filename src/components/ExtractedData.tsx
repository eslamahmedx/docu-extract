import { FileSearch, Zap, ShieldCheck } from "lucide-react";

export default function ExtractedData() {
  return (
    <div className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 flex flex-col transition">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <FileSearch size={20} className="text-blue-600" />
          <h2 className="text-base font-semibold dark:text-white">
            Extracted Data
          </h2>
        </div>

        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition">
          Export PDF
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center items-center text-center text-gray-500 dark:text-gray-400">
        
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
          <FileSearch size={24} />
        </div>

        <h3 className="text-lg font-semibold dark:text-white mb-3">
          Ready for insights?
        </h3>

        <p className="text-sm max-w-xs mb-10">
          Upload a document to automatically extract structured data,
          identify key clauses, and generate summaries using AI.
        </p>

        <div className="space-y-4 w-full">
          <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-sm">
            <Zap size={16} className="text-green-500" />
            95% faster than manual review
          </div>

          <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-sm">
            <ShieldCheck size={16} className="text-blue-500" />
            High-accuracy entity recognition
          </div>
        </div>

      </div>
    </div>
  );
}