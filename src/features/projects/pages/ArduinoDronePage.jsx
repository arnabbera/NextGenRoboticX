import { useEffect } from "react";
import {
  ArrowLeft,
  BatteryCharging,
  CheckCircle2,
  CircuitBoard,
  Code2,
  Gauge,
  Radio,
  ShieldAlert,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../../components/home/Footer";
import ProjectShare from "../components/ProjectShare";
import ConnectionDiagramManager from "../components/ConnectionDiagramManager";

const components = [
  ["450 mm X-frame", "1", "Stable beginner quadcopter platform"],
  ["Arduino Nano or Uno", "1", "Runs the configured flight firmware"],
  ["MPU6050 IMU module", "1", "Measures rotation and acceleration"],
  ["1000 KV brushless motors", "4", "Produces lift"],
  ["30 A electronic speed controllers", "4", "Controls motor speed"],
  ["10 × 4.5-inch CW/CCW propellers", "2 pairs", "Produces balanced thrust"],
  ["3S LiPo battery, 2200–3000 mAh", "1", "Powers the drone"],
  ["Power-distribution board", "1", "Distributes battery power to ESCs"],
  ["6-channel transmitter and receiver", "1 set", "Provides pilot commands"],
  ["5V BEC or regulated supply", "1", "Powers Arduino and receiver"],
  ["LiPo balance charger and safety bag", "1 each", "Charges and stores the battery safely"],
];

const connections = [
  ["MPU6050 VCC / GND", "Arduino 5V or 3.3V per breakout / GND"],
  ["MPU6050 SDA / SCL", "Arduino A4 / A5"],
  ["ESC 1 signal — front left", "Arduino D3"],
  ["ESC 2 signal — front right", "Arduino D5"],
  ["ESC 3 signal — rear right", "Arduino D6"],
  ["ESC 4 signal — rear left", "Arduino D9"],
  ["All ESC signal grounds", "Arduino GND"],
  ["PPM receiver signal", "Arduino D2"],
  ["Receiver VCC / GND", "Regulated 5V / common GND"],
  ["Battery", "Power-distribution board through an XT60 connector"],
  ["Each ESC power pair", "Power-distribution board output"],
  ["Each ESC motor output", "Its brushless motor's three wires"],
];

const motorLayout = [
  ["Front left", "Motor 1", "Counter-clockwise", "CCW propeller"],
  ["Front right", "Motor 2", "Clockwise", "CW propeller"],
  ["Rear right", "Motor 3", "Counter-clockwise", "CCW propeller"],
  ["Rear left", "Motor 4", "Clockwise", "CW propeller"],
];

const steps = [
  {
    title: "Assemble and inspect the frame",
    text: "Build the X-frame on a flat surface, use thread-lock where appropriate and mark the front clearly. The arms must be straight and equally rigid.",
  },
  {
    title: "Mount motors and power system",
    text: "Secure one motor at each arm end. Mount the power-distribution board centrally, route high-current wires away from the IMU and insulate every solder joint.",
  },
  {
    title: "Install the Arduino and MPU6050",
    text: "Place the flight controller near the exact centre with its forward direction aligned to the frame. Mount the IMU flat on vibration-damping foam.",
  },
  {
    title: "Connect ESC signals and receiver",
    text: "Follow the connection table and create one common signal ground. Use a regulated 5V source for the Arduino and receiver; never apply the 3S battery directly to a 5V pin.",
  },
  {
    title: "Run the propeller-free motor test",
    text: "Remove every propeller, upload the test sketch and verify the motor numbers and directions at minimum power. Swap any two motor wires to reverse that motor.",
  },
  {
    title: "Install proven flight firmware",
    text: "Use a maintained Arduino-compatible flight firmware such as MultiWii, select QUADX and MPU6050, map the four motor pins, and confirm receiver endpoints in its configuration tool.",
  },
  {
    title: "Calibrate sensors, radio and ESCs",
    text: "Keep the frame level during gyro calibration. Verify roll, pitch, yaw and throttle move correctly, configure an arming switch and set a radio failsafe that stops the motors.",
  },
  {
    title: "Balance and fit propellers",
    text: "Statically balance every propeller and install the correct CW or CCW propeller only after all bench tests pass. Tighten them according to the motor design.",
  },
  {
    title: "Perform a restrained low-power test",
    text: "In an open legal flying area, stand well clear and briefly raise power while the craft is restrained by an experienced builder. Stop immediately if it vibrates or tilts unexpectedly.",
  },
  {
    title: "Make the first hover",
    text: "Choose calm weather and a wide area away from people, roads and buildings. Lift only a few centimetres, land, inspect temperatures and fasteners, then tune gradually.",
  },
];

const testCode = String.raw`#include <Servo.h>

// PROPELLERS MUST BE REMOVED FOR THIS TEST
const int MOTOR_PINS[4] = {3, 5, 6, 9};
const int MIN_SIGNAL = 1000;
const int TEST_SIGNAL = 1100;
const int MAX_TEST_SIGNAL = 1200;

Servo motors[4];

void writeAll(int microseconds) {
  microseconds = constrain(
    microseconds,
    MIN_SIGNAL,
    MAX_TEST_SIGNAL
  );

  for (int i = 0; i < 4; i++) {
    motors[i].writeMicroseconds(microseconds);
  }
}

void stopAll() {
  writeAll(MIN_SIGNAL);
}

void testOneMotor(int motorNumber) {
  if (motorNumber < 1 || motorNumber > 4) return;

  stopAll();
  delay(1000);

  motors[motorNumber - 1].writeMicroseconds(TEST_SIGNAL);
  Serial.print("Testing motor ");
  Serial.println(motorNumber);

  delay(2000);
  stopAll();
}

void setup() {
  Serial.begin(115200);

  for (int i = 0; i < 4; i++) {
    motors[i].attach(MOTOR_PINS[i], 1000, 2000);
  }

  stopAll();

  // Allow ESCs to initialise at minimum signal
  delay(5000);

  Serial.println("PROPELLERS REMOVED?");
  Serial.println("Send 1, 2, 3 or 4 to test one motor.");
  Serial.println("Send S to stop all motors.");
}

void loop() {
  if (!Serial.available()) return;

  char command = Serial.read();

  if (command >= '1' && command <= '4') {
    testOneMotor(command - '0');
  } else if (command == 's' || command == 'S') {
    stopAll();
    Serial.println("All motors stopped");
  }
}`;

export default function ArduinoDronePage() {
  useEffect(() => {
    const title = "Build Your First Arduino Drone: Beginner Quadcopter Guide";
    const description =
      "Build your first Arduino quadcopter with an MPU6050, brushless motors, ESCs and radio receiver. Includes wiring, motor-test code, calibration and safety steps.";
    const canonical =
      "https://www.nextgenroboticx.com/projects/arduino-drone";
    const image =
      "https://www.nextgenroboticx.com/images/projects/drone.png";

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
    schema.id = "arduino-drone-howto-schema";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: title,
      description,
      image,
      totalTime: "PT20H",
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
                Advanced Project · Approximately 20 Hours
              </span>
              <h1 className="mt-7 text-4xl font-extrabold leading-tight sm:text-6xl">
                Build Your First Arduino Drone
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                Assemble an educational Arduino quadcopter, understand its flight system, verify each motor safely and configure proven flight firmware.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
                {["Arduino", "MPU6050", "ESC", "Radio Control"].map((item) => (
                  <span key={item} className="rounded-full border border-slate-600 px-4 py-2">{item}</span>
                ))}
              </div>
            </div>
            <img
              src="/images/projects/drone.png"
              alt="Build your first Arduino quadcopter drone"
              className="aspect-video w-full rounded-3xl object-cover shadow-2xl"
            />
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-5 sm:px-6">
            <h2 className="text-3xl font-bold sm:text-4xl">How a quadcopter flies</h2>
            <div className="mt-9 grid gap-6 md:grid-cols-3">
              {[
                [Gauge, "Measure", "The MPU6050 measures angular motion and acceleration hundreds of times per second."],
                [CircuitBoard, "Stabilise", "Flight firmware compares the requested attitude with sensor measurements and runs PID control."],
                [Radio, "Command", "The receiver supplies throttle, roll, pitch and yaw commands from the pilot."],
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
              <BatteryCharging className="text-blue-600" size={32} />
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
          <div className="mx-auto grid max-w-5xl gap-12 px-5 sm:px-6 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-3">
                <Wrench className="text-blue-600" size={30} />
                <h2 className="text-3xl font-bold">Connection details</h2>
              </div>
              <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200">
                {connections.map(([from, to]) => (
                  <div key={from} className="grid grid-cols-2 border-t border-slate-200 px-5 py-4 first:border-t-0">
                    <strong>{from}</strong><span className="text-slate-600">{to}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold">Motor layout</h2>
              <p className="mt-4 leading-7 text-slate-600">
                View the craft from above with its marked front pointing away from you.
              </p>
              <div className="mt-7 overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full min-w-[520px] text-left">
                  <thead className="bg-slate-900 text-white"><tr><th className="p-3">Position</th><th className="p-3">Motor</th><th className="p-3">Rotation</th><th className="p-3">Propeller</th></tr></thead>
                  <tbody>{motorLayout.map((row) => <tr key={row[0]} className="border-t border-slate-200">{row.map((cell) => <td key={cell} className="p-3">{cell}</td>)}</tr>)}</tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <ConnectionDiagramManager />

        <section className="bg-slate-950 py-16 text-white sm:py-20">
          <div className="mx-auto max-w-5xl px-5 sm:px-6">
            <div className="flex items-center gap-3">
              <Code2 className="text-cyan-400" size={32} />
              <h2 className="text-3xl font-bold sm:text-4xl">Propeller-free motor test</h2>
            </div>
            <p className="mt-4 leading-7 text-slate-300">
              This diagnostic sketch is intentionally not flight software. Remove all propellers before connecting the battery, then test one motor at a time.
            </p>
            <pre className="mt-8 max-h-[720px] overflow-auto rounded-2xl border border-slate-700 bg-black p-5 text-sm leading-6 text-emerald-300">
              <code>{testCode}</code>
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

        <section className="bg-red-50 py-14">
          <div className="mx-auto max-w-5xl px-5 sm:px-6">
            <div className="flex gap-4">
              <ShieldAlert className="shrink-0 text-red-700" size={30} />
              <div>
                <h2 className="text-2xl font-bold text-red-950">Mandatory drone and LiPo safety</h2>
                <ul className="mt-4 space-y-3 text-red-950">
                  {[
                    "Remove all propellers during configuration, calibration and motor testing.",
                    "Treat a connected LiPo and armed drone as dangerous rotating machinery.",
                    "Use a balance charger, inspect packs for damage and store them in a LiPo-safe bag.",
                    "Configure radio failsafe and a dedicated motor-disarm switch before fitting propellers.",
                    "Fly only in a legal open area and follow applicable aviation and local regulations.",
                    "Beginners should complete the first powered tests with an experienced drone builder.",
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
                ["One motor spins backward", "Disconnect power and swap any two of that motor's three ESC wires."],
                ["Drone flips immediately", "Stop, remove propellers and verify motor numbering, rotation, propeller type and IMU orientation."],
                ["Strong vibration", "Balance propellers, check bent shafts and isolate the MPU6050 from frame vibration."],
                ["Receiver commands are wrong", "Verify channel mapping, direction, endpoints and failsafe in the firmware configuration tool."],
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
        title="Build Your First Arduino Drone"
        description="Build an educational Arduino quadcopter with an MPU6050, ESCs, brushless motors and radio control."
      />
      <Footer />
    </div>
  );
}
