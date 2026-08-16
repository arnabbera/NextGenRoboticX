import { useEffect } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  CircuitBoard,
  Code2,
  Gauge,
  Lightbulb,
  ShieldAlert,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../../components/home/Footer";

const components = [
  ["Arduino Uno or compatible board", "1", "Runs the control program"],
  ["IR line-tracking sensor modules", "2", "Detect the black line"],
  ["L298N dual H-bridge motor driver", "1", "Controls both motors"],
  ["DC geared motors with wheels", "2", "Moves and steers the robot"],
  ["2WD chassis with caster wheel", "1 set", "Mechanical platform"],
  ["7.4V protected battery pack", "1", "Provides motor power"],
  ["Switch, jumper wires and hardware", "As needed", "Power, signal and mounting"],
  ["Black tape and white board", "As needed", "Creates the test track"],
];

const connections = [
  ["Left IR sensor VCC / GND", "Arduino 5V / GND"],
  ["Left IR sensor OUT", "Arduino A0"],
  ["Right IR sensor VCC / GND", "Arduino 5V / GND"],
  ["Right IR sensor OUT", "Arduino A1"],
  ["L298N ENA", "Arduino D5 (PWM)"],
  ["L298N ENB", "Arduino D6 (PWM)"],
  ["L298N IN1 / IN2", "Arduino D7 / D8"],
  ["L298N IN3 / IN4", "Arduino D9 / D10"],
  ["Left motor", "L298N OUT1 / OUT2"],
  ["Right motor", "L298N OUT3 / OUT4"],
  ["Battery positive / negative", "L298N +12V / GND"],
  ["Arduino GND", "L298N GND (common ground)"],
];

const logic = [
  ["White", "White", "Move forward"],
  ["Black", "White", "Turn left"],
  ["White", "Black", "Turn right"],
  ["Black", "Black", "Stop at junction or finish"],
];

const steps = [
  {
    title: "Build a simple track",
    text: "Place 18–25 mm wide black electrical tape on a flat white board. Begin with gentle curves and avoid sharp corners.",
  },
  {
    title: "Assemble the chassis",
    text: "Mount both motors, wheels and the caster. Confirm that the chassis rolls freely and both wheels are aligned.",
  },
  {
    title: "Mount the IR sensors",
    text: "Fix the sensors at the front, approximately 10–15 mm above the track. Place one sensor on each side of the line.",
  },
  {
    title: "Install Arduino and L298N",
    text: "Secure the boards with spacers or insulated tape. Keep motor wiring away from the sensor cables where possible.",
  },
  {
    title: "Complete all connections",
    text: "Follow the wiring table, connect the common ground and check battery polarity before switching on power.",
  },
  {
    title: "Calibrate the sensors",
    text: "Move each sensor over white and black surfaces. Adjust its potentiometer until the indicator changes reliably at the boundary.",
  },
  {
    title: "Upload the Arduino program",
    text: "Raise the wheels during the first test, upload the sketch and confirm the left and right sensor readings in Serial Monitor.",
  },
  {
    title: "Tune speed and steering",
    text: "Start slowly. Adjust BASE_SPEED, TURN_SPEED and sensor spacing until the robot follows curves without oscillating.",
  },
];

const arduinoCode = String.raw`const int LEFT_SENSOR = A0;
const int RIGHT_SENSOR = A1;

const int ENA = 5;
const int ENB = 6;
const int IN1 = 7;
const int IN2 = 8;
const int IN3 = 9;
const int IN4 = 10;

// Most IR modules output LOW when they detect a black line.
// Change LOW to HIGH if your modules behave in the opposite way.
const int BLACK = LOW;

const int BASE_SPEED = 145;
const int TURN_SPEED = 175;

void setMotorSpeed(int leftSpeed, int rightSpeed) {
  analogWrite(ENA, constrain(leftSpeed, 0, 255));
  analogWrite(ENB, constrain(rightSpeed, 0, 255));
}

void moveForward() {
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
  setMotorSpeed(BASE_SPEED, BASE_SPEED);
}

void turnLeft() {
  // Slow the left wheel and speed up the right wheel.
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
  setMotorSpeed(55, TURN_SPEED);
}

void turnRight() {
  // Speed up the left wheel and slow the right wheel.
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
  setMotorSpeed(TURN_SPEED, 55);
}

void stopMotors() {
  analogWrite(ENA, 0);
  analogWrite(ENB, 0);
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, LOW);
}

void setup() {
  pinMode(LEFT_SENSOR, INPUT);
  pinMode(RIGHT_SENSOR, INPUT);

  pinMode(ENA, OUTPUT);
  pinMode(ENB, OUTPUT);
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT);
  pinMode(IN4, OUTPUT);

  stopMotors();
  Serial.begin(9600);
}

void loop() {
  int leftValue = digitalRead(LEFT_SENSOR);
  int rightValue = digitalRead(RIGHT_SENSOR);

  bool leftOnBlack = leftValue == BLACK;
  bool rightOnBlack = rightValue == BLACK;

  Serial.print("Left: ");
  Serial.print(leftValue);
  Serial.print("  Right: ");
  Serial.println(rightValue);

  if (!leftOnBlack && !rightOnBlack) {
    moveForward();
  } else if (leftOnBlack && !rightOnBlack) {
    turnLeft();
  } else if (!leftOnBlack && rightOnBlack) {
    turnRight();
  } else {
    stopMotors();
  }

  delay(10);
}`;

function upsertMeta(name, content, property = false) {
  const attribute = property ? "property" : "name";
  let element = document.head.querySelector(`meta[${attribute}="${name}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

export default function LineFollowingRobotPage() {
  useEffect(() => {
    const title =
      "How to Build an Arduino Line Following Robot | Beginner Guide";
    const description =
      "Build a line following robot using Arduino Uno, IR sensors and L298N. Includes components, wiring, calibration, Arduino code and beginner steps.";
    const canonical =
      "https://www.nextgenroboticx.com/projects/line-following-robot";
    const image =
      "https://www.nextgenroboticx.com/images/projects/linefollower.png";

    document.title = title;
    upsertMeta("description", description);
    upsertMeta("robots", "index, follow");
    upsertMeta("og:title", title, true);
    upsertMeta("og:description", description, true);
    upsertMeta("og:type", "article", true);
    upsertMeta("og:url", canonical, true);
    upsertMeta("og:image", image, true);
    upsertMeta("twitter:card", "summary_large_image");

    let canonicalLink = document.head.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical;

    const schema = document.createElement("script");
    schema.id = "line-follower-howto-schema";
    schema.type = "application/ld+json";
    schema.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: title,
      description,
      image,
      totalTime: "PT5H",
      supply: components.map(([name]) => ({
        "@type": "HowToSupply",
        name,
      })),
      step: steps.map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: step.title,
        text: step.text,
      })),
    });

    document.getElementById("line-follower-howto-schema")?.remove();
    document.head.appendChild(schema);
    window.scrollTo(0, 0);

    return () => schema.remove();
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6">
          <Link to="/" className="text-xl font-bold text-blue-700 sm:text-2xl">
            NextGenRoboticX
          </Link>
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold transition hover:border-blue-500 hover:text-blue-600"
          >
            <ArrowLeft size={18} />
            Back to Projects
          </Link>
        </div>
      </header>

      <main>
        <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">
                Beginner Arduino Project
              </p>
              <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                Line Following Robot
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                Build a two-sensor robotic car that detects a black track,
                corrects its direction and follows curves automatically.
              </p>
              <div className="mt-7 flex flex-wrap gap-3 text-sm">
                {["Arduino Uno", "IR Sensors", "L298N", "Embedded C", "5 Hours"].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full bg-white/10 px-4 py-2 text-blue-100"
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>

            <img
              src="/images/projects/linefollower.png"
              alt="Arduino line following robot"
              className="aspect-video w-full rounded-3xl object-cover shadow-2xl"
            />
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-6">
            <div className="grid gap-8 lg:grid-cols-3">
              <article className="rounded-3xl bg-blue-50 p-6 sm:p-8">
                <CircuitBoard className="text-blue-600" size={34} />
                <h2 className="mt-5 text-2xl font-bold">How it works</h2>
                <p className="mt-3 leading-7 text-slate-600">
                  Two downward-facing IR sensors distinguish the dark track
                  from the light background. Arduino adjusts the left and right
                  motor speeds to keep the line centred.
                </p>
              </article>
              <article className="rounded-3xl bg-emerald-50 p-6 sm:p-8">
                <Gauge className="text-emerald-600" size={34} />
                <h2 className="mt-5 text-2xl font-bold">Control method</h2>
                <p className="mt-3 leading-7 text-slate-600">
                  Simple digital decisions control forward, left, right and
                  stop actions. PWM determines motor speed and steering
                  strength.
                </p>
              </article>
              <article className="rounded-3xl bg-amber-50 p-6 sm:p-8">
                <Lightbulb className="text-amber-600" size={34} />
                <h2 className="mt-5 text-2xl font-bold">Beginner tip</h2>
                <p className="mt-3 leading-7 text-slate-600">
                  Sensor height and calibration matter more than speed. Tune
                  the sensors first, then increase motor speed gradually.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-6">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Components required
            </h2>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <table className="w-full min-w-[650px] text-left">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="px-5 py-4">Component</th>
                    <th className="px-5 py-4">Quantity</th>
                    <th className="px-5 py-4">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  {components.map(([name, quantity, purpose]) => (
                    <tr key={name} className="border-t border-slate-200">
                      <td className="px-5 py-4 font-medium">{name}</td>
                      <td className="px-5 py-4">{quantity}</td>
                      <td className="px-5 py-4 text-slate-600">{purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold sm:text-4xl">
                Connection details
              </h2>
              <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200">
                {connections.map(([from, to]) => (
                  <div
                    key={from}
                    className="grid grid-cols-2 gap-4 border-b border-slate-200 px-5 py-4 last:border-b-0"
                  >
                    <strong>{from}</strong>
                    <span className="text-slate-600">{to}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold sm:text-4xl">
                Sensor decision table
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                This guide assumes each sensor outputs LOW over black. Reverse
                the BLACK constant if your modules behave differently.
              </p>
              <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200">
                <div className="grid grid-cols-3 bg-slate-900 px-5 py-4 font-semibold text-white">
                  <span>Left</span>
                  <span>Right</span>
                  <span>Action</span>
                </div>
                {logic.map(([left, right, action]) => (
                  <div
                    key={`${left}-${right}`}
                    className="grid grid-cols-3 border-t border-slate-200 px-5 py-4"
                  >
                    <span>{left}</span>
                    <span>{right}</span>
                    <strong>{action}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-950 py-16 text-white sm:py-20">
          <div className="mx-auto max-w-5xl px-5 sm:px-6">
            <div className="flex items-center gap-3">
              <Code2 className="text-blue-400" size={32} />
              <h2 className="text-3xl font-bold sm:text-4xl">Arduino code</h2>
            </div>
            <p className="mt-4 leading-7 text-slate-300">
              Upload the sketch, open Serial Monitor at 9600 baud and verify
              both sensor values before placing the robot on the track.
            </p>
            <pre className="mt-8 max-h-[700px] overflow-auto rounded-2xl border border-slate-700 bg-black p-5 text-sm leading-6 text-emerald-300">
              <code>{arduinoCode}</code>
            </pre>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-5 sm:px-6">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Step-by-step build guide
            </h2>
            <div className="mt-10 space-y-6">
              {steps.map((step, index) => (
                <article
                  key={step.title}
                  className="flex gap-5 rounded-3xl border border-slate-200 p-6 shadow-sm"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold">{step.title}</h3>
                    <p className="mt-2 leading-7 text-slate-600">{step.text}</p>
                  </div>
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
                <h2 className="text-2xl font-bold text-amber-950">
                  Safety and calibration notes
                </h2>
                <ul className="mt-4 space-y-3 text-amber-950">
                  {[
                    "Never power DC motors directly from the Arduino 5V pin.",
                    "Use a protected battery pack and verify polarity before switching on.",
                    "Connect Arduino and motor-driver grounds together.",
                    "Keep both sensors at the same height and angle.",
                    "Begin with low motor speed and a simple track.",
                  ].map((note) => (
                    <li key={note} className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 shrink-0" size={20} />
                      <span>{note}</span>
                    </li>
                  ))}
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
                ["Robot follows the white area", "Change the BLACK constant from LOW to HIGH."],
                ["Robot oscillates rapidly", "Reduce TURN_SPEED, lower sensor height or increase sensor spacing slightly."],
                ["One wheel runs backward", "Swap that motor's output wires or reverse its direction logic."],
                ["Sensors do not switch", "Adjust each onboard potentiometer while moving it over black and white."],
              ].map(([problem, solution]) => (
                <article key={problem} className="rounded-2xl bg-slate-50 p-6">
                  <h3 className="font-bold text-slate-900">{problem}</h3>
                  <p className="mt-2 leading-7 text-slate-600">{solution}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
