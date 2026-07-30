import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}
      <aside className="hidden lg:flex lg:w-72 lg:flex-shrink-0">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col">

        {/* Sticky Top Navigation */}
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-sm">
          <Topbar />
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">

          <div className="mx-auto w-full max-w-screen-2xl p-6 lg:p-8">
            {children}
          </div>

        </main>

      </div>

    </div>
  );
}