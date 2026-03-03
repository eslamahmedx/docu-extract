import { FileSearch, Zap, ShieldCheck } from "lucide-react";
import { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import { extractSheetData } from "../../../api/documentApi";


interface ExtractedDataProps {
  summary: string | null;
  stage: "idle" | "uploading" | "summarizing" | "done";
  currentFile: File | null;
}

export default function ExtractedData({ summary, stage, currentFile }: ExtractedDataProps) {
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileNamePreview, setFileNamePreview] = useState<string | null>(null);

  const handleBrowse = () => fileRef.current?.click();



  const handleExportClick = () => {
    if (selectedFiles.length > 0) {
      handleExtractUpload(selectedFiles);
    } else if (currentFile && stage === "done") {
      handleExtractUpload([currentFile]);
    } else if (currentFile && stage !== "done") {
      toast.error("Please wait for summarization to complete first.");
    } else {
      handleBrowse();
    }
  };

  const handleExtractUpload = async (filesToUpload: File[]) => {
    if (filesToUpload.length === 0) {
      toast.error("No files selected to export");
      return;
    }

    try {
      setLoading(true);

      const response = await extractSheetData(filesToUpload);

      // Create a blob URL and trigger download
      const blob = new Blob([response.data], {
        type: response.contentType || 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      // Try to extract filename from content-disposition header if available
      let filename = "extracted-data.xlsx";
      const contentDisposition = response.contentDisposition;
      if (contentDisposition && contentDisposition.includes('filename=')) {
        const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDisposition);
        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, '');
        }
      }

      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);

      toast.success("Extraction successful!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to extract data");
    } finally {
      setLoading(false);
    }
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length === 0) return;

    const allowedTypes = ["application/pdf"];
    const invalid = files.find((f) => !allowedTypes.includes(f.type));
    if (invalid) {
      toast.error("Only PDF files are allowed");
      return;
    }

    if (files.length > 3) {
      toast.error("You can upload up to 3 PDF files");
      files.splice(3);
    }

    const chosenFiles = files.slice(0, 3);
    setSelectedFiles(chosenFiles);
    setFileNamePreview(chosenFiles.map((f) => f.name).join(", "));

    // Auto export it immediately after selection
    await handleExtractUpload(chosenFiles);
  };



  return (
    <div className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 flex flex-col transition">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <FileSearch size={20} className="text-blue-600" />
          <button
            onClick={handleBrowse}
            className="text-base font-semibold dark:text-white"
          >
            Extracted Data
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportClick}
            className="bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm transition"
            disabled={loading}
          >
            {loading ? "Exporting..." : "Export PDF"}
          </button>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileRef}
        type="file"
        accept="application/pdf"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />



      {stage === "summarizing" && <p className="text-xs text-gray-600 mt-2">Summarizing…</p>}
      {stage === "done" && summary && (
        <div className="mt-4 text-left">
          <h4 className="text-sm font-semibold mb-2">Summary</h4>
          <div className="text-xs text-gray-700 dark:text-gray-200 whitespace-pre-wrap prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown>{summary}</ReactMarkdown>
          </div>
        </div>
      )}
      {/* Content */}
      {stage === "idle" && !summary ? (
        <div className="flex-1 flex flex-col justify-center items-center text-center text-gray-500 dark:text-gray-400">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
            <FileSearch size={24} />
          </div>

          <h3 className="text-lg font-semibold dark:text-white mb-3">Ready for insights?</h3>

          <p className="text-sm max-w-xs mb-6">
            Upload 1–3 PDF contracts to extract structured data and generate an Excel file.
          </p>

          <div className="mb-6">
            <strong className="block text-sm dark:text-white">Selected</strong>
            <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
              {fileNamePreview || (currentFile ? currentFile.name : "No files selected")}
            </div>
          </div>

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
      ) : null}
    </div>
  );
}