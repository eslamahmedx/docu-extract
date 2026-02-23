import { UploadCloud } from "lucide-react";
import { useRef, useState } from "react";
import Card from "./ui/Card";

export default function UploadCard() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleBrowse = () => fileRef.current?.click();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowed.includes(file.type)) {
      alert("Only PDF and DOCX allowed");
      return;
    }

    setFileName(file.name);
  };

  return (
    <Card
      title="Upload Documents"
      icon={<UploadCloud size={18} className="text-blue-600" />}
    >
      <div className="border border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center">
        
        <UploadCloud size={24} className="mx-auto text-blue-600 mb-4" />

        <p className="text-sm font-medium dark:text-white">
          Drag & drop files here
        </p>

        <p className="text-xs text-gray-500 mt-2 mb-5">
          Support for PDF, DOCX (max 25MB)
        </p>

        <button
          onClick={handleBrowse}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm transition"
        >
          Browse Files
        </button>

        {fileName && (
          <p className="text-xs text-green-600 mt-4">
            Selected: {fileName}
          </p>
        )}

        <input
          type="file"
          ref={fileRef}
          onChange={handleFile}
          accept=".pdf,.docx"
          className="hidden"
        />
      </div>
    </Card>
  );
}