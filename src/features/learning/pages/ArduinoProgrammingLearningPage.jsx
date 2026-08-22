import { BookOpen, CheckCircle2, Clock, Trophy } from "lucide-react";
import { courseContent } from "../../courses/data/courseContent";
import ChapterPdfCard from "../components/ChapterPdfCard";
import ChapterVideoManager from "../components/ChapterVideoManager";

const chapters = courseContent["arduino-programming"]?.chapters || [];

export default function ArduinoProgrammingLearningPage() {
  return (
    <div className="min-h-screen bg-slate-100 pb-12">
      <header className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white shadow-lg">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <p className="font-semibold text-blue-100">Enrolled course</p>
          <h1 className="mt-2 text-4xl font-bold">Arduino Programming</h1>
          <p className="mt-3 max-w-3xl text-lg leading-8 text-blue-100">
            Work through all ten chapters in order. Video lessons and PDF study material appear inside each chapter as they are published.
          </p>
          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            <CourseStat icon={BookOpen} label="Curriculum" value="10 Chapters" />
            <CourseStat icon={Clock} label="Duration" value="2 Months" />
            <CourseStat icon={Trophy} label="Certificate" value="Included" />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="space-y-6">
          {chapters.map((chapter) => (
            <article key={chapter.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="p-6 md:p-8">
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div className="flex gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                      {chapter.id}
                    </span>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Chapter {chapter.id}</p>
                      <h2 className="mt-1 text-2xl font-bold text-slate-900">{chapter.title}</h2>
                      <p className="mt-2 flex items-center gap-2 text-slate-600"><Clock size={17} /> {chapter.duration}</p>
                    </div>
                  </div>
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                    <CheckCircle2 size={17} /> Chapter quiz included
                  </span>
                </div>
                <ChapterVideoManager chapter={chapter.id} />
              </div>
              <div className="border-t border-slate-100 pb-6">
                <ChapterPdfCard chapter={chapter.id} />
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

function CourseStat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
      <div className="flex items-center gap-2 text-sm text-blue-100"><Icon size={18} /> {label}</div>
      <p className="mt-2 text-xl font-bold">{value}</p>
    </div>
  );
}
