import { RefreshCcw } from "lucide-react";
import Card from "./ui/Card";

export default function QueueStatus() {
  return (
    <Card
      title="Queue Status"
      icon={<RefreshCcw size={18} className="text-blue-600" />}
    >
      <div className="py-8 text-center text-sm text-gray-400 dark:text-gray-500">
        No documents in processing queue
      </div>
    </Card>
  );
}