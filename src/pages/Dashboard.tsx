import SelectService from "../components/SelectService";
import UploadCard from "../components/UploadCard";
import QueueStatus from "../components/QueueStatus";
import ExtractedData from "../components/ExtractedData";

interface Props {
  service: "contract" | "invoice";
  setService: (value: "contract" | "invoice") => void;
}

export default function Dashboard({ service, setService }: Props) {
  return (
    <div className="max-w-[1200px] mx-auto py-12 px-4">
      
      {/* Header Section */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        
        <div>
          <h1 className="text-2xl font-semibold dark:text-white">
            Document Processing
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Extract insights and summarize legal documents instantly.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#64748B] sm:mt-3">
  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
  System Online
</div>

      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-12 items-stretch">
       
        <div className="w-full lg:w-[620px] flex flex-col gap-10">
          <SelectService service={service} setService={setService} />
          <UploadCard />
          <QueueStatus />
        </div>

        <div className="flex-1 max-w-full lg:max-w-[380px] flex">
          <ExtractedData />
        </div>

      </div>
    </div>
  );
}