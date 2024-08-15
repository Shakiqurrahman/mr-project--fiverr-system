import Divider from "./Divider";

function SidebarProfileStatus() {
  return (
    <div className="p-2 bg-[#F2F9FF] border border-primary rounded-lg">
      <h1 className="font-semibold">Mahfujurrahm535</h1>
      <Divider className="h-px w-full bg-[#1b8cdc] my-2" />
      <p className="text-sm">Avg. Response Time</p>
      <span className="font-semibold text-lg mb-3 block">1 Hour</span>
      <p className="text-sm">Avg. Rating</p>
      <span className="font-semibold text-lg mb-3 block">5 Stars.</span>
      <p className="text-sm">On-Time Delivery</p>
      <span className="font-semibold text-lg mb-3 block">100%</span>
      <p className="text-sm">Last Project Completed</p>
      <span className="font-semibold text-lg mb-3 block">3 Hours Ago</span>
      <p className="text-sm">Active Projects</p>
      <span className="font-semibold text-lg block">7</span>
    </div>
  );
}

export default SidebarProfileStatus;
