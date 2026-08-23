import { useMemo, useState } from "react";
import { Camera, CheckCircle2, CircleHelp, Code2, Eye, Gauge, Image, RotateCcw, ShieldAlert, SlidersHorizontal, XCircle } from "lucide-react";

const captureCode = `from pathlib import Path
from time import sleep
from picamera2 import Picamera2
import cv2

output = Path.home() / "vision-lab"
output.mkdir(exist_ok=True)

camera = Picamera2()
config = camera.create_preview_configuration(
    main={"size": (640, 480), "format": "RGB888"}
)
camera.configure(config)
camera.start()
sleep(2)  # allow exposure and white balance to settle

try:
    frame = camera.capture_array()
    gray = cv2.cvtColor(frame, cv2.COLOR_RGB2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    edges = cv2.Canny(blurred, 60, 140)

    cv2.imwrite(str(output / "frame.jpg"), cv2.cvtColor(frame, cv2.COLOR_RGB2BGR))
    cv2.imwrite(str(output / "edges.png"), edges)
    print(f"Saved results in {output}")
finally:
    camera.stop()`;

const colourCode = `import cv2
import numpy as np

frame = cv2.imread("object.jpg")
if frame is None:
    raise FileNotFoundError("object.jpg was not found")

hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
# Example blue range; calibrate these limits for your own lighting.
lower = np.array([90, 80, 60])
upper = np.array([130, 255, 255])
mask = cv2.inRange(hsv, lower, upper)
mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))

contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
for contour in contours:
    if cv2.contourArea(contour) < 500:
        continue
    x, y, width, height = cv2.boundingRect(contour)
    cv2.rectangle(frame, (x, y), (x + width, y + height), (0, 255, 0), 2)

cv2.imwrite("detected.jpg", frame)`;

const questions = [
  { question: "Which Raspberry Pi library is the current Python interface for supported CSI cameras?", options: ["Picamera2", "GPIO Zero", "Flask", "Paho MQTT"], answer: 0 },
  { question: "What does image resolution describe?", options: ["The number of pixels across an image's width and height", "The GPIO voltage", "The lens material only", "The network speed"], answer: 0 },
  { question: "Why convert an image to grayscale for some vision tasks?", options: ["It reduces data while retaining brightness structure", "It increases physical camera resolution", "It encrypts the image", "It always identifies objects"], answer: 0 },
  { question: "What is the purpose of Gaussian blur before edge detection?", options: ["Reduce small noise that may create false edges", "Add GPS coordinates", "Increase GPIO current", "Authenticate the camera"], answer: 0 },
  { question: "What does Canny edge detection produce?", options: ["A map of strong intensity boundaries", "An audio waveform", "A database", "A motor signal"], answer: 0 },
  { question: "Why is HSV often useful for colour segmentation?", options: ["It separates hue from brightness-related components", "It removes the need for calibration", "It guarantees object recognition", "It stores passwords"], answer: 0 },
  { question: "What is a contour in OpenCV?", options: ["A curve joining points along a detected boundary", "A camera cable", "A Linux account", "A PWM frequency"], answer: 0 },
  { question: "How can a Raspberry Pi vision pipeline improve frame rate?", options: ["Use an appropriate lower resolution and process only necessary regions", "Save every frame at maximum resolution", "Disable all validation", "Add blocking delays"], answer: 0 },
  { question: "What is an important camera privacy practice?", options: ["Capture only with a legitimate purpose, notice or consent, and limited retention", "Publish every frame publicly", "Hide camera operation", "Keep images forever"], answer: 0 },
  { question: "Why must colour thresholds be tested in the real environment?", options: ["Lighting, shadows, camera settings, and surfaces change measured colour", "Thresholds control the CPU fan", "OpenCV ignores colour", "All cameras produce identical pixels"], answer: 0 },
];

export default function RaspberryPiChapterNineLesson() {
  return <><article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
    <header><p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 9</p><h2 className="mt-2 text-3xl font-bold text-slate-900">Camera, OpenCV and Computer Vision Basics</h2><p className="mt-4 leading-8 text-slate-600">Computer vision turns camera pixels into useful measurements and decisions. In this chapter you will connect and test a Raspberry Pi camera, capture images with Picamera2, process them with OpenCV, detect edges and coloured objects, and design an efficient pipeline that respects safety and privacy.</p></header>

    <section><h3 className="text-2xl font-bold">Learning objectives</h3><ul className="mt-4 grid gap-3 md:grid-cols-2">{["Identify camera hardware, ribbon-cable orientation, lenses, lighting, and power requirements.", "Explain pixels, resolution, frame rate, colour channels, focus, exposure, and white balance.", "Capture a frame with Picamera2 and save processed images with OpenCV.", "Apply grayscale conversion, blur, thresholding, morphology, edge detection, and contours.", "Build and calibrate a simple colour-object detector.", "Improve performance while applying privacy, retention, and secure-access controls."].map(item=><li key={item} className="rounded-xl border border-slate-200 p-4"><b className="mr-2 text-emerald-600">✓</b>{item}</li>)}</ul></section>

    <section className="rounded-2xl bg-blue-50 p-6"><h3 className="text-2xl font-bold">From light to a vision result</h3><div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3"><Card icon={Camera} title="Acquire" text="The lens focuses light on the sensor. Exposure, focus, frame rate, resolution, and lighting determine input quality."/><Card icon={Image} title="Represent" text="An image is a grid of pixels. OpenCV commonly loads colour images in BGR order, while Picamera2 may provide RGB."/><Card icon={SlidersHorizontal} title="Preprocess" text="Crop, resize, blur, normalise, convert colour space, or threshold to make the target signal easier to separate."/><Card icon={Eye} title="Detect" text="Find edges, shapes, motion, colours, features, or model predictions appropriate to the task."/><Card icon={Gauge} title="Evaluate" text="Measure accuracy, false detections, latency, CPU use, temperature, and behaviour under changing conditions."/><Card icon={ShieldAlert} title="Act safely" text="Treat detections as uncertain, validate decisions, protect captured data, and define a safe failure mode."/></div></section>

    <section><h3 className="text-2xl font-bold">Camera setup and first checks</h3><ol className="mt-4 space-y-3 text-slate-700"><li><b>1. Power off:</b> Disconnect power before inserting or removing a CSI ribbon cable.</li><li><b>2. Connect carefully:</b> Release the connector latch, align the cable contacts for your Pi model, insert it evenly, and close the latch without force.</li><li><b>3. Update and test:</b> Boot Raspberry Pi OS, update approved packages, and test with <code className="rounded bg-slate-100 px-2 py-1">rpicam-hello</code>.</li><li><b>4. Prepare Python:</b> Use Picamera2 from Raspberry Pi OS packages and an isolated environment that can access required system packages.</li><li><b>5. Control the scene:</b> Stabilise the camera, provide even lighting, clean the lens, and use a clear background before tuning software.</li></ol><div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-5 text-amber-900">Never force a connector or hot-plug the camera. Avoid short circuits, bright lasers, direct high-intensity light, and camera placement that invades privacy.</div></section>

    <section><h3 className="text-2xl font-bold">Image and video fundamentals</h3><div className="mt-5 overflow-x-auto"><table className="w-full text-left"><thead className="bg-slate-900 text-white"><tr><th className="p-3">Concept</th><th className="p-3">Meaning</th><th className="p-3">Trade-off</th></tr></thead><tbody className="divide-y"><tr><td className="p-3 font-semibold">Resolution</td><td className="p-3">Width × height in pixels</td><td className="p-3">More detail but more memory and processing</td></tr><tr><td className="p-3 font-semibold">Frame rate</td><td className="p-3">Frames captured each second</td><td className="p-3">Smoother motion but greater bandwidth and compute</td></tr><tr><td className="p-3 font-semibold">Exposure</td><td className="p-3">Light collected for a frame</td><td className="p-3">Long exposure is brighter but can blur motion</td></tr><tr><td className="p-3 font-semibold">White balance</td><td className="p-3">Colour correction for illumination</td><td className="p-3">Automatic settings may shift thresholds between frames</td></tr><tr><td className="p-3 font-semibold">Colour space</td><td className="p-3">A representation such as RGB, BGR, grayscale, or HSV</td><td className="p-3">Choose the representation that simplifies the task</td></tr></tbody></table></div></section>

    <section><div className="flex items-center gap-3"><Code2 className="text-emerald-700"/><h3 className="text-2xl font-bold">Capture, preprocess, and find edges</h3></div><p className="mt-3 leading-7 text-slate-600">This program captures one modest-resolution frame, converts it to grayscale, suppresses small noise, and extracts intensity boundaries. It always stops the camera, even if processing fails.</p><pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-6 text-emerald-300"><code>{captureCode}</code></pre><p className="mt-4 leading-7 text-slate-600">Canny thresholds are not universal. Tune them using representative images, then test against glare, shadows, motion blur, distance, and background changes.</p></section>

    <section><h3 className="text-2xl font-bold">Core OpenCV operations</h3><div className="mt-5 grid gap-4 md:grid-cols-2"><Card icon={Image} title="Grayscale and blur" text="Reduce channels and suppress high-frequency noise before threshold or edge operations."/><Card icon={SlidersHorizontal} title="Threshold and mask" text="Classify pixels by intensity or colour range to create a binary region-of-interest mask."/><Card icon={Eye} title="Morphology" text="Opening removes small mask noise; closing can fill small gaps. Kernel size must match the scene scale."/><Card icon={Gauge} title="Contours" text="Extract connected boundaries, then filter by area, shape, position, or other measured properties."/></div></section>

    <section><div className="flex items-center gap-3"><Eye className="text-purple-700"/><h3 className="text-2xl font-bold">Simple colour-object detection</h3></div><p className="mt-3 leading-7 text-slate-600">HSV often makes colour segmentation easier because hue is separated from brightness-related components. The example detects sufficiently large blue regions in a saved image. Calibrate limits with your camera and lighting; red usually needs two hue ranges because hue wraps around.</p><pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-6 text-cyan-200"><code>{colourCode}</code></pre></section>

    <section><h3 className="text-2xl font-bold">Motion detection and responsible decisions</h3><p className="mt-4 leading-8 text-slate-600">A basic motion detector compares a current grayscale frame with a background or previous frame, thresholds the absolute difference, cleans the mask, and filters contours by area. Camera movement, shadows, rain, screen flicker, and exposure changes can all create false motion. A detection is evidence—not certainty—so require confirmation across frames and never use a basic lab detector for a safety-critical decision.</p></section>

    <section className="rounded-2xl border border-red-200 bg-red-50 p-6"><div className="flex items-center gap-3"><ShieldAlert className="text-red-700"/><h3 className="text-xl font-bold">Privacy and security</h3></div><ul className="mt-4 space-y-2 text-slate-700"><li>• Capture only for a legitimate, disclosed purpose and obtain consent or other appropriate authority.</li><li>• Avoid private areas; provide a visible indication when capture is active where appropriate.</li><li>• Process locally when possible, collect the minimum data, and delete images on a defined schedule.</li><li>• Restrict file, stream, SSH, and web access; encrypt sensitive transfers and do not expose a development stream publicly.</li><li>• Do not use face recognition or biometric identification without a reviewed legal, ethical, security, and accuracy framework.</li></ul></section>

    <section><h3 className="text-2xl font-bold">Performance on Raspberry Pi</h3><div className="mt-5 grid gap-4 md:grid-cols-2"><Card icon={Gauge} title="Process less" text="Use the lowest useful resolution, crop a region of interest, skip frames when acceptable, and avoid unnecessary copies."/><Card icon={SlidersHorizontal} title="Measure first" text="Record frame time, FPS, CPU, memory, and temperature before and after each optimisation."/><Card icon={Camera} title="Stabilise input" text="Fixed lighting, focus, exposure, and camera position often improve accuracy more than complex processing."/><Card icon={ShieldAlert} title="Handle failure" text="Validate frame capture, release the camera in finally blocks, bound queues, log errors, and keep actuators safe."/></div></section>

    <section className="rounded-2xl bg-slate-900 p-6 text-white"><h3 className="text-2xl font-bold">Hands-on activity: colour-object tracker</h3><ol className="mt-4 space-y-2 text-slate-200"><li>1. Photograph a coloured object against a contrasting background under authorised, controlled conditions.</li><li>2. Inspect HSV values and select an initial colour range.</li><li>3. Create a mask, apply morphology, find contours, and discard regions below a documented area threshold.</li><li>4. Draw the largest valid bounding box and centre point; save the annotated result without personal data.</li><li>5. Test at different distances and under bright, dim, shadowed, and mixed lighting.</li><li>6. Record false positives, missed detections, processing time, CPU temperature, and improvements.</li></ol></section>
    <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6"><h3 className="text-xl font-bold text-blue-900">Chapter completion checklist</h3><p className="mt-3 leading-7 text-blue-800">Complete the camera and colour-detection labs, explain the processing pipeline and its limitations, review the uploaded video/PDF when available, document privacy safeguards, and score at least 80% below.</p></section>
  </article><ChapterQuiz/></>;
}

function ChapterQuiz(){const [answers,setAnswers]=useState({});const [submitted,setSubmitted]=useState(false);const score=useMemo(()=>questions.reduce((n,q,i)=>n+(answers[i]===q.answer?1:0),0),[answers]);const complete=Object.keys(answers).length===questions.length;const passed=score>=8;const reset=()=>{setAnswers({});setSubmitted(false)};return <section className="rounded-3xl bg-white p-6 shadow-lg md:p-8"><div className="flex items-center gap-3 border-b border-slate-200 pb-5"><CircleHelp className="text-blue-600" size={30}/><div><h2 className="text-2xl font-bold">Chapter 9 Quiz</h2><p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p></div></div><div className="mt-6 space-y-6">{questions.map((q,i)=><fieldset key={q.question} className="rounded-2xl border border-slate-200 p-5"><legend className="px-2 font-bold">{i+1}. {q.question}</legend><div className="mt-3 space-y-2">{q.options.map((o,j)=>{const selected=answers[i]===j;const correct=submitted&&j===q.answer;const incorrect=submitted&&selected&&j!==q.answer;return <label key={o} className={`flex cursor-pointer gap-3 rounded-xl border p-3 ${correct?"border-green-300 bg-green-50":incorrect?"border-red-300 bg-red-50":selected?"border-blue-400 bg-blue-50":"border-slate-200 hover:bg-slate-50"}`}><input type="radio" name={`pi-ch9-${i}`} checked={selected} disabled={submitted} onChange={()=>setAnswers(a=>({...a,[i]:j}))} className="mt-1"/><span>{o}</span></label>})}</div></fieldset>)}</div>{!submitted?<button disabled={!complete} onClick={()=>setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white disabled:bg-slate-300">Submit Quiz</button>:<div className={`mt-6 rounded-2xl border p-6 ${passed?"border-green-300 bg-green-50":"border-red-300 bg-red-50"}`}><div className="flex gap-3">{passed?<CheckCircle2 className="text-green-700"/>:<XCircle className="text-red-700"/>}<div><h3 className="text-xl font-bold">{passed?"Chapter quiz passed":"Review the lesson and try again"}</h3><p>You scored {score}/10 ({score*10}%).</p></div></div><button onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18}/> Retake Quiz</button></div>}</section>}

function Card({icon:Icon,title,text}){return <div className="rounded-2xl border border-slate-200 bg-white p-5"><Icon className="text-blue-600" size={26}/><h4 className="mt-3 font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>}
