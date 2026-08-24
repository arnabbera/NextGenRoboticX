import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  FileCheck2,
  RotateCcw,
  Send,
  Trophy,
  XCircle,
} from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import {
  MARKS_PER_QUESTION,
  PASS_PERCENTAGE,
  TEST_DURATION_SECONDS,
  TOTAL_QUESTIONS,
  roboticsQuestionBanks,
} from "../data/roboticsQuestionBanks";
import { arduinoQuestionBanks } from "../data/arduinoQuestionBanks";
import { raspberryPiQuestionBanks } from "../data/raspberryPiQuestionBanks";
import { droneQuestionBanks } from "../data/droneQuestionBanks";

const assessmentCourses = {
  "robotics-foundation": { title: "Robotics Foundation", banks: roboticsQuestionBanks },
  "arduino-programming": { title: "Arduino Programming", banks: arduinoQuestionBanks },
  "raspberry-pi": { title: "Raspberry Pi Development", banks: raspberryPiQuestionBanks },
  "drone-technology": { title: "Drone Technology", banks: droneQuestionBanks },
};

function formatTime(seconds) {
  const safe = Math.max(0, seconds);
  return `${String(Math.floor(safe / 60)).padStart(2, "0")}:${String(safe % 60).padStart(2, "0")}`;
}

export default function RoboticsTestPage() {
  const { user } = useAuth();
  const { courseId = "robotics-foundation" } = useParams();
  const course = assessmentCourses[courseId] || assessmentCourses["robotics-foundation"];
  const { pathname } = useLocation();
  const isMock = pathname.endsWith("/mock-test");
  const [status, setStatus] = useState(null);
  const [testType, setTestType] = useState(isMock ? "mock" : null);
  const [startedAt, setStartedAt] = useState(null);
  const [answers, setAnswers] = useState({});
  const [remaining, setRemaining] = useState(TEST_DURATION_SECONDS);
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(!isMock);
  const [error, setError] = useState("");

  const getToken = useCallback(() => user.getIdToken(), [user]);

  const loadStatus = useCallback(async () => {
    if (isMock) return;
    setBusy(true);
    try {
      const token = await getToken();
      const response = await fetch(`/api/certification/${courseId}/status`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to load assessment status.");
      setStatus(data);
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setBusy(false);
    }
  }, [courseId, getToken, isMock]);

  useEffect(() => {
    loadStatus();
  }, [loadStatus]);

  const questions = course.banks[testType] || [];

  const startTest = async (type) => {
    setError("");
    setResult(null);
    setAnswers({});
    if (type === "mock") {
      setTestType("mock");
      setStartedAt(new Date().toISOString());
      setRemaining(TEST_DURATION_SECONDS);
      return;
    }

    setBusy(true);
    try {
      const token = await getToken();
      const response = await fetch(`/api/certification/${courseId}/start`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to start assessment.");
      setTestType(type);
      setStartedAt(data.startedAt);
      setRemaining(Math.max(0, Math.ceil((new Date(data.expiresAt).getTime() - Date.now()) / 1000)));
    } catch (startError) {
      setError(startError.message);
      await loadStatus();
    } finally {
      setBusy(false);
    }
  };

  const submitTest = useCallback(async (automatic = false) => {
    if (!startedAt || busy) return;
    setBusy(true);
    setError("");

    const submittedAnswers = Array.from(
      { length: TOTAL_QUESTIONS },
      (_, index) => answers[index] ?? -1
    );

    try {
      if (testType === "mock") {
        const correct = submittedAnswers.reduce(
          (total, answer, index) => total + (answer === questions[index]?.answer || (courseId === "robotics-foundation" && answer === index % 4) ? 1 : 0),
          0
        );
        setResult({
          type: "mock",
          correct,
          score: correct * MARKS_PER_QUESTION,
          passed: correct * MARKS_PER_QUESTION >= PASS_PERCENTAGE,
          automatic,
        });
      } else {
        const token = await getToken();
        const response = await fetch(`/api/certification/${courseId}/submit`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ type: testType, answers: submittedAnswers }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Unable to submit assessment.");
        setResult({ ...data, automatic });
        await loadStatus();
      }
      setStartedAt(null);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setBusy(false);
    }
  }, [answers, busy, courseId, getToken, loadStatus, questions, startedAt, testType]);

  useEffect(() => {
    if (!startedAt) return undefined;
    const update = () => {
      const elapsed = Math.floor((Date.now() - new Date(startedAt).getTime()) / 1000);
      const next = Math.max(0, TEST_DURATION_SECONDS - elapsed);
      setRemaining(next);
      if (next === 0) submitTest(true);
    };
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [startedAt, submitTest]);

  const answeredCount = Object.keys(answers).length;
  const assessmentPassed = status?.certificate;
  const firstFailed = status?.assessment1?.submittedAt && !status.assessment1.passed;
  const secondAvailable = firstFailed && status?.reassessmentAvailable;
  const deadlineText = status?.reassessmentDeadline
    ? new Date(status.reassessmentDeadline).toLocaleString()
    : "";

  if (busy && !startedAt && !result) {
    return <div className="mx-auto max-w-5xl p-10 text-center text-slate-600">Loading assessment...</div>;
  }

  if (!startedAt && !result) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="rounded-3xl bg-gradient-to-r from-blue-700 to-indigo-800 p-8 text-white shadow-xl">
          <h1 className="text-3xl font-bold">{isMock ? `${course.title} Mock Test` : `${course.title} Assessment`}</h1>
          <p className="mt-3 text-blue-100">50 questions • 2 marks each • 100 marks • 30 minutes • Pass mark: 80%</p>
        </div>

        {error && <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>}

        <div className="mt-8 rounded-3xl bg-white p-8 shadow">
          {isMock ? (
            <>
              <h2 className="text-2xl font-bold">Practice before the certification assessment</h2>
              <p className="mt-3 text-slate-600">The mock test does not consume an assessment attempt and may be repeated.</p>
              <button onClick={() => startTest("mock")} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">Start Mock Test</button>
            </>
          ) : assessmentPassed ? (
            <div className="text-center">
              <Trophy className="mx-auto text-yellow-500" size={58} />
              <h2 className="mt-4 text-2xl font-bold">Assessment passed</h2>
              <p className="mt-2 text-slate-600">Your certificate has been generated and added to Certificates.</p>
              <Link to="/certificates" className="mt-6 inline-block rounded-xl bg-green-600 px-6 py-3 font-semibold text-white">View Certificate</Link>
            </div>
          ) : status?.assessment2?.submittedAt ? (
            <div>
              <h2 className="text-2xl font-bold text-red-700">Final reassessment completed</h2>
              <p className="mt-3 text-slate-600">The final attempt did not reach 80%. No further online attempt is available.</p>
            </div>
          ) : secondAvailable ? (
            <div>
              <h2 className="text-2xl font-bold">Final reassessment available</h2>
              <p className="mt-3 text-slate-600">Assessment 1 scored {status.assessment1.score}/100. Complete the separate final reassessment by {deadlineText}.</p>
              <button onClick={() => startTest("assessment2")} className="mt-6 rounded-xl bg-amber-600 px-6 py-3 font-semibold text-white hover:bg-amber-700">Start Final Reassessment</button>
            </div>
          ) : firstFailed ? (
            <div>
              <h2 className="text-2xl font-bold text-red-700">Reassessment period expired</h2>
              <p className="mt-3 text-slate-600">The 15-day final-attempt window ended on {deadlineText}.</p>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold">Assessment 1</h2>
              <p className="mt-3 text-slate-600">This is your first certification attempt. You need at least 40 correct answers, equal to 80/100 marks.</p>
              <button onClick={() => startTest("assessment1")} className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700">Start Assessment</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className={`rounded-3xl border p-8 text-center shadow-lg ${result.passed ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"}`}>
          {result.passed ? <CheckCircle2 className="mx-auto text-green-700" size={60} /> : <XCircle className="mx-auto text-red-700" size={60} />}
          <h1 className="mt-4 text-3xl font-bold">{result.passed ? "Passed" : "Not passed"}</h1>
          <p className="mt-3 text-xl">Score: {result.score}/100 • Correct answers: {result.correct}/50</p>
          {result.automatic && <p className="mt-2 text-amber-700">Time expired, so the test was submitted automatically.</p>}
          {result.certificate && <p className="mt-3 text-green-800">Your certificate was generated automatically.</p>}
          {result.reassessmentDeadline && !result.passed && (
            <p className="mt-3 text-slate-700">Your separate final reassessment is available until {new Date(result.reassessmentDeadline).toLocaleString()}.</p>
          )}
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {isMock && <button onClick={() => { setResult(null); setAnswers({}); }} className="inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-3 font-semibold"><RotateCcw size={18} /> Try Again</button>}
            {!isMock && result.certificate && <Link to="/certificates" className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white"><FileCheck2 size={18} /> View Certificate</Link>}
            <Link to={`/courses/${courseId}`} className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white">Course Overview</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-8">
      <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-950 p-4 text-white shadow-xl">
        <div>
          <h1 className="font-bold">{testType === "mock" ? "Mock Test" : testType === "assessment1" ? "Assessment 1" : "Final Reassessment"}</h1>
          <p className="text-sm text-slate-300">{answeredCount}/50 answered</p>
        </div>
        <div className={`flex items-center gap-2 rounded-xl px-4 py-2 font-mono text-xl font-bold ${remaining <= 300 ? "bg-red-600" : "bg-blue-600"}`}>
          <Clock3 size={22} /> {formatTime(remaining)}
        </div>
        <button disabled={busy} onClick={() => submitTest(false)} className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 font-semibold disabled:opacity-50"><Send size={18} /> Submit</button>
      </div>

      {remaining <= 300 && <div className="mt-5 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900"><AlertTriangle /> Less than five minutes remain.</div>}
      {error && <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>}

      <div className="mt-6 space-y-5">
        {questions.map((question, index) => (
          <fieldset key={question.id} className="rounded-2xl bg-white p-6 shadow">
            <legend className="px-2 text-lg font-bold">{index + 1}. {question.question}</legend>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {question.options.map((option, optionIndex) => (
                <label key={option} className={`cursor-pointer rounded-xl border p-4 ${answers[index] === optionIndex ? "border-blue-500 bg-blue-50" : "hover:bg-slate-50"}`}>
                  <input type="radio" name={`question-${index}`} checked={answers[index] === optionIndex} onChange={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))} className="mr-3" />
                  {option}
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      <button disabled={busy} onClick={() => submitTest(false)} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-green-600 px-7 py-3 font-semibold text-white"><Send size={18} /> Submit Test</button>
    </div>
  );
}
