import { Outlet } from "react-router-dom";
import Topbar from "../components/layout/Topbar";
import AdminSidebar from "../features/admin/components/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="hidden lg:flex lg:w-72 lg:flex-shrink-0"><AdminSidebar /></aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-sm"><Topbar /></header>
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-screen-2xl p-6 lg:p-8"><Outlet /></div>
        </main>
      </div>
    </div>
  );
}
