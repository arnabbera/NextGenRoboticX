import { Link, useOutletContext } from "react-router-dom";
import { HelpCircle, Moon, UserRound } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

export default function Settings() {
  const { darkMode, toggleDarkMode } = useOutletContext();
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="mt-2 text-slate-600">Manage your student portal preferences and account details.</p>
      </div>
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900"><Moon size={22} /> Appearance</h2>
        <div className="mt-5 flex items-center justify-between gap-5">
          <div><p className="font-medium text-slate-800">Dark mode</p><p className="text-sm text-slate-600">Remember this choice on this device.</p></div>
          <button type="button" role="switch" aria-checked={darkMode} onClick={toggleDarkMode} className="rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white">{darkMode ? "On" : "Off"}</button>
        </div>
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900"><UserRound size={22} /> Account</h2>
        <p className="mt-4 text-slate-600">Signed in as {user?.email}.</p>
        <Link to="/profile" className="mt-4 inline-block font-semibold text-blue-500 underline">Edit my profile</Link>
      </section>
      <Link to="/help" className="flex items-center gap-2 font-semibold text-blue-500 underline"><HelpCircle size={20} /> Get help</Link>
    </div>
  );
}
