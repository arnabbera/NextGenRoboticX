import { useEffect } from "react";
import {
  ArrowLeft,
  Bot,
  CheckCircle2,
  CircuitBoard,
  Code2,
  Cpu,
  Gauge,
  ShieldAlert,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../../components/home/Footer";
import ProjectShare from "../components/ProjectShare";
import ConnectionDiagramManager from "../components/ConnectionDiagramManager";

const components = [
  ["Arduino Mega 2560", "1", "Runs the motion program"],
  ["PCA9685 16-channel servo driver", "1", "Generates stable servo signals"],
  ["Metal-gear servo motors", "12–16", "Moves hips, knees, ankles and arms"],
  ["Humanoid frame or 3D-printed brackets", "1 set", "Forms the robot body"],
  ["6V high-current regulated servo supply", "1", "Powers servos separately"],
  ["7.4V protected battery pack", "1", "Portable power source"],
  ["MPU6050 IMU (optional)", "1", "Measures body tilt"],
  ["HC-SR04 sensor (optional)", "1", "Detects obstacles"],
  ["Emergency power switch", "1", "Stops servo power immediately"],
  ["Jumper wires, screws and spacers", "As needed", "Electrical and mechanical assembly"],
];

const connections = [
  ["PCA9685 VCC / GND", "Arduino 5V / GND"],
  ["PCA9685 SDA / SCL", "Arduino Mega SDA 20 / SCL 21"],
  ["PCA9685 V+", "External regulated 6V servo supply"],
  ["Servo supply GND", "PCA9685 GND and Arduino GND"],
  ["Right hip / knee / ankle", "PCA9685 channels 0 / 1 / 2"],
  ["Left hip / knee / ankle", "PCA9685 channels 3 / 4 / 5"],
  ["Right shoulder / elbow", "PCA9685 channels 6 / 7"],
  ["Left shoulder / elbow", "PCA9685 channels 8 / 9"],
  ["Optional MPU6050 SDA / SCL", "Shared I²C bus: Mega 20 / 21"],
  ["Battery", "Regulator input through fuse and emergency switch"],
];

const joints = [
  ["0", "Right hip", "90°", "45°–135°"],
  ["1", "Right knee", "90°", "40°–140°"],
  ["2", "Right ankle", "90°", "60°–120°"],
  ["3", "Left hip", "90°", "45°–135°"],
  ["4", "Left knee", "90°", "40°–140°"],
  ["5", "Left ankle", "90°", "60°–120°"],
  ["6", "Right shoulder", "90°", "20°–160°"],
  ["7", "Right elbow", "90°", "30°–150°"],
  ["8", "Left shoulder", "90°", "20°–160°"],
  ["9", "Left elbow", "90°", "30°–150°"],
];

const steps = [
  {
    title: "Plan the joints and label every servo",
    text: "Assign one channel to each joint before assembly. Mark the servo, cable and bracket so mirrored left and right joints cannot be confused.",
  },
  {
    title: "Centre servos before mounting",
    text: "Run the centre command with horns removed, then fit each horn at the mechanical neutral position. This prevents immediate binding.",
  },
  {
    title: "Assemble the lower body",
    text: "Build both legs symmetrically, starting with ankles, knees and hips. Move each joint by hand through its safe range before tightening.",
  },
  {
    title: "Build the torso and arms",
    text: "Keep the battery low and central. Route servo wires with enough slack for movement but away from gears and sharp bracket edges.",
  },
  {
    title: "Connect the PCA9685",
    text: "Connect logic power to the Arduino and servo power to a separate regulated 6V supply. All grounds must be common.",
  },
  {
    title: "Calibrate one joint at a time",
    text: "With the robot supported and feet off the floor, find the safe minimum, centre and maximum angle for every joint. Record them in the table.",
  },
  {
    title: "Upload the motion program",
    text: "Install the Adafruit PWM Servo Driver library and upload the code. Start with the stand and wave routines before trying weight shifts.",
  },
  {
    title: "Test supported weight shifts",
    text: "Hold the robot in a safety frame while it bends knees and shifts its hips. Reduce motion ranges if any bracket flexes or servo stalls.",
  },
  {
    title: "Create a slow first step",
    text: "Walking requires controlled ankle, hip and knee sequences. Begin with very small steps on a non-slip surface and keep a hand ready to catch the robot.",
  },
  {
    title: "Add optional intelligence",
    text: "After stable motion works, add IMU fall detection, obstacle sensing, speech commands or an external Raspberry Pi for vision without changing the proven safety limits.",
  },
];

const code = String.raw`#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>

Adafruit_PWMServoDriver pwm =
  Adafruit_PWMServoDriver(0x40);

const int SERVO_MIN = 110;
const int SERVO_MAX = 510;
const int SERVO_FREQUENCY = 50;

enum Joint {
  RIGHT_HIP = 0,
  RIGHT_KNEE = 1,
  RIGHT_ANKLE = 2,
  LEFT_HIP = 3,
  LEFT_KNEE = 4,
  LEFT_ANKLE = 5,
  RIGHT_SHOULDER = 6,
  RIGHT_ELBOW = 7,
  LEFT_SHOULDER = 8,
  LEFT_ELBOW = 9
};

int currentAngle[10] = {
  90, 90, 90, 90, 90,
  90, 90, 90, 90, 90
};

int angleToPulse(int angle) {
  angle = constrain(angle, 0, 180);
  return map(angle, 0, 180, SERVO_MIN, SERVO_MAX);
}

void setJoint(int joint, int angle) {
  if (joint < 0 || joint >= 10) return;
  currentAngle[joint] = constrain(angle, 0, 180);
  pwm.setPWM(
    joint,
    0,
    angleToPulse(currentAngle[joint])
  );
}

void moveJointSmooth(
  int joint,
  int target,
  int stepDelay = 15
) {
  target = constrain(target, 0, 180);
  int start = currentAngle[joint];
  int direction = target >= start ? 1 : -1;

  for (int angle = start; angle != target; angle += direction) {
    setJoint(joint, angle);
    delay(stepDelay);
  }

  setJoint(joint, target);
}

void neutralPose() {
  for (int joint = 0; joint < 10; joint++) {
    moveJointSmooth(joint, 90, 8);
  }
}

void bendKnees() {
  moveJointSmooth(RIGHT_KNEE, 115);
  moveJointSmooth(LEFT_KNEE, 65);
  delay(500);
  moveJointSmooth(RIGHT_KNEE, 90);
  moveJointSmooth(LEFT_KNEE, 90);
}

void waveRightHand() {
  moveJointSmooth(RIGHT_SHOULDER, 35);
  moveJointSmooth(RIGHT_ELBOW, 45);

  for (int i = 0; i < 3; i++) {
    moveJointSmooth(RIGHT_ELBOW, 75, 10);
    moveJointSmooth(RIGHT_ELBOW, 35, 10);
  }

  moveJointSmooth(RIGHT_ELBOW, 90);
  moveJointSmooth(RIGHT_SHOULDER, 90);
}

void supportedWeightShift() {
  // Keep the robot supported during this routine
  moveJointSmooth(RIGHT_ANKLE, 100);
  moveJointSmooth(LEFT_ANKLE, 100);
  moveJointSmooth(RIGHT_HIP, 82);
  moveJointSmooth(LEFT_HIP, 82);
  delay(700);

  moveJointSmooth(RIGHT_ANKLE, 80);
  moveJointSmooth(LEFT_ANKLE, 80);
  moveJointSmooth(RIGHT_HIP, 98);
  moveJointSmooth(LEFT_HIP, 98);
  delay(700);

  neutralPose();
}

void setup() {
  Serial.begin(115200);
  pwm.begin();
  pwm.setOscillatorFrequency(27000000);
  pwm.setPWMFreq(SERVO_FREQUENCY);
  delay(500);

  neutralPose();

  Serial.println("Commands:");
  Serial.println("N = neutral pose");
  Serial.println("W = wave");
  Serial.println("B = bend knees");
  Serial.println("S = supported weight shift");
}

void loop() {
  if (!Serial.available()) return;

  char command = Serial.read();

  if (command == 'N' || command == 'n') neutralPose();
  if (command == 'W' || command == 'w') waveRightHand();
  if (command == 'B' || command == 'b') bendKnees();
  if (command == 'S' || command == 's') supportedWeightShift();
}`;

export default function HumanoidRobotPage() {
  useEffect(() => {
    const title = "How to Build a Humanoid Robot Using Arduino Mega";
    const description =
      "Build an Arduino humanoid robot using servo motors and a PCA9685 driver. Includes components, wiring, calibration, motion code, assembly and safety guidance.";
    const canonical =
      "https://www.nextgenroboticx.com/projects/humanoid-robot";
    const image =
      "https://www.nextgenroboticx.com/images/projects/humanoid.png";

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
    schema.id = "humanoid-howto-schema";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: title,
      description,
      image,
      totalTime: "PT30H",
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
              <span className="rounded-full bg-violet-400/15 px-4 py-2 text-sm font-semibold text-violet-300">
                Advanced Robotics Project · Approximately 30 Hours
              </span>
              <h1 className="mt-7 text-4xl font-extrabold leading-tight sm:text-6xl">
                Build a Humanoid Robot Using Arduino
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                Assemble a multi-servo humanoid, calibrate every joint and program safe standing, arm and supported balance movements.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
                {["Arduino Mega", "PCA9685", "Servo Motors", "Motion Control"].map((item) => (
                  <span key={item} className="rounded-full border border-slate-600 px-4 py-2">{item}</span>
                ))}
              </div>
            </div>
            <img
              src="/images/projects/humanoid.png"
              alt="Arduino Mega humanoid robot with servo motors"
              className="aspect-video w-full rounded-3xl object-cover shadow-2xl"
            />
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-5 sm:px-6">
            <h2 className="text-3xl font-bold sm:text-4xl">How the humanoid system works</h2>
            <div className="mt-9 grid gap-6 md:grid-cols-3">
              {[
                [Cpu, "Plan", "The Arduino runs timed joint poses and motion sequences."],
                [CircuitBoard, "Drive", "The PCA9685 produces stable PWM signals for up to sixteen servos."],
                [Bot, "Move", "Mirrored hip, knee, ankle and arm joints create coordinated body motion."],
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
              <div className="flex items-center gap-3"><Gauge className="text-blue-600" size={30} /><h2 className="text-3xl font-bold">Starter joint map</h2></div>
              <div className="mt-7 overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full min-w-[520px] text-left">
                  <thead className="bg-slate-900 text-white"><tr><th className="p-3">Channel</th><th className="p-3">Joint</th><th className="p-3">Centre</th><th className="p-3">Initial range</th></tr></thead>
                  <tbody>{joints.map((row) => <tr key={row[0]} className="border-t border-slate-200">{row.map((cell) => <td key={cell} className="p-3">{cell}</td>)}</tr>)}</tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <ConnectionDiagramManager />

        <section className="bg-slate-950 py-16 text-white sm:py-20">
          <div className="mx-auto max-w-5xl px-5 sm:px-6">
            <div className="flex items-center gap-3"><Code2 className="text-violet-400" size={32} /><h2 className="text-3xl font-bold sm:text-4xl">Arduino humanoid motion code</h2></div>
            <p className="mt-4 leading-7 text-slate-300">
              Support the robot above the floor during initial tests. Calibrate pulse limits and joint directions for your specific servos before increasing movement.
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
                <h2 className="text-2xl font-bold text-amber-950">Servo and battery safety</h2>
                <ul className="mt-4 space-y-3 text-amber-950">
                  {[
                    "Never power multiple servos from the Arduino 5V pin.",
                    "Use a fused regulated servo supply with enough current for simultaneous movement.",
                    "Keep fingers, hair and loose clothing away from moving joints and pinch points.",
                    "Test with the robot supported and install an accessible emergency power switch.",
                    "Stop immediately if a servo stalls, overheats, buzzes continuously or forces a bracket.",
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
                ["Servos jitter or reset", "Use a stronger regulated supply, short power wiring, a common ground and a bulk capacitor near PCA9685 V+."],
                ["Mirrored joint moves backward", "Reverse its angle in software or refit the horn at the correct neutral orientation."],
                ["Robot falls immediately", "Reduce joint ranges, lower the centre of mass and test supported weight shifts before stepping."],
                ["Servo becomes hot", "Disconnect power and inspect for mechanical binding, excessive load or an unsafe pulse range."],
              ].map(([problem, solution]) => (
                <article key={problem} className="rounded-2xl bg-slate-50 p-6"><h3 className="font-bold">{problem}</h3><p className="mt-2 leading-7 text-slate-600">{solution}</p></article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <ProjectShare
        title="Build a Humanoid Robot Using Arduino"
        description="Build and program a multi-servo humanoid robot using Arduino Mega and a PCA9685 driver."
      />
      <Footer />
    </div>
  );
}
