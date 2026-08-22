import { useEffect } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  CircuitBoard,
  Code2,
  Cpu,
  Gauge,
  PackageCheck,
  ShieldAlert,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../../components/home/Footer";
import ProjectShare from "../components/ProjectShare";
import ConnectionDiagramManager from "../components/ConnectionDiagramManager";

const components = [
  ["Arduino Uno or Mega", "1", "Runs the automation sequence"],
  ["PCA9685 16-channel servo driver", "1", "Generates stable servo PWM"],
  ["4-DOF robotic arm frame", "1 set", "Provides base, shoulder, elbow and gripper joints"],
  ["Metal-gear servo motors", "4", "Moves the arm joints"],
  ["High-torque base or shoulder servo", "1–2", "Handles the largest mechanical load"],
  ["6V high-current regulated supply", "1", "Powers servos independently"],
  ["7.4V protected battery or DC adapter", "1", "Supplies the regulator"],
  ["Push button", "1", "Starts a pick-and-place cycle"],
  ["Limit switch (optional)", "1", "Provides a safe homing reference"],
  ["Emergency power switch", "1", "Disconnects servo power quickly"],
];

const connections = [
  ["PCA9685 VCC / GND", "Arduino 5V / GND"],
  ["PCA9685 SDA / SCL", "Uno A4 / A5 or Mega 20 / 21"],
  ["PCA9685 V+", "External regulated 6V servo supply"],
  ["Servo supply GND", "PCA9685 and Arduino common GND"],
  ["Base servo", "PCA9685 channel 0"],
  ["Shoulder servo", "PCA9685 channel 1"],
  ["Elbow servo", "PCA9685 channel 2"],
  ["Gripper servo", "PCA9685 channel 3"],
  ["Start button", "Arduino D7 to GND using INPUT_PULLUP"],
  ["Optional limit switch", "Arduino D8 to GND using INPUT_PULLUP"],
  ["Battery or adapter", "Regulator input through fuse and emergency switch"],
];

const positions = [
  ["Home", "90°", "85°", "95°", "35°"],
  ["Above object", "45°", "105°", "75°", "35°"],
  ["Pick", "45°", "125°", "60°", "75°"],
  ["Lift", "45°", "90°", "100°", "75°"],
  ["Above destination", "135°", "90°", "100°", "75°"],
  ["Place", "135°", "120°", "65°", "35°"],
];

const steps = [
  {
    title: "Assemble the arm without servo horns",
    text: "Build the base and links loosely, confirm that each joint moves freely and remove sharp edges or mechanical interference.",
  },
  {
    title: "Centre each servo",
    text: "Connect one unloaded servo at a time, command 90 degrees and then fit its horn at the mechanical centre. Never force the output shaft.",
  },
  {
    title: "Mount and label the joints",
    text: "Install base, shoulder, elbow and gripper servos. Mark every cable and channel so connections remain clear during maintenance.",
  },
  {
    title: "Wire logic and servo power",
    text: "Use the Arduino only for PCA9685 logic. Power servos through a separate regulated 6V supply and connect all grounds together.",
  },
  {
    title: "Calibrate safe angle limits",
    text: "Support the arm and move each joint in one-degree increments. Record limits before any bracket binds or servo begins to buzz.",
  },
  {
    title: "Teach the home and pick poses",
    text: "Adjust the example angle table to match your arm. Test each pose separately at low speed before combining them.",
  },
  {
    title: "Run a dry automation cycle",
    text: "Remove the object, press the start button and watch the full path. Stop if cables pull tight or the gripper contacts the table.",
  },
  {
    title: "Pick a lightweight object",
    text: "Begin with a foam cube placed at a repeatable marked position. Increase gripper force only enough to hold the object.",
  },
  {
    title: "Improve repeatability",
    text: "Strengthen loose brackets, reduce joint speed near the object and use a limit switch or sensor if a reliable reference is required.",
  },
  {
    title: "Add advanced automation",
    text: "After the basic cycle is reliable, add colour detection, a conveyor sensor, joystick teaching or computer-vision coordinates.",
  },
];

const code = String.raw`#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>

Adafruit_PWMServoDriver pwm =
  Adafruit_PWMServoDriver(0x40);

const int START_BUTTON = 7;
const int SERVO_MIN = 110;
const int SERVO_MAX = 510;
const int SERVO_FREQUENCY = 50;

enum Joint {
  BASE = 0,
  SHOULDER = 1,
  ELBOW = 2,
  GRIPPER = 3
};

struct Pose {
  int base;
  int shoulder;
  int elbow;
  int gripper;
};

Pose currentPose = {90, 85, 95, 35};
const Pose HOME = {90, 85, 95, 35};
const Pose ABOVE_PICK = {45, 105, 75, 35};
const Pose PICK = {45, 125, 60, 75};
const Pose LIFT = {45, 90, 100, 75};
const Pose ABOVE_PLACE = {135, 90, 100, 75};
const Pose PLACE = {135, 120, 65, 35};

int angleToPulse(int angle) {
  angle = constrain(angle, 0, 180);
  return map(angle, 0, 180, SERVO_MIN, SERVO_MAX);
}

void setJoint(int joint, int angle) {
  pwm.setPWM(joint, 0, angleToPulse(angle));
}

void writePose(const Pose &pose) {
  setJoint(BASE, pose.base);
  setJoint(SHOULDER, pose.shoulder);
  setJoint(ELBOW, pose.elbow);
  setJoint(GRIPPER, pose.gripper);
}

int moveToward(int value, int target) {
  if (value < target) return value + 1;
  if (value > target) return value - 1;
  return value;
}

bool poseReached(const Pose &a, const Pose &b) {
  return a.base == b.base
      && a.shoulder == b.shoulder
      && a.elbow == b.elbow
      && a.gripper == b.gripper;
}

void moveSmooth(const Pose &target, int stepDelay = 18) {
  while (!poseReached(currentPose, target)) {
    currentPose.base =
      moveToward(currentPose.base, target.base);
    currentPose.shoulder =
      moveToward(currentPose.shoulder, target.shoulder);
    currentPose.elbow =
      moveToward(currentPose.elbow, target.elbow);
    currentPose.gripper =
      moveToward(currentPose.gripper, target.gripper);

    writePose(currentPose);
    delay(stepDelay);
  }
}

void pickAndPlace() {
  moveSmooth(HOME);
  moveSmooth(ABOVE_PICK);
  moveSmooth(PICK);
  delay(500);

  moveSmooth(LIFT);
  moveSmooth(ABOVE_PLACE);
  moveSmooth(PLACE);
  delay(500);

  moveSmooth(HOME);
}

void setup() {
  Serial.begin(115200);
  pinMode(START_BUTTON, INPUT_PULLUP);

  pwm.begin();
  pwm.setOscillatorFrequency(27000000);
  pwm.setPWMFreq(SERVO_FREQUENCY);
  delay(500);

  writePose(currentPose);
  Serial.println("Press the button to start.");
}

void loop() {
  if (digitalRead(START_BUTTON) == LOW) {
    delay(30);

    if (digitalRead(START_BUTTON) == LOW) {
      Serial.println("Automation cycle started");
      pickAndPlace();
      Serial.println("Automation cycle completed");

      while (digitalRead(START_BUTTON) == LOW) {
        delay(10);
      }
    }
  }
}`;

export default function RoboticArmAutomationPage() {
  useEffect(() => {
    const title = "Arduino Robotic Arm Automation: Pick-and-Place Guide";
    const description =
      "Build an Arduino robotic arm automation project using servo motors and PCA9685. Includes components, wiring, calibration, pick-and-place code and safety.";
    const canonical =
      "https://www.nextgenroboticx.com/projects/robotic-arm-automation";
    const image =
      "https://www.nextgenroboticx.com/images/projects/roboticarm.png";

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
    schema.id = "robotic-arm-howto-schema";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: title,
      description,
      image,
      totalTime: "PT12H",
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
              <span className="rounded-full bg-orange-400/15 px-4 py-2 text-sm font-semibold text-orange-300">
                Intermediate Project · Approximately 12 Hours
              </span>
              <h1 className="mt-7 text-4xl font-extrabold leading-tight sm:text-6xl">
                Robotic Arm Pick-and-Place Automation
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                Build and calibrate a four-axis Arduino robotic arm that performs a smooth, repeatable pick-and-place cycle.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
                {["Arduino", "Servo Motors", "PCA9685", "Automation"].map((item) => (
                  <span key={item} className="rounded-full border border-slate-600 px-4 py-2">{item}</span>
                ))}
              </div>
            </div>
            <img
              src="/images/projects/roboticarm.png"
              alt="Arduino robotic arm pick-and-place automation"
              className="aspect-video w-full rounded-3xl object-cover shadow-2xl"
            />
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-5 sm:px-6">
            <h2 className="text-3xl font-bold sm:text-4xl">How the automated arm works</h2>
            <div className="mt-9 grid gap-6 md:grid-cols-3">
              {[
                [Cpu, "Sequence", "Arduino moves through calibrated poses when the start button is pressed."],
                [Gauge, "Position", "PCA9685 sends repeatable PWM signals to the four servo joints."],
                [PackageCheck, "Transfer", "The gripper closes at the pick point and opens at the destination."],
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
            <h2 className="text-3xl font-bold sm:text-4xl">Components required</h2>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <table className="w-full min-w-[680px] text-left">
                <thead className="bg-slate-900 text-white"><tr><th className="p-4">Component</th><th className="p-4">Quantity</th><th className="p-4">Purpose</th></tr></thead>
                <tbody>{components.map(([name, quantity, purpose]) => (
                  <tr key={name} className="border-t border-slate-200"><td className="p-4 font-semibold">{name}</td><td className="p-4">{quantity}</td><td className="p-4 text-slate-600">{purpose}</td></tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto grid max-w-5xl gap-12 px-5 sm:px-6 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-3"><Wrench className="text-blue-600" size={30} /><h2 className="text-3xl font-bold">Connection details</h2></div>
              <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200">
                {connections.map(([from, to]) => (
                  <div key={from} className="grid gap-2 border-t border-slate-200 px-5 py-4 first:border-t-0 sm:grid-cols-2"><strong>{from}</strong><span className="text-slate-600">{to}</span></div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3"><CircuitBoard className="text-blue-600" size={30} /><h2 className="text-3xl font-bold">Example pose table</h2></div>
              <div className="mt-7 overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full min-w-[520px] text-left">
                  <thead className="bg-slate-900 text-white"><tr><th className="p-3">Pose</th><th className="p-3">Base</th><th className="p-3">Shoulder</th><th className="p-3">Elbow</th><th className="p-3">Gripper</th></tr></thead>
                  <tbody>{positions.map((row) => <tr key={row[0]} className="border-t border-slate-200">{row.map((cell) => <td key={cell} className="p-3">{cell}</td>)}</tr>)}</tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <ConnectionDiagramManager />

        <section className="bg-slate-950 py-16 text-white sm:py-20">
          <div className="mx-auto max-w-5xl px-5 sm:px-6">
            <div className="flex items-center gap-3"><Code2 className="text-orange-400" size={32} /><h2 className="text-3xl font-bold sm:text-4xl">Complete pick-and-place code</h2></div>
            <p className="mt-4 leading-7 text-slate-300">
              The sample pose values must be recalibrated for your arm before loading an object. Test with the arm supported and the workspace clear.
            </p>
            <pre className="mt-8 max-h-[760px] overflow-auto rounded-2xl border border-slate-700 bg-black p-5 text-sm leading-6 text-emerald-300"><code>{code}</code></pre>
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
                <h2 className="text-2xl font-bold text-amber-950">Mechanical and electrical safety</h2>
                <ul className="mt-4 space-y-3 text-amber-950">
                  {[
                    "Never power multiple arm servos from the Arduino 5V pin.",
                    "Keep hands away from the gripper, gears and joint pinch points while powered.",
                    "Secure the base to a stable surface before running an automatic sequence.",
                    "Use only lightweight test objects and install an accessible emergency power switch.",
                    "Stop immediately if a servo stalls, buzzes, overheats or forces a joint beyond its limit.",
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
                ["Arm shakes or Arduino resets", "Use a regulated high-current servo supply, common ground and a large capacitor near PCA9685 V+."],
                ["Gripper drops the object", "Reduce movement speed, adjust its closed angle and use a lighter object or rubber grip pads."],
                ["Pose is not repeatable", "Tighten brackets, remove mechanical play and always approach important poses from the same direction."],
                ["Joint moves past its limit", "Disconnect servo power, reduce its angle range and recalibrate before continuing."],
              ].map(([problem, solution]) => (
                <article key={problem} className="rounded-2xl bg-slate-50 p-6"><h3 className="font-bold">{problem}</h3><p className="mt-2 leading-7 text-slate-600">{solution}</p></article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <ProjectShare
        title="Arduino Robotic Arm Pick-and-Place Automation"
        description="Build and program a four-axis Arduino robotic arm for a smooth pick-and-place automation cycle."
      />
      <Footer />
    </div>
  );
}
