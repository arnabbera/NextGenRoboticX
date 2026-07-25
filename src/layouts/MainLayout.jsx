import { Outlet } from "react-router-dom";

import Sidebar from "../components/navigation/Sidebar";
import Topbar from "../components/navigation/Topbar";

export default function MainLayout() {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
        }}
      >
        <Topbar />

        <main
          style={{
            padding: "30px",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}