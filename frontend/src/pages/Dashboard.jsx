import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-4 bg-gray-100 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
