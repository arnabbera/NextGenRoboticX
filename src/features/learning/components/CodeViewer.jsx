import { Code2 } from "lucide-react";

export default function CodeViewer() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg">

      <div className="mb-5 flex items-center gap-3">

        <Code2
          className="text-green-600"
          size={28}
        />

        <h2 className="text-2xl font-bold">
          Source Code
        </h2>

      </div>

      <pre className="overflow-auto rounded-xl bg-slate-900 p-5 text-green-400">

{`void setup() {

}

void loop() {

}`}

      </pre>

    </div>
  );
}