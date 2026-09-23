import { Link } from "react-router-dom";
import { HelpCircle, Mail, Phone } from "lucide-react";

export default function Help() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="flex items-center gap-3 text-3xl font-bold text-slate-900"><HelpCircle /> Help</h1>
        <p className="mt-2 text-slate-600">Get assistance with enrollment, course access and your student profile.</p>
      </div>
      <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div><h2 className="font-semibold text-slate-900">I paid but cannot open my course</h2><p className="mt-2 text-slate-600">Sign in using the same verified email address you entered at checkout. Then check your <Link to="/courses/enrolled" className="font-semibold text-blue-500 underline">enrolled courses</Link>.</p></div>
        <div><h2 className="font-semibold text-slate-900">I cannot verify my email</h2><p className="mt-2 text-slate-600">Open the verification link sent to your inbox or spam folder. Return to the login page and select “I verified my email.” If Firebase has temporarily limited requests, wait before trying again.</p></div>
        <div><h2 className="font-semibold text-slate-900">I need to change my personal details</h2><p className="mt-2 text-slate-600">Open <Link to="/profile" className="font-semibold text-blue-500 underline">My Profile</Link>. Only first and last name are required.</p></div>
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Contact support</h2>
        <div className="mt-4 flex flex-wrap gap-5">
          <a href="mailto:info@nextgenroboticx.com" className="flex items-center gap-2 font-semibold text-blue-500 underline"><Mail size={18} /> info@nextgenroboticx.com</a>
          <a href="tel:+919830068336" className="flex items-center gap-2 font-semibold text-blue-500 underline"><Phone size={18} /> +91 98300 68336</a>
        </div>
      </section>
    </div>
  );
}
