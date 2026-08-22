import { useEffect } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  CircuitBoard,
  Code2,
  Lightbulb,
  ShieldAlert,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../../components/home/Footer";
import ProjectShare from "../components/ProjectShare";
import ConnectionDiagramManager from "../components/ConnectionDiagramManager";

const components = [
  ["Arduino Uno or compatible board", "1", "Controls the robot"],
  ["HC-SR04 ultrasonic sensor", "1", "Measures obstacle distance"],
  ["SG90 micro servo", "1", "Turns the sensor left and right"],
  ["L298N dual H-bridge motor driver", "1", "Drives both motor channels"],
  ["DC geared motors with wheels", "2 or 4", "Moves the robotic car"],
  ["Robot chassis and caster wheel", "1 set", "Mechanical platform"],
  ["7.4V battery pack with switch", "1", "Motor and system power"],
  ["Jumper wires and mounting hardware", "As needed", "Electrical connections"],
];

const connections = [
  ["HC-SR04 VCC", "Arduino 5V"],
  ["HC-SR04 GND", "Arduino GND"],
  ["HC-SR04 TRIG", "Arduino A1"],
  ["HC-SR04 ECHO", "Arduino A2"],
  ["Servo signal", "Arduino D3"],
  ["Servo VCC / GND", "5V / common GND"],
  ["L298N ENA", "Arduino D5 (PWM)"],
  ["L298N ENB", "Arduino D6 (PWM)"],
  ["L298N IN1 / IN2", "Arduino D7 / D8"],
  ["L298N IN3 / IN4", "Arduino D9 / D10"],
  ["Left motor", "L298N OUT1 / OUT2"],
  ["Right motor", "L298N OUT3 / OUT4"],
  ["Battery positive / negative", "L298N +12V / GND"],
  ["Arduino GND", "L298N GND (common ground)"],
];

const steps = [
  {
    title: "Assemble the chassis",
    text: "Fix the motors to the chassis, attach the wheels and caster, and ensure every wheel rotates freely.",
  },
  {
    title: "Mount the controller and driver",
    text: "Secure the Arduino and L298N using spacers or double-sided mounting tape. Keep metal parts away from exposed solder joints.",
  },
  {
    title: "Install the sensor and servo",
    text: "Mount the HC-SR04 on the SG90 horn, then place the servo at the front. Set the horn near its centre position before tightening it.",
  },
  {
    title: "Connect the motor driver",
    text: "Wire the left motors to OUT1/OUT2 and right motors to OUT3/OUT4. Connect the Arduino direction and PWM pins according to the table.",
  },
  {
    title: "Connect the ultrasonic sensor",
    text: "Connect VCC, GND, TRIG and ECHO carefully. On a 5V Arduino Uno, the HC-SR04 ECHO can connect directly to A2.",
  },
  {
    title: "Complete the power wiring",
    text: "Connect the battery to the L298N motor supply and join Arduino GND to L298N GND. Never power the motors from the Arduino 5V pin.",
  },
  {
    title: "Upload and test the program",
    text: "Raise the wheels off the table for the first test. Upload the code, open Serial Monitor at 9600 baud and confirm distance readings.",
  },
  {
    title: "Tune movement and distance",
    text: "Adjust SAFE_DISTANCE, MOTOR_SPEED and turn timing for your chassis, motor speed and room conditions.",
  },
];

const arduinoCode = String.raw`#include <Servo.h>

const int TRIG_PIN = A1;
const int ECHO_PIN = A2;
const int SERVO_PIN = 3;

const int ENA = 5;
const int ENB = 6;
const int IN1 = 7;
const int IN2 = 8;
const int IN3 = 9;
const int IN4 = 10;

const int SAFE_DISTANCE = 25;  // centimetres
const int MOTOR_SPEED = 170;   // 0 to 255

Servo sensorServo;

long readDistanceCm() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  long duration = pulseIn(ECHO_PIN, HIGH, 30000);

  if (duration == 0) {
    return 400;
  }

  return duration * 0.0343 / 2;
}

void setSpeed(int speedValue) {
  analogWrite(ENA, speedValue);
  analogWrite(ENB, speedValue);
}

void moveForward() {
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
  setSpeed(MOTOR_SPEED);
}

void moveBackward() {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, HIGH);
  setSpeed(MOTOR_SPEED);
}

void turnLeft() {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
  setSpeed(MOTOR_SPEED);
}

void turnRight() {
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, HIGH);
  setSpeed(MOTOR_SPEED);
}

void stopMotors() {
  analogWrite(ENA, 0);
  analogWrite(ENB, 0);
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, LOW);
}

long lookAt(int angle) {
  sensorServo.write(angle);
  delay(450);
  return readDistanceCm();
}

void avoidObstacle() {
  stopMotors();
  delay(200);

  moveBackward();
  delay(350);
  stopMotors();

  long leftDistance = lookAt(150);
  long rightDistance = lookAt(30);

  sensorServo.write(90);
  delay(300);

  if (leftDistance > rightDistance) {
    turnLeft();
  } else {
    turnRight();
  }

  delay(500);
  stopMotors();
}

void setup() {
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);

  pinMode(ENA, OUTPUT);
  pinMode(ENB, OUTPUT);
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT);
  pinMode(IN4, OUTPUT);

  sensorServo.attach(SERVO_PIN);
  sensorServo.write(90);

  stopMotors();
  Serial.begin(9600);
  delay(1000);
}

void loop() {
  long distance = readDistanceCm();

  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");

  if (distance > SAFE_DISTANCE) {
    moveForward();
  } else {
    avoidObstacle();
  }

  delay(60);
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

export default function ObstacleAvoidingRobotPage() {
  useEffect(() => {
    const title =
      "How to Build an Arduino Obstacle Avoiding Robot | Beginner Guide";
    const description =
      "Build an obstacle avoiding robotic car using Arduino Uno, HC-SR04, L298N and servo. Includes components, wiring, code and step-by-step instructions.";
    const canonical =
      "https://www.nextgenroboticx.com/projects/obstacle-avoiding-robot";
    const image =
      "https://www.nextgenroboticx.com/images/projects/obstacle.png";

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
    schema.id = "project-howto-schema";
    schema.type = "application/ld+json";
    schema.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: title,
      description,
      image,
      totalTime: "PT6H",
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

    document.getElementById("project-howto-schema")?.remove();
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
                Obstacle Avoiding Robotic Car
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                Build a robotic car that measures the path ahead, stops before
                an obstacle, scans both sides and automatically chooses a clear
                direction.
              </p>
              <div className="mt-7 flex flex-wrap gap-3 text-sm">
                {["Arduino Uno", "HC-SR04", "L298N", "SG90 Servo", "6 Hours"].map(
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
              src="/images/projects/obstacle.png"
              alt="Arduino obstacle avoiding robotic car"
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
                  The ultrasonic sensor measures distance using sound pulses.
                  When an obstacle is too close, the Arduino reverses the car,
                  rotates the sensor and turns toward the clearer side.
                </p>
              </article>

              <article className="rounded-3xl bg-emerald-50 p-6 sm:p-8">
                <Wrench className="text-emerald-600" size={34} />
                <h2 className="mt-5 text-2xl font-bold">Skills learned</h2>
                <p className="mt-3 leading-7 text-slate-600">
                  Arduino programming, PWM motor control, ultrasonic distance
                  measurement, servo positioning, wiring and systematic
                  troubleshooting.
                </p>
              </article>

              <article className="rounded-3xl bg-amber-50 p-6 sm:p-8">
                <Lightbulb className="text-amber-600" size={34} />
                <h2 className="mt-5 text-2xl font-bold">Beginner tip</h2>
                <p className="mt-3 leading-7 text-slate-600">
                  Test one subsystem at a time: sensor, servo, left motor and
                  right motor. Combine them only after each part works.
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
          <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="text-3xl font-bold sm:text-4xl">
                Connection details
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                Follow the pin mapping exactly, then verify every connection
                before connecting the battery.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200">
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
        </section>

        <ConnectionDiagramManager />

        <section className="bg-slate-950 py-16 text-white sm:py-20">
          <div className="mx-auto max-w-5xl px-5 sm:px-6">
            <div className="flex items-center gap-3">
              <Code2 className="text-blue-400" size={32} />
              <h2 className="text-3xl font-bold sm:text-4xl">Arduino code</h2>
            </div>
            <p className="mt-4 leading-7 text-slate-300">
              Install the built-in Servo library through the Arduino IDE, select
              the correct board and port, and upload this sketch.
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
                  Safety and power notes
                </h2>
                <ul className="mt-4 space-y-3 text-amber-950">
                  {[
                    "Never connect DC motors directly to Arduino output pins.",
                    "Use a protected battery pack and observe correct polarity.",
                    "All control electronics must share a common ground.",
                    "Switch off power before changing motor or sensor wiring.",
                    "Keep fingers, loose wires and clothing away from moving wheels.",
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
                ["Car moves backward", "Swap that motor's two output wires or reverse its direction logic."],
                ["Distance always reads zero", "Check TRIG/ECHO pins, common ground and the Serial Monitor output."],
                ["Servo causes resets", "Use a stable 5V supply with enough current and keep the grounds common."],
                ["Car turns the wrong way", "Swap left/right motor connections or exchange the turn functions."],
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

      <ProjectShare
        title="Obstacle Avoiding Robot Using Arduino"
        description="Build an obstacle avoiding robotic car with Arduino, an ultrasonic sensor and an L298N motor driver."
      />

      <Footer />
    </div>
  );
}
