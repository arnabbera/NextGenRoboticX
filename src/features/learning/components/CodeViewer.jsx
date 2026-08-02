import { Code2, Copy, Download, Check } from "lucide-react";
import { useState } from "react";

export default function CodeViewer({
  title = "Arduino Example",
  language = "cpp",
  code = "",
  filename = "example.ino",
}) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="overflow-hidden rounded-3xl bg-slate-900 shadow-xl">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-700 px-6 py-4">

        <div className="flex items-center gap-3 text-white">

          <Code2 size={22} />

          <div>

            <div className="font-semibold">
              {title}
            </div>

            <div className="text-sm text-slate-400 uppercase">
              {language}
            </div>

          </div>

        </div>

        <div className="flex gap-3">

          <button
            onClick={copyCode}
            className="rounded-lg bg-slate-800 px-4 py-2 text-white hover:bg-slate-700"
          >
            {copied ? (
              <>
                <Check
                  size={16}
                  className="mr-2 inline"
                />
                Copied
              </>
            ) : (
              <>
                <Copy
                  size={16}
                  className="mr-2 inline"
                />
                Copy
              </>
            )}
          </button>

          <a
            href={`data:text/plain;charset=utf-8,${encodeURIComponent(code)}`}
            download={filename}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            <Download
              size={16}
              className="mr-2 inline"
            />

            Download
          </a>

        </div>

      </div>

      {/* Code */}

      <pre className="overflow-x-auto p-6 text-sm leading-7 text-green-400">

        <code>{code}</code>

      </pre>

    </div>
  );
}