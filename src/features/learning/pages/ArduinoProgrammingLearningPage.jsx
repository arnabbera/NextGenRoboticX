import { BookOpen, CheckCircle2, ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { courseContent } from "../../courses/data/courseContent";
import ChapterSidebar from "../components/ChapterSidebar";
import ChapterVideoManager from "../components/ChapterVideoManager";
import LessonHeader from "../components/LessonHeader";

const chapters = courseContent["arduino-programming"]?.chapters || [];

export default function ArduinoProgrammingLearningPage() {
  const { chapterNumber } = useParams();
  const requestedChapter = Number(chapterNumber || 1);
  const chapter = chapters.find((item) => item.id === requestedChapter) || chapters[0];
  const previous = chapters.find((item) => item.id === chapter.id - 1);
  const next = chapters.find((item) => item.id === chapter.id + 1);

  return (
    <div className="min-h-screen bg-slate-100">
      <LessonHeader chapter={chapter.id} lesson={1} chapterTitle={chapter.title} />

      <div className="mx-auto max-w-7xl p-6">
        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-12 lg:col-span-3">
            <ChapterSidebar currentChapter={chapter.id} />
          </aside>

          <main className="col-span-12 space-y-6 lg:col-span-9">
            <section className="rounded-3xl bg-white p-6 shadow-lg">
              <div className="mb-6 flex items-center gap-3">
                <PlayCircle className="text-blue-600" size={28} />
                <div>
                  <h2 className="text-2xl font-bold">{chapter.title}</h2>
                  <p className="text-slate-500">Chapter {chapter.id} • {chapter.duration} • Video lesson and study material</p>
                </div>
              </div>
              <div className="flex aspect-video items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 via-teal-950 to-blue-950 p-8 text-center text-white">
                <div>
                  <PlayCircle className="mx-auto text-cyan-300" size={64} />
                  <h3 className="mt-5 text-2xl font-bold">Video lesson coming soon</h3>
                  <p className="mt-3 text-cyan-100">The administrator can add the YouTube lesson for this chapter below.</p>
                </div>
              </div>
              <ChapterVideoManager chapter={chapter.id} />
            </section>

            <article className="rounded-3xl bg-white p-6 shadow-lg md:p-8">
              <p className="font-semibold uppercase tracking-wider text-blue-700">Chapter {chapter.id}</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">{chapter.title}</h2>
              <p className="mt-4 leading-8 text-slate-600">
                This chapter is part of the Arduino Programming curriculum. Follow the video lesson, review the downloadable PDF study material, practise the concepts on an Arduino board, and complete the chapter quiz.
              </p>
              <div className="mt-7 grid gap-4 md:grid-cols-2">
                <LessonFeature icon={BookOpen} title="Study material" text="Chapter PDF is available here after the administrator uploads it." />
                <LessonFeature icon={CheckCircle2} title="Chapter quiz" text="A knowledge check is included for this chapter with an 80% pass target." />
              </div>
            </article>

            <nav className="flex flex-col justify-between gap-4 sm:flex-row">
              {previous ? (
                <Link to={chapterPath(previous.id)} className="inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-3 font-semibold hover:bg-slate-50">
                  <ChevronLeft size={18} /> Chapter {previous.id}: {previous.title}
                </Link>
              ) : <span />}
              {next && (
                <Link to={chapterPath(next.id)} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">
                  Chapter {next.id}: {next.title} <ChevronRight size={18} />
                </Link>
              )}
            </nav>
          </main>
        </div>
      </div>
    </div>
  );
}

function chapterPath(id) {
  return id === 1
    ? "/courses/arduino-programming/learn"
    : `/courses/arduino-programming/learn/chapter-${id}`;
}

function LessonFeature({ icon: Icon, title, text }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-5">
      <Icon className="text-blue-600" size={26} />
      <h3 className="mt-3 text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-slate-600">{text}</p>
    </div>
  );
}
