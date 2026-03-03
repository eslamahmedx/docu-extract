import { UploadCloud } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import Card from "../../../components/common/Card";
import { uploadDocument, summarizeDocument } from "../../../api/documentApi";

interface UploadCardProps {
  setSummary: (summary: string | null) => void;
  setStage: (stage: "idle" | "uploading" | "summarizing" | "done") => void;
  setCurrentFile: (file: File | null) => void;
  stage: "idle" | "uploading" | "summarizing" | "done";
}

export default function UploadCard({ setSummary, setStage, stage, setCurrentFile }: UploadCardProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleBrowse = () => fileRef.current?.click();

  const handleUpload = async (file: File) => {
    try {
      setError(null);
      setStage("uploading");

      const uploadResp = await uploadDocument(file);

      const fileId = uploadResp?.filename;
      const maybeSummary = uploadResp?.summary_markdown;

      if (maybeSummary) {
        setSummary(maybeSummary);
        setStage("done");
        return;
      }

      if (!fileId) {
        throw new Error("Upload did not return fileId");
      }

      // Request summarization
      setStage("summarizing");
      const summarizeResp = await summarizeDocument(fileId);
      const returnedSummary = summarizeResp?.summary;
      if (!returnedSummary) throw new Error("No summary returned");
      setSummary(returnedSummary);
      setStage("done");
    } catch (err) {
      console.error(err);
      setError((err as Error)?.message || "An unknown error occurred");
      setStage("idle");
    }
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowed.includes(file.type)) {
      toast.error("Only PDF and DOCX allowed");
      return;
    }

    const maxBytes = 25 * 1024 * 1024;
    if (file.size > maxBytes) {
      toast.error("File too large. Max 25MB.");
      return;
    }

    setFileName(file.name);
    setCurrentFile(file);
    // Start upload + summarization immediately
    await handleUpload(file);
  };

  return (
    <Card title="Upload Documents" icon={<UploadCloud size={18} className="text-blue-600" />}>
      <div className="border border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center">
        <UploadCloud size={24} className="mx-auto text-blue-600 mb-4" />

        <p className="text-sm font-medium dark:text-white">Drag & drop files here</p>
        <p className="text-xs text-gray-500 mt-2 mb-5">Support for PDF, DOCX (max 25MB)</p>

        <button onClick={handleBrowse} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm transition">
          Browse Files
        </button>

        {fileName && <p className="text-xs text-green-600 mt-4">Selected: {fileName}</p>}

        {stage === "uploading" && <p className="text-xs text-gray-600 mt-2">Uploading…</p>}


        {error && <p className="text-xs text-red-600 mt-2">{error}</p>}

        <input type="file" ref={fileRef} onChange={handleFile} accept=".pdf,.docx" className="hidden" />
      </div>
    </Card>
  );
}