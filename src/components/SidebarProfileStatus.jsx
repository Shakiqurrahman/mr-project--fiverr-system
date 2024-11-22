import { useGetMahfujurDetailsQuery } from "../Redux/api/dashboardApiSlice";
import Divider from "./Divider";

function SidebarProfileStatus() {
  const { data } = useGetMahfujurDetailsQuery();
  return (
    <div className="rounded-lg border border-primary bg-[#F2F9FF] p-2">
      <h1 className="font-semibold">Mahfujurrahm535</h1>
      <Divider className="my-2 h-px w-full bg-[#1b8cdc!important]" />
      <p className="text-sm">Avg. Response Time</p>
      <span className="mb-3 block text-lg font-semibold">
        {data?.Avg_Respons}
      </span>
      <p className="text-sm">Avg. Rating</p>
      <span className="mb-3 block text-lg font-semibold">
        {data?.Avg_Rating?.toFixed(1)}
      </span>
      <p className="text-sm">On-Time Delivery</p>
      <span className="mb-3 block text-lg font-semibold">100%</span>
      <p className="text-sm">Last Project Completed</p>
      <span className="mb-3 block text-lg font-semibold">
        {data?.LastProjectCompleted?.date}
      </span>
      <p className="text-sm">Active Projects</p>
      <span className="block text-lg font-semibold">
        {data?.Active_Projects}
      </span>
    </div>
  );
}

export default SidebarProfileStatus;
