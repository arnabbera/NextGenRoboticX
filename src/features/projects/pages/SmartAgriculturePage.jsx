import { useEffect } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  CircuitBoard,
  Cloud,
  Code2,
  Droplets,
  Gauge,
  ShieldAlert,
  Sprout,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../../components/home/Footer";
import ProjectShare from "../components/ProjectShare";
import ConnectionDiagramManager from "../components/ConnectionDiagramManager";

const components = [
  ["ESP32 development board", "1", "Reads sensors and controls irrigation"],
  ["Capacitive soil-moisture sensor", "1", "Measures moisture without exposed electrodes"],
  ["DHT22 temperature and humidity sensor", "1", "Monitors local climate"],
  ["Water-level float switch", "1", "Prevents dry pump operation"],
  ["1-channel opto-isolated relay or MOSFET", "1", "Switches the DC water pump"],
  ["6V–12V DC water pump", "1", "Delivers irrigation water"],
  ["Protected pump power supply", "1", "Powers the pump independently"],
  ["Tubing, reservoir and drip outlet", "1 set", "Moves water to the plant"],
  ["Flyback diode for a DC pump", "1", "Suppresses inductive voltage spikes"],
  ["Breadboard, wires and enclosure", "As needed", "Creates and protects the prototype"],
];

const connections = [
  ["Soil sensor VCC / GND", "ESP32 3.3V / GND"],
  ["Soil sensor AO", "ESP32 GPIO 34 (ADC input)"],
  ["DHT22 VCC / GND", "ESP32 3.3V / GND"],
  ["DHT22 DATA", "ESP32 GPIO 4"],
  ["Float switch", "ESP32 GPIO 27 to GND using INPUT_PULLUP"],
  ["Relay or MOSFET input", "ESP32 GPIO 26"],
  ["Pump supply positive", "Relay COM or MOSFET power input"],
  ["Pump positive", "Relay NO or MOSFET switched output"],
  ["Pump negative", "Pump-supply negative"],
  ["ESP32 and driver ground", "Common signal ground where required"],
];

const steps = [
  {
    title: "Build the water system first",
    text: "Place the reservoir below the electronics, connect tubing securely and test for leaks using manual low-voltage pump power.",
  },
  {
    title: "Install the sensors",
    text: "Insert the capacitive sensor into the root zone without burying its electronics. Position the DHT22 above the soil and place the float switch at the minimum safe water level.",
  },
  {
    title: "Connect the ESP32 circuit",
    text: "Follow the wiring table. Keep wet components and pump wiring physically separated from the ESP32 and sensor connections.",
  },
  {
    title: "Calibrate dry and wet soil",
    text: "Record the raw sensor value in dry soil and fully watered soil. Replace SOIL_DRY and SOIL_WET in the sketch with your measurements.",
  },
  {
    title: "Set irrigation thresholds",
    text: "Choose a start threshold and a higher stop threshold. This hysteresis prevents the pump from switching rapidly near one value.",
  },
  {
    title: "Test with the pump disconnected",
    text: "Upload the program and confirm temperature, humidity, moisture percentage, tank status and requested pump state in Serial Monitor.",
  },
  {
    title: "Run a short pump test",
    text: "Reconnect the pump, keep the outlet in the reservoir and verify the maximum run-time protection stops it automatically.",
  },
  {
    title: "Test on one plant",
    text: "Start with short irrigation cycles and observe drainage. Adjust flow, threshold and run time for the plant and soil type.",
  },
  {
    title: "Add IoT monitoring",
    text: "Publish readings to a protected MQTT broker or Firebase through a trusted bridge. Display trends and alerts without exposing credentials.",
  },
  {
    title: "Weatherproof the installation",
    text: "Use ventilated sensor shields and sealed electronics enclosures, add cable glands and protect every connection from water and sunlight.",
  },
];

const code = String.raw`#include <WiFi.h>
#include <DHT.h>

#define SOIL_PIN 34
#define DHT_PIN 4
#define DHT_TYPE DHT22
#define FLOAT_PIN 27
#define PUMP_PIN 26

// Change these after measuring your own sensor
const int SOIL_DRY = 3200;
const int SOIL_WET = 1300;

// Pump starts below 35% and stops above 55%
const int START_WATERING = 35;
const int STOP_WATERING = 55;

const unsigned long SAMPLE_INTERVAL = 5000;
const unsigned long MAX_PUMP_TIME = 15000;
const unsigned long REST_TIME = 60000;

// Change for active-HIGH relay or MOSFET
const int PUMP_ON = LOW;
const int PUMP_OFF = HIGH;

DHT dht(DHT_PIN, DHT_TYPE);

bool pumpRunning = false;
unsigned long pumpStartedAt = 0;
unsigned long lastPumpStoppedAt = 0;
unsigned long lastSampleAt = 0;

int moisturePercent(int rawValue) {
  int percent = map(
    rawValue,
    SOIL_DRY,
    SOIL_WET,
    0,
    100
  );
  return constrain(percent, 0, 100);
}

bool waterAvailable() {
  // Adjust if your float switch logic is reversed
  return digitalRead(FLOAT_PIN) == LOW;
}

void stopPump(const char* reason) {
  digitalWrite(PUMP_PIN, PUMP_OFF);

  if (pumpRunning) {
    Serial.print("Pump stopped: ");
    Serial.println(reason);
  }

  pumpRunning = false;
  lastPumpStoppedAt = millis();
}

void startPump() {
  if (!waterAvailable()) {
    Serial.println("Pump blocked: reservoir is low");
    return;
  }

  if (millis() - lastPumpStoppedAt < REST_TIME) {
    Serial.println("Pump resting");
    return;
  }

  digitalWrite(PUMP_PIN, PUMP_ON);
  pumpRunning = true;
  pumpStartedAt = millis();
  Serial.println("Pump started");
}

void updateIrrigation(int moisture) {
  if (!waterAvailable()) {
    stopPump("low reservoir");
    return;
  }

  if (pumpRunning) {
    if (moisture >= STOP_WATERING) {
      stopPump("target moisture reached");
    } else if (millis() - pumpStartedAt >= MAX_PUMP_TIME) {
      stopPump("maximum run time reached");
    }
  } else if (moisture <= START_WATERING) {
    startPump();
  }
}

void setup() {
  Serial.begin(115200);

  pinMode(FLOAT_PIN, INPUT_PULLUP);
  pinMode(PUMP_PIN, OUTPUT);
  digitalWrite(PUMP_PIN, PUMP_OFF);

  analogReadResolution(12);
  dht.begin();

  // Permit an immediate first test after startup
  lastPumpStoppedAt = millis() - REST_TIME;
}

void loop() {
  if (millis() - lastSampleAt < SAMPLE_INTERVAL) {
    return;
  }

  lastSampleAt = millis();

  int soilRaw = analogRead(SOIL_PIN);
  int moisture = moisturePercent(soilRaw);
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

  Serial.print("Soil: ");
  Serial.print(moisture);
  Serial.print("% (raw ");
  Serial.print(soilRaw);
  Serial.print("), tank: ");
  Serial.print(waterAvailable() ? "OK" : "LOW");

  if (!isnan(temperature) && !isnan(humidity)) {
    Serial.print(", temperature: ");
    Serial.print(temperature, 1);
    Serial.print(" C, humidity: ");
    Serial.print(humidity, 1);
    Serial.print("%");
  }

  Serial.println();
  updateIrrigation(moisture);
}`;

export default function SmartAgriculturePage() {
  useEffect(() => {
    const title = "ESP32 Smart Agriculture and Automatic Irrigation Project";
    const description =
      "Build an ESP32 smart agriculture system with soil moisture, DHT22, water-level protection and automatic irrigation code, wiring and calibration.";
    const canonical =
      "https://www.nextgenroboticx.com/projects/smart-agriculture";
    const image =
      "https://www.nextgenroboticx.com/images/projects/agriculture.png";

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
    schema.id = "smart-agriculture-howto-schema";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: title,
      description,
      image,
      totalTime: "PT18H",
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
              <span className="rounded-full bg-emerald-400/15 px-4 py-2 text-sm font-semibold text-emerald-300">
                Advanced IoT Project · Approximately 18 Hours
              </span>
              <h1 className="mt-7 text-4xl font-extrabold leading-tight sm:text-6xl">
                ESP32 Smart Agriculture and Irrigation
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                Monitor soil and climate conditions and water a plant automatically with reservoir protection, hysteresis and pump run-time limits.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
                {["ESP32", "IoT", "Soil Sensor", "Automatic Irrigation"].map((item) => (
                  <span key={item} className="rounded-full border border-slate-600 px-4 py-2">{item}</span>
                ))}
              </div>
            </div>
            <img
              src="/images/projects/agriculture.png"
              alt="ESP32 smart agriculture automatic irrigation project"
              className="aspect-video w-full rounded-3xl object-cover shadow-2xl"
            />
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-5 sm:px-6">
            <h2 className="text-3xl font-bold sm:text-4xl">How the system works</h2>
            <div className="mt-9 grid gap-6 md:grid-cols-3">
              {[
                [Gauge, "Measure", "ESP32 reads calibrated soil moisture, temperature, humidity and reservoir status."],
                [Droplets, "Irrigate", "The pump starts only below the dry threshold and stops at the wet threshold or time limit."],
                [Cloud, "Monitor", "Readings can be published securely to an MQTT or Firebase dashboard for trends and alerts."],
              ].map(([Icon, title, text]) => (
                <article key={title} className="rounded-3xl border border-slate-200 p-6 shadow-sm">
                  <Icon className="text-emerald-600" size={30} />
                  <h3 className="mt-5 text-xl font-bold">{title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-5 sm:px-6">
            <div className="flex items-center gap-3"><Sprout className="text-emerald-600" size={32} /><h2 className="text-3xl font-bold sm:text-4xl">Components required</h2></div>
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
              <div className="flex items-center gap-3"><Wrench className="text-emerald-600" size={30} /><h2 className="text-3xl font-bold">Connection details</h2></div>
              <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200">
                {connections.map(([from, to]) => (
                  <div key={from} className="grid gap-2 border-t border-slate-200 px-5 py-4 first:border-t-0 sm:grid-cols-2"><strong>{from}</strong><span className="text-slate-600">{to}</span></div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3"><CircuitBoard className="text-emerald-600" size={30} /><h2 className="text-3xl font-bold">Control protections</h2></div>
              <div className="mt-7 space-y-4">
                {[
                  ["Hysteresis", "Different start and stop thresholds prevent rapid relay switching."],
                  ["Tank interlock", "A float switch prevents pumping when the reservoir is low."],
                  ["Run-time limit", "The pump stops automatically even if a sensor fails to change."],
                  ["Rest period", "A mandatory pause protects the pump and prevents overwatering."],
                ].map(([title, text]) => (
                  <article key={title} className="rounded-2xl bg-slate-50 p-5"><h3 className="font-bold">{title}</h3><p className="mt-2 text-slate-600">{text}</p></article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ConnectionDiagramManager />

        <section className="bg-slate-950 py-16 text-white sm:py-20">
          <div className="mx-auto max-w-5xl px-5 sm:px-6">
            <div className="flex items-center gap-3"><Code2 className="text-emerald-400" size={32} /><h2 className="text-3xl font-bold sm:text-4xl">Complete automatic-irrigation code</h2></div>
            <p className="mt-4 leading-7 text-slate-300">
              Calibrate the sensor and verify relay polarity before connecting the pump. The program includes dry-run, maximum-time and rest-period protections.
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
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-600 font-bold text-white">{index + 1}</span>
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
                <h2 className="text-2xl font-bold text-amber-950">Water and electrical safety</h2>
                <ul className="mt-4 space-y-3 text-amber-950">
                  {[
                    "Use only an isolated low-voltage DC pump for student projects.",
                    "Keep the ESP32, relay and power connections above and away from the reservoir.",
                    "Install a fuse, flyback protection and an accessible power switch.",
                    "Never handle wiring with wet hands or while any power source is connected.",
                    "Do not rely on automation alone; inspect plants, tubing, sensors and water level regularly.",
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
                ["Moisture percentage is reversed", "Measure dry and wet values again and confirm SOIL_DRY is mapped to 0 and SOIL_WET to 100."],
                ["Pump never starts", "Check float-switch logic, relay polarity, rest timer, pump supply and the dry threshold."],
                ["ESP32 resets with the pump", "Use separate regulated supplies, proper grounding, a flyback diode and short high-current wiring."],
                ["Plant is overwatered", "Shorten MAX_PUMP_TIME, increase REST_TIME, reduce flow and move the sensor into the active root zone."],
              ].map(([problem, solution]) => (
                <article key={problem} className="rounded-2xl bg-slate-50 p-6"><h3 className="font-bold">{problem}</h3><p className="mt-2 leading-7 text-slate-600">{solution}</p></article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <ProjectShare
        title="ESP32 Smart Agriculture and Automatic Irrigation"
        description="Build an ESP32 smart agriculture system with calibrated soil sensing and protected automatic irrigation."
      />
      <Footer />
    </div>
  );
}
