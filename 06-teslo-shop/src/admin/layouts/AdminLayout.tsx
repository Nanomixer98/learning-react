import { AdminHeader } from "@/admin/components/AdminHeader";
import { AdminSidebar } from "@/admin/components/AdminSidebar";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";

export const AdminLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return localStorage.getItem("collapsed") === "true";
  });

  const toggleCollapsed = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("collapsed", String(sidebarCollapsed));
  }, [sidebarCollapsed]);

  return (
    <div className="bg-gray-50 flex h-screen overflow-hidden">
      <AdminSidebar isCollapsed={sidebarCollapsed} onToggle={toggleCollapsed} />

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
