import { useEffect } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  CircuitBoard,
  Cloud,
  Code2,
  Gauge,
  Lightbulb,
  ShieldAlert,
  Wifi,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../../components/home/Footer";
import ProjectShare from "../components/ProjectShare";

const components = [
  ["ESP32 development board", "1", "Reads sensors and connects to Wi-Fi"],
  ["DHT11 or DHT22 sensor", "1", "Measures temperature and humidity"],
  ["Capacitive soil-moisture sensor", "1", "Measures soil moisture safely"],
  ["Breadboard and jumper wires", "1 set", "Creates the prototype connections"],
  ["USB cable and 5V supply", "1", "Programs and powers the ESP32"],
  ["Optional 0.96-inch OLED display", "1", "Shows local readings"],
  ["Wi-Fi network", "1", "Connects the project to the internet"],
  ["MQTT broker and Firebase project", "1 each", "Stores and displays readings"],
];

const connections = [
  ["DHT sensor VCC", "ESP32 3.3V"],
  ["DHT sensor GND", "ESP32 GND"],
  ["DHT sensor DATA", "ESP32 GPIO 4"],
  ["Soil sensor VCC", "ESP32 3.3V"],
  ["Soil sensor GND", "ESP32 GND"],
  ["Soil sensor AO", "ESP32 GPIO 34 (ADC)"],
  ["Optional OLED VCC / GND", "ESP32 3.3V / GND"],
  ["Optional OLED SDA / SCL", "ESP32 GPIO 21 / GPIO 22"],
];

const steps = [
  {
    title: "Create the sensor circuit",
    text: "Connect the DHT and capacitive soil sensor according to the table. Use 3.3V so the ESP32 analogue input never receives more than its safe voltage.",
  },
  {
    title: "Install the Arduino libraries",
    text: "In Arduino IDE Library Manager, install DHT sensor library by Adafruit, Adafruit Unified Sensor and PubSubClient.",
  },
  {
    title: "Configure the ESP32 board",
    text: "Install the ESP32 board package, select your exact ESP32 board and choose the correct serial port.",
  },
  {
    title: "Prepare an MQTT broker",
    text: "Use a private broker or a local Mosquitto server. Enter its hostname, port, username and password in the sketch. Avoid public brokers for personal data.",
  },
  {
    title: "Calibrate soil readings",
    text: "Record the raw value in dry air and then in wet soil. Replace SOIL_DRY and SOIL_WET in the code with your measured values.",
  },
  {
    title: "Upload and test",
    text: "Add your Wi-Fi details, upload the sketch and open Serial Monitor at 115200 baud. Confirm that all readings are valid and MQTT connects.",
  },
  {
    title: "Connect a dashboard",
    text: "Subscribe to nextgenroboticx/monitoring/data using Node-RED, MQTT Explorer or your own dashboard. Display temperature, humidity and soil moisture.",
  },
  {
    title: "Store data in Firebase",
    text: "Use a small trusted Node-RED or server bridge to validate MQTT messages and write them into Firebase Realtime Database. Keep Firebase administrative credentials off the ESP32.",
  },
];

const code = String.raw`#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>

// Replace these values before uploading
const char* WIFI_SSID = "YOUR_WIFI_NAME";
const char* WIFI_PASSWORD = "YOUR_WIFI_PASSWORD";
const char* MQTT_HOST = "broker.example.com";
const int MQTT_PORT = 1883;
const char* MQTT_USER = "YOUR_MQTT_USERNAME";
const char* MQTT_PASSWORD = "YOUR_MQTT_PASSWORD";

#define DHT_PIN 4
#define DHT_TYPE DHT11
#define SOIL_PIN 34

// Replace with values measured during calibration
const int SOIL_DRY = 3200;
const int SOIL_WET = 1300;

WiFiClient wifiClient;
PubSubClient mqttClient(wifiClient);
DHT dht(DHT_PIN, DHT_TYPE);

unsigned long lastReading = 0;
const unsigned long INTERVAL = 10000;

void connectWiFi() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println();
  Serial.print("Connected. IP: ");
  Serial.println(WiFi.localIP());
}

void connectMQTT() {
  while (!mqttClient.connected()) {
    String clientId = "ESP32-Monitor-";
    clientId += String((uint32_t)ESP.getEfuseMac(), HEX);

    if (mqttClient.connect(
          clientId.c_str(),
          MQTT_USER,
          MQTT_PASSWORD
        )) {
      Serial.println("MQTT connected");
      mqttClient.publish(
        "nextgenroboticx/monitoring/status",
        "online",
        true
      );
    } else {
      Serial.print("MQTT failed, state: ");
      Serial.println(mqttClient.state());
      delay(3000);
    }
  }
}

int soilPercent(int rawValue) {
  int percent = map(rawValue, SOIL_DRY, SOIL_WET, 0, 100);
  return constrain(percent, 0, 100);
}

void publishReadings() {
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  int soilRaw = analogRead(SOIL_PIN);
  int soil = soilPercent(soilRaw);

  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("DHT reading failed");
    return;
  }

  char payload[180];
  snprintf(
    payload,
    sizeof(payload),
    "{\"temperature\":%.1f,\"humidity\":%.1f,"
    "\"soilMoisture\":%d,\"soilRaw\":%d}",
    temperature,
    humidity,
    soil,
    soilRaw
  );

  bool sent = mqttClient.publish(
    "nextgenroboticx/monitoring/data",
    payload,
    true
  );

  Serial.println(payload);
  Serial.println(sent ? "Published" : "Publish failed");
}

void setup() {
  Serial.begin(115200);
  analogReadResolution(12);
  dht.begin();

  connectWiFi();
  mqttClient.setServer(MQTT_HOST, MQTT_PORT);
  mqttClient.setBufferSize(256);
}

void loop() {
  if (WiFi.status() != WL_CONNECTED) {
    connectWiFi();
  }

  if (!mqttClient.connected()) {
    connectMQTT();
  }

  mqttClient.loop();

  if (millis() - lastReading >= INTERVAL) {
    lastReading = millis();
    publishReadings();
  }
}`;

export default function IoTSmartMonitoringPage() {
  useEffect(() => {
    const title = "IoT Smart Monitoring Using ESP32, MQTT & Firebase";
    const description =
      "Build an ESP32 IoT monitoring system with DHT and soil sensors, MQTT, Firebase storage, wiring, code, calibration and beginner-friendly steps.";
    const canonical =
      "https://www.nextgenroboticx.com/projects/iot-smart-monitoring";
    const image =
      "https://www.nextgenroboticx.com/images/projects/iot.png";

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
    schema.id = "iot-monitoring-howto-schema";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: title,
      description,
      image,
      totalTime: "PT8H",
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
                Beginner IoT Project · Approximately 8 Hours
              </span>
              <h1 className="mt-7 text-4xl font-extrabold leading-tight sm:text-6xl">
                IoT Smart Monitoring Using ESP32
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                Measure temperature, humidity and soil moisture, publish readings through MQTT and store trusted data in Firebase for a real-time dashboard.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
                {["ESP32", "MQTT", "Firebase", "DHT Sensor"].map((item) => (
                  <span key={item} className="rounded-full border border-slate-600 px-4 py-2">{item}</span>
                ))}
              </div>
            </div>
            <img
              src="/images/projects/iot.png"
              alt="ESP32 IoT smart monitoring project"
              className="aspect-video w-full rounded-3xl object-cover shadow-2xl"
            />
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-5 sm:px-6">
            <h2 className="text-3xl font-bold sm:text-4xl">How the system works</h2>
            <div className="mt-9 grid gap-6 md:grid-cols-3">
              {[
                [Gauge, "Sense", "The ESP32 reads temperature, humidity and calibrated soil moisture."],
                [Wifi, "Publish", "The device sends a compact JSON message to a protected MQTT topic."],
                [Cloud, "Visualise", "A trusted bridge stores validated readings in Firebase for dashboards."],
              ].map(([Icon, title, text]) => (
                <article key={title} className="rounded-3xl border border-slate-200 p-6 shadow-sm">
                  <Icon className="text-blue-600" size={30} />
                  <h3 className="mt-5 text-xl font-bold">{title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{text}</p>
                </article>
              ))}
            </div>
            <div className="mt-8 flex gap-4 rounded-2xl bg-blue-50 p-6 text-blue-950">
              <Lightbulb className="shrink-0 text-blue-600" />
              <p className="leading-7">
                <strong>Beginner tip:</strong> First test each sensor locally in Serial Monitor. Add Wi-Fi and MQTT only after the readings are stable.
              </p>
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
              <table className="w-full min-w-[650px] text-left">
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
              <h2 className="text-3xl font-bold">MQTT data format</h2>
              <p className="mt-4 leading-7 text-slate-600">
                The ESP32 publishes retained JSON data to <strong>nextgenroboticx/monitoring/data</strong> every ten seconds.
              </p>
              <pre className="mt-7 overflow-auto rounded-2xl bg-slate-950 p-5 text-sm text-emerald-300">
                <code>{`{
  "temperature": 27.4,
  "humidity": 65.2,
  "soilMoisture": 58,
  "soilRaw": 2098
}`}</code>
              </pre>
            </div>
          </div>
        </section>

        <section className="bg-slate-950 py-16 text-white sm:py-20">
          <div className="mx-auto max-w-5xl px-5 sm:px-6">
            <div className="flex items-center gap-3">
              <Code2 className="text-cyan-400" size={32} />
              <h2 className="text-3xl font-bold sm:text-4xl">Complete ESP32 code</h2>
            </div>
            <p className="mt-4 leading-7 text-slate-300">
              Replace all placeholder network credentials. Never publish passwords or Firebase administrative keys in a public repository.
            </p>
            <pre className="mt-8 max-h-[720px] overflow-auto rounded-2xl border border-slate-700 bg-black p-5 text-sm leading-6 text-emerald-300">
              <code>{code}</code>
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
                <h2 className="text-2xl font-bold text-amber-950">Security and electrical safety</h2>
                <ul className="mt-4 space-y-3 text-amber-950">
                  {[
                    "Power sensors from 3.3V unless their output is safely level-shifted.",
                    "Do not commit Wi-Fi, MQTT or Firebase credentials to GitHub.",
                    "Use authenticated MQTT over TLS for a production deployment.",
                    "Keep Firebase database rules private and validate data in a trusted bridge.",
                    "Protect outdoor electronics from water, heat and reverse polarity.",
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
                ["ESP32 will not connect", "Confirm the 2.4 GHz Wi-Fi SSID and password; many ESP32 boards cannot use 5 GHz Wi-Fi."],
                ["DHT shows NaN", "Check DATA wiring, sensor type and library, then allow at least two seconds between reads."],
                ["Soil percentage is reversed", "Measure wet and dry raw values again and update SOIL_WET and SOIL_DRY."],
                ["MQTT disconnects repeatedly", "Check host, port, authentication and firewall; use a unique client ID."],
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
        title="IoT Smart Monitoring Using ESP32"
        description="Build an ESP32 IoT monitoring system using environmental sensors, MQTT and Firebase."
      />
      <Footer />
    </div>
  );
}
