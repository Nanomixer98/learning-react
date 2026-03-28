import { AdminHeader } from "@/admin/components/AdminHeader";
import { AdminSidebar } from "@/admin/components/AdminSidebar";
import { useState } from "react";
import { Outlet } from "react-router";

export const AdminLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="bg-gray-50 flex h-screen overflow-hidden">
      <AdminSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />

        <main className="flex-1 p-6 overflow-y-auto scrollbar-hide">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
