import { Bot, Cpu, Rocket, GraduationCap } from "lucide-react";

export default function AuthLayout({
  title,
  subtitle,
  children,
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex">
      {/* Left Panel */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white p-16 flex-col justify-between">
        <div>
          <div className="flex items-center gap-4">
            <Bot size={48} />
            <div>
              <h1 className="text-4xl font-bold">
                NextGenRoboticX
              </h1>

              <p className="text-blue-200 mt-2">
                Learn Robotics • AI • IoT • Drones
              </p>
            </div>
          </div>

          <h2 className="text-5xl font-bold mt-20 leading-tight">
            Build the Future
            <br />
            with Robotics &
            <br />
            Artificial Intelligence
          </h2>

          <p className="mt-8 text-blue-100 text-lg leading-8">
            India's next generation Robotics Learning Platform
            designed for School Students, Engineering Students
            and Professionals.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Cpu className="text-cyan-300" />
            <span>Arduino & Embedded Systems</span>
          </div>

          <div className="flex items-center gap-4">
            <Rocket className="text-cyan-300" />
            <span>AI & IoT Projects</span>
          </div>

          <div className="flex items-center gap-4">
            <GraduationCap className="text-cyan-300" />
            <span>Industry Certifications</span>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10">

          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              {title}
            </h2>

            <p className="text-gray-500 mt-2">
              {subtitle}
            </p>
          </div>

          {children}

          <div className="mt-10 border-t pt-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} NextGenRoboticX
            <br />
            Learn • Build • Certify • Work
          </div>

        </div>
      </div>
    </div>
  );
}