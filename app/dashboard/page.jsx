import MainLayout from "@/components/layout/MainLayout";

export default function Dashboard() {
  return (
    <MainLayout>
      <h2 className="text-3xl font-bold mb-8">Dashboard</h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-[#181818] p-6 rounded-xl border border-neutral-800">
          <p className="text-neutral-400 text-sm">Leads Today</p>
          <h1 className="text-3xl font-bold mt-2">42</h1>
        </div>
        <div className="bg-[#181818] p-6 rounded-xl border border-neutral-800">
          <p className="text-neutral-400 text-sm">Messages Sent</p>
          <h1 className="text-3xl font-bold mt-2">312</h1>
        </div>
        <div className="bg-[#181818] p-6 rounded-xl border border-neutral-800">
          <p className="text-neutral-400 text-sm">Appointments</p>
          <h1 className="text-3xl font-bold mt-2">18</h1>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-[#181818] p-8 rounded-xl border border-neutral-800 h-[300px] flex items-center justify-center">
        <p className="text-neutral-500">[ Insert Chart Component ]</p>
      </div>
    </MainLayout>
  );
}
