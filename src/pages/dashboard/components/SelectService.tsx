import { Layers, FileText, Receipt } from "lucide-react";
import Card from "../../../components/common/Card";

interface Props {
  service: "contract" | "invoice";
  setService: (value: "contract" | "invoice") => void;
}

export default function SelectService({ service, setService }: Props) {
  return (
    <Card
      title="Select Service"
      icon={<Layers size={18} className="text-blue-600" />}
    >
      <div className="grid grid-cols-2 gap-6">

        <div
          onClick={() => setService("contract")}
          className={`p-7 rounded-xl border cursor-pointer transition
    ${service === "contract"
              ? "border-blue-600 bg-blue-50 dark:bg-gray-700"
              : "border-gray-200 dark:border-gray-600 hover:border-gray-300"
            }`}
        >
          <FileText size={22} className="mb-5 text-blue-600" />
          <p className="text-base font-semibold dark:text-white leading-tight">
            Contract <br />
            Summarization
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Condense legal documents
          </p>
        </div>

        <div
          onClick={() => setService("invoice")}
          className={`p-7 rounded-xl border cursor-pointer transition
    ${service === "invoice"
              ? "border-blue-600 bg-blue-50 dark:bg-gray-700"
              : "border-gray-200 dark:border-gray-600 hover:border-gray-300"
            }`}
        >
          <Receipt size={22} className="mb-5 text-gray-600" />
          <p className="text-base font-semibold dark:text-white leading-tight">
            Invoice <br />
            Extraction
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Extract financial data
          </p>
        </div>

      </div>


    </Card>
  );
}