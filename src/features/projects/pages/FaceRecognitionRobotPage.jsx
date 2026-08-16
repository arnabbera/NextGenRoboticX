import { useEffect } from "react";
import {
  ArrowLeft,
  BrainCircuit,
  Camera,
  CheckCircle2,
  CircuitBoard,
  Code2,
  Cpu,
  ShieldAlert,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../../components/home/Footer";
import ProjectShare from "../components/ProjectShare";

const components = [
  ["Raspberry Pi 4 or 5", "1", "Runs Python, OpenCV and motor control"],
  ["Raspberry Pi Camera or USB webcam", "1", "Captures live video"],
  ["L298N motor driver", "1", "Controls both geared motors"],
  ["DC geared motors and wheels", "2", "Moves and steers the robot"],
  ["2WD chassis with caster wheel", "1 set", "Mechanical platform"],
  ["7.4V protected battery pack", "1", "Powers the motor driver"],
  ["5V 3A regulated Pi supply", "1", "Powers the Raspberry Pi safely"],
  ["Jumper wires and mounting hardware", "As needed", "Signal and mechanical connections"],
  ["Emergency power switch", "1", "Stops the robot quickly"],
];

const connections = [
  ["L298N ENA", "Raspberry Pi GPIO 12 (PWM)"],
  ["L298N IN1 / IN2", "Raspberry Pi GPIO 17 / GPIO 18"],
  ["L298N ENB", "Raspberry Pi GPIO 13 (PWM)"],
  ["L298N IN3 / IN4", "Raspberry Pi GPIO 22 / GPIO 23"],
  ["Left motor", "L298N OUT1 / OUT2"],
  ["Right motor", "L298N OUT3 / OUT4"],
  ["Motor battery positive", "L298N VIN through a switch"],
  ["Motor battery negative", "L298N GND"],
  ["Raspberry Pi GND", "L298N GND — common signal ground"],
  ["Camera ribbon or USB cable", "Pi CSI camera port or USB port"],
];

const steps = [
  {
    title: "Build the mobile base",
    text: "Mount the motors, wheels and caster firmly. Install the battery low and near the centre so the robot remains stable while turning.",
  },
  {
    title: "Mount the Raspberry Pi and camera",
    text: "Use insulated spacers for the Pi. Place the camera at eye level for the intended test distance and keep its cable away from motors and wheels.",
  },
  {
    title: "Connect the motor driver",
    text: "Follow the wiring table, verify the common ground and keep motor power separate from the Pi's regulated supply. Test with the wheels raised.",
  },
  {
    title: "Install OpenCV dependencies",
    text: "Create a Python virtual environment and install opencv-contrib-python, numpy and gpiozero. Confirm that cv2.face is available before continuing.",
  },
  {
    title: "Collect consented face images",
    text: "Capture 30–50 clear grayscale images per participant with permission, varying expression and head angle. Store only the minimum data required.",
  },
  {
    title: "Train the local recogniser",
    text: "Run the training script to create trainer.yml. Keep the model on the Raspberry Pi and never publish enrolled face images or the trained model.",
  },
  {
    title: "Test recognition without motors",
    text: "Run the main program with the motor driver disconnected. Verify names, confidence values and the UNKNOWN result under different lighting.",
  },
  {
    title: "Test movement with wheels raised",
    text: "Reconnect the motor driver, raise the chassis and use low PWM values. Confirm left, right, forward and stop responses.",
  },
  {
    title: "Perform a slow floor test",
    text: "Use a clear indoor area, keep an emergency stop within reach and have a second person supervise. Reduce speed if the robot oscillates.",
  },
  {
    title: "Tune responsibly",
    text: "Adjust face width, centre tolerance and confidence threshold for your camera. Treat every recognition result as uncertain and never use it for security or access control.",
  },
];

const trainingCode = String.raw`from pathlib import Path
import cv2
import numpy as np

DATASET = Path("dataset")
OUTPUT = "trainer.yml"
IMAGE_SIZE = (200, 200)

detector = cv2.CascadeClassifier(
    cv2.data.haarcascades
    + "haarcascade_frontalface_default.xml"
)
recognizer = cv2.face.LBPHFaceRecognizer_create()

faces = []
labels = []

# File names must follow: person.<numeric_id>.<number>.jpg
for image_path in DATASET.glob("person.*.*.jpg"):
    parts = image_path.stem.split(".")
    if len(parts) != 3:
        continue

    person_id = int(parts[1])
    gray = cv2.imread(str(image_path), cv2.IMREAD_GRAYSCALE)
    if gray is None:
        continue

    detected = detector.detectMultiScale(
        gray,
        scaleFactor=1.2,
        minNeighbors=5,
        minSize=(80, 80),
    )

    for x, y, w, h in detected:
        face = gray[y:y+h, x:x+w]
        face = cv2.resize(face, IMAGE_SIZE)
        faces.append(face)
        labels.append(person_id)

if not faces:
    raise RuntimeError("No valid training faces found")

recognizer.train(faces, np.array(labels))
recognizer.write(OUTPUT)

print(f"Saved {OUTPUT} using {len(faces)} face samples")`;

const robotCode = String.raw`import time
import cv2
from gpiozero import Motor, PWMOutputDevice

# BCM GPIO numbering
left_motor = Motor(forward=17, backward=18)
right_motor = Motor(forward=22, backward=23)
left_enable = PWMOutputDevice(12, frequency=1000)
right_enable = PWMOutputDevice(13, frequency=1000)

CAMERA_INDEX = 0
FRAME_WIDTH = 640
FRAME_HEIGHT = 480
CENTER_TOLERANCE = 70
MIN_FACE_WIDTH = 115
MAX_FACE_WIDTH = 220
SPEED = 0.35

# Map only consented numeric IDs to display names
NAMES = {
    1: "Student 1",
    2: "Student 2",
}

detector = cv2.CascadeClassifier(
    cv2.data.haarcascades
    + "haarcascade_frontalface_default.xml"
)
recognizer = cv2.face.LBPHFaceRecognizer_create()
recognizer.read("trainer.yml")

camera = cv2.VideoCapture(CAMERA_INDEX)
camera.set(cv2.CAP_PROP_FRAME_WIDTH, FRAME_WIDTH)
camera.set(cv2.CAP_PROP_FRAME_HEIGHT, FRAME_HEIGHT)

def set_speed(value):
    value = max(0.0, min(value, 0.5))
    left_enable.value = value
    right_enable.value = value

def stop():
    left_motor.stop()
    right_motor.stop()
    set_speed(0)

def forward():
    set_speed(SPEED)
    left_motor.forward()
    right_motor.forward()

def turn_left():
    set_speed(SPEED * 0.75)
    left_motor.backward()
    right_motor.forward()

def turn_right():
    set_speed(SPEED * 0.75)
    left_motor.forward()
    right_motor.backward()

def follow_face(x, width):
    face_center = x + width // 2
    frame_center = FRAME_WIDTH // 2
    error = face_center - frame_center

    if error < -CENTER_TOLERANCE:
        turn_left()
    elif error > CENTER_TOLERANCE:
        turn_right()
    elif width < MIN_FACE_WIDTH:
        forward()
    else:
        stop()

try:
    while True:
        ok, frame = camera.read()
        if not ok:
            stop()
            break

        frame = cv2.resize(frame, (FRAME_WIDTH, FRAME_HEIGHT))
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        faces = detector.detectMultiScale(
            gray,
            scaleFactor=1.2,
            minNeighbors=5,
            minSize=(80, 80),
        )

        recognised_targets = []

        for x, y, w, h in faces:
            sample = cv2.resize(gray[y:y+h, x:x+w], (200, 200))
            person_id, distance = recognizer.predict(sample)

            # Lower LBPH distance is a better match
            recognised = distance < 65 and person_id in NAMES
            name = NAMES.get(person_id, "UNKNOWN") if recognised else "UNKNOWN"

            if recognised:
                recognised_targets.append((x, y, w, h, distance, name))

            colour = (0, 200, 0) if recognised else (0, 0, 255)
            cv2.rectangle(frame, (x, y), (x+w, y+h), colour, 2)
            cv2.putText(
                frame,
                f"{name} ({distance:.0f})",
                (x, max(25, y - 10)),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.65,
                colour,
                2,
            )

        if recognised_targets:
            # Follow the largest recognised face only
            target = max(recognised_targets, key=lambda item: item[2] * item[3])
            follow_face(target[0], target[2])
        else:
            stop()

        cv2.imshow("Face Recognition Robot", frame)
        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

finally:
    stop()
    camera.release()
    cv2.destroyAllWindows()
    time.sleep(0.2)`;

export default function FaceRecognitionRobotPage() {
  useEffect(() => {
    const title = "AI Face Recognition Robot Using Raspberry Pi and OpenCV";
    const description =
      "Build an AI face recognition robot using Raspberry Pi, Python, OpenCV and a 2WD chassis with components, wiring, training code, movement code and privacy guidance.";
    const canonical =
      "https://www.nextgenroboticx.com/projects/face-recognition-robot";
    const image =
      "https://www.nextgenroboticx.com/images/projects/facerecognition.png";

    document.title = `${title} | NextGenRoboticX`;

    const setMeta = (selector, attributes) => {
      let element = document.head.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        document.head.appendChild(element);
      }
      Object.entries(attributes).forEach(([name, value]) =>
        element.setAttribute(name, value)
      );
    };

    setMeta('meta[name="description"]', { name: "description", content: description });
    setMeta('meta[property="og:title"]', { property: "og:title", content: title });
    setMeta('meta[property="og:description"]', { property: "og:description", content: description });
    setMeta('meta[property="og:type"]', { property: "og:type", content: "article" });
    setMeta('meta[property="og:url"]', { property: "og:url", content: canonical });
    setMeta('meta[property="og:image"]', { property: "og:image", content: image });
    setMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    setMeta('meta[name="twitter:image"]', { name: "twitter:image", content: image });

    let canonicalLink = document.head.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical;

    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.id = "face-robot-howto-schema";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: title,
      description,
      image,
      totalTime: "PT15H",
      supply: components.map(([name]) => ({ "@type": "HowToSupply", name })),
      step: steps.map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: step.title,
        text: step.text,
      })),
    });
    document.head.appendChild(schema);

    return () => schema.remove();
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-6">
          <Link to="/#projects" className="inline-flex items-center gap-2 font-semibold text-blue-700">
            <ArrowLeft size={20} /> Back to projects
          </Link>
          <Link to="/" className="text-xl font-bold text-blue-700">NextGenRoboticX</Link>
        </div>
      </header>

      <main>
        <section className="bg-slate-950 py-14 text-white sm:py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2">
            <div>
              <span className="rounded-full bg-cyan-400/15 px-4 py-2 text-sm font-semibold text-cyan-300">
                Advanced AI Project · Approximately 15 Hours
              </span>
              <h1 className="mt-7 text-4xl font-extrabold leading-tight sm:text-6xl">
                AI Face Recognition Robot
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                Train a local OpenCV model to recognise consented participants and make a Raspberry Pi robot slowly align with the selected face.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
                {["Python", "OpenCV", "Raspberry Pi", "Computer Vision"].map((item) => (
                  <span key={item} className="rounded-full border border-slate-600 px-4 py-2">{item}</span>
                ))}
              </div>
            </div>
            <img
              src="/images/projects/facerecognition.png"
              alt="AI face recognition robot using Raspberry Pi and OpenCV"
              className="aspect-video w-full rounded-3xl object-cover shadow-2xl"
            />
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-5 sm:px-6">
            <h2 className="text-3xl font-bold sm:text-4xl">How the robot works</h2>
            <div className="mt-9 grid gap-6 md:grid-cols-3">
              {[
                [Camera, "Detect", "OpenCV finds faces in each camera frame and normalises the face crop."],
                [BrainCircuit, "Recognise", "A locally trained LBPH model returns an identity estimate and match distance."],
                [Cpu, "Move", "Only a recognised target can trigger low-speed left, right or forward movement."],
              ].map(([Icon, title, text]) => (
                <article key={title} className="rounded-3xl border border-slate-200 p-6 shadow-sm">
                  <Icon className="text-blue-600" size={30} />
                  <h3 className="mt-5 text-xl font-bold">{title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-5 sm:px-6">
            <div className="flex items-center gap-3">
              <CircuitBoard className="text-blue-600" size={32} />
              <h2 className="text-3xl font-bold sm:text-4xl">Components required</h2>
            </div>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <table className="w-full min-w-[680px] text-left">
                <thead className="bg-slate-900 text-white">
                  <tr><th className="p-4">Component</th><th className="p-4">Quantity</th><th className="p-4">Purpose</th></tr>
                </thead>
                <tbody>
                  {components.map(([name, quantity, purpose]) => (
                    <tr key={name} className="border-t border-slate-200">
                      <td className="p-4 font-semibold">{name}</td><td className="p-4">{quantity}</td><td className="p-4 text-slate-600">{purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-5 sm:px-6">
            <div className="flex items-center gap-3">
              <Wrench className="text-blue-600" size={30} />
              <h2 className="text-3xl font-bold">Connection details</h2>
            </div>
            <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200">
              {connections.map(([from, to]) => (
                <div key={from} className="grid gap-2 border-t border-slate-200 px-5 py-4 first:border-t-0 sm:grid-cols-2">
                  <strong>{from}</strong><span className="text-slate-600">{to}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-950 py-16 text-white sm:py-20">
          <div className="mx-auto max-w-5xl px-5 sm:px-6">
            <div className="flex items-center gap-3">
              <Code2 className="text-cyan-400" size={32} />
              <h2 className="text-3xl font-bold sm:text-4xl">Train the face model</h2>
            </div>
            <p className="mt-4 leading-7 text-slate-300">
              Use numeric participant IDs in consented local images, then generate the private trainer.yml file.
            </p>
            <pre className="mt-8 max-h-[650px] overflow-auto rounded-2xl border border-slate-700 bg-black p-5 text-sm leading-6 text-emerald-300">
              <code>{trainingCode}</code>
            </pre>
          </div>
        </section>

        <section className="bg-slate-900 py-16 text-white sm:py-20">
          <div className="mx-auto max-w-5xl px-5 sm:px-6">
            <div className="flex items-center gap-3">
              <Code2 className="text-blue-400" size={32} />
              <h2 className="text-3xl font-bold sm:text-4xl">Recognition and robot-control code</h2>
            </div>
            <p className="mt-4 leading-7 text-slate-300">
              The robot stops whenever there is no recognised face. Begin with the wheels raised and keep speeds low.
            </p>
            <pre className="mt-8 max-h-[760px] overflow-auto rounded-2xl border border-slate-700 bg-black p-5 text-sm leading-6 text-emerald-300">
              <code>{robotCode}</code>
            </pre>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-5 sm:px-6">
            <h2 className="text-3xl font-bold sm:text-4xl">Step-by-step build guide</h2>
            <div className="mt-10 space-y-6">
              {steps.map((step, index) => (
                <article key={step.title} className="flex gap-5 rounded-3xl border border-slate-200 p-6 shadow-sm">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">{index + 1}</span>
                  <div><h3 className="text-xl font-bold">{step.title}</h3><p className="mt-2 leading-7 text-slate-600">{step.text}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-amber-50 py-14">
          <div className="mx-auto max-w-5xl px-5 sm:px-6">
            <div className="flex gap-4">
              <ShieldAlert className="shrink-0 text-amber-700" size={30} />
              <div>
                <h2 className="text-2xl font-bold text-amber-950">Privacy, fairness and safety</h2>
                <ul className="mt-4 space-y-3 text-amber-950">
                  {[
                    "Obtain informed permission before collecting or processing anyone's face.",
                    "Keep images and trained biometric models private, encrypted and limited to this learning project.",
                    "Delete participant data when it is no longer required or when consent is withdrawn.",
                    "Face recognition can be inaccurate across lighting, pose and demographic groups; never use it for security decisions.",
                    "Keep robot speed low and provide an accessible emergency power switch.",
                  ].map((note) => <li key={note} className="flex gap-3"><CheckCircle2 className="mt-0.5 shrink-0" size={20} /><span>{note}</span></li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-5 sm:px-6">
            <h2 className="text-3xl font-bold">Troubleshooting</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {[
                ["cv2.face is missing", "Install opencv-contrib-python in the active virtual environment, not only opencv-python."],
                ["Everyone appears UNKNOWN", "Improve lighting, collect more varied consented samples and review the LBPH distance threshold."],
                ["Robot turns the wrong way", "Swap the affected motor wires or reverse that motor's GPIO direction mapping."],
                ["Video is slow", "Use 640 × 480 frames, process grayscale images and reduce detection frequency if required."],
              ].map(([problem, solution]) => (
                <article key={problem} className="rounded-2xl bg-slate-50 p-6">
                  <h3 className="font-bold">{problem}</h3><p className="mt-2 leading-7 text-slate-600">{solution}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <ProjectShare
        title="AI Face Recognition Robot Using Raspberry Pi"
        description="Build an AI face recognition robot using Python, OpenCV, Raspberry Pi and a 2WD chassis."
      />
      <Footer />
    </div>
  );
}
