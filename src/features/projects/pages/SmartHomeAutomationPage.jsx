import { useEffect } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  CircuitBoard,
  Code2,
  HousePlug,
  Lightbulb,
  Router,
  ShieldAlert,
  Smartphone,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../../components/home/Footer";
import ProjectShare from "../components/ProjectShare";

const components = [
  ["ESP32 development board", "1", "Hosts the Wi-Fi control interface"],
  ["2-channel opto-isolated relay module", "1", "Switches two appliances"],
  ["Low-voltage DC lamps or loads", "2", "Safe demonstration appliances"],
  ["5V regulated power supply", "1", "Powers the relay module"],
  ["USB cable", "1", "Programs and powers the ESP32"],
  ["Breadboard and jumper wires", "1 set", "Creates signal connections"],
  ["Push buttons (optional)", "2", "Provides manual local control"],
  ["PIR motion sensor (optional)", "1", "Adds automatic occupancy control"],
];

const connections = [
  ["Relay VCC", "External regulated 5V"],
  ["Relay GND", "External GND and ESP32 GND"],
  ["Relay IN1", "ESP32 GPIO 26"],
  ["Relay IN2", "ESP32 GPIO 27"],
  ["Optional button 1", "ESP32 GPIO 32 to GND"],
  ["Optional button 2", "ESP32 GPIO 33 to GND"],
  ["Load 1 control wire", "Relay 1 COM and NO terminals"],
  ["Load 2 control wire", "Relay 2 COM and NO terminals"],
];

const steps = [
  {
    title: "Build a low-voltage prototype",
    text: "Begin with 5V or 12V DC lamps. Connect the ESP32 control pins and common ground before connecting power to the relay board.",
  },
  {
    title: "Check relay input behaviour",
    text: "Many relay modules are active LOW. The supplied sketch uses RELAY_ON as LOW; change it if your module operates differently.",
  },
  {
    title: "Configure Arduino IDE",
    text: "Install the ESP32 board package, select your board and serial port, then open a new sketch. The WebServer and WiFi libraries are included with the ESP32 core.",
  },
  {
    title: "Add Wi-Fi credentials",
    text: "Enter the SSID and password of a trusted 2.4 GHz network. Do not commit real credentials to a public repository.",
  },
  {
    title: "Upload the program",
    text: "Upload the sketch and open Serial Monitor at 115200 baud. Copy the displayed local IP address.",
  },
  {
    title: "Open the control dashboard",
    text: "Connect your phone to the same Wi-Fi network and open the ESP32 IP address in a browser. Test both ON and OFF controls.",
  },
  {
    title: "Add manual switches",
    text: "Connect optional push buttons from GPIO 32 and GPIO 33 to ground. The internal pull-ups keep the inputs stable.",
  },
  {
    title: "Enclose and secure the system",
    text: "Use a flame-retardant enclosure, fuse the load circuit and keep power wiring isolated. Ask a qualified electrician for any mains-voltage installation.",
  },
];

const code = String.raw`#include <WiFi.h>
#include <WebServer.h>

const char* WIFI_SSID = "YOUR_WIFI_NAME";
const char* WIFI_PASSWORD = "YOUR_WIFI_PASSWORD";

const int RELAY_1 = 26;
const int RELAY_2 = 27;
const int BUTTON_1 = 32;
const int BUTTON_2 = 33;

// Most common relay modules are active LOW
const int RELAY_ON = LOW;
const int RELAY_OFF = HIGH;

bool appliance1 = false;
bool appliance2 = false;
bool lastButton1 = HIGH;
bool lastButton2 = HIGH;

WebServer server(80);

void setAppliance(int number, bool enabled) {
  int pin = number == 1 ? RELAY_1 : RELAY_2;
  digitalWrite(pin, enabled ? RELAY_ON : RELAY_OFF);

  if (number == 1) appliance1 = enabled;
  if (number == 2) appliance2 = enabled;
}

String stateLabel(bool enabled) {
  return enabled ? "ON" : "OFF";
}

String dashboard() {
  String html = R"rawliteral(
<!doctype html>
<html>
<head>
  <meta name="viewport"
        content="width=device-width,initial-scale=1">
  <title>ESP32 Smart Home</title>
  <style>
    body{font-family:Arial;margin:0;background:#f1f5f9;color:#0f172a}
    main{max-width:680px;margin:auto;padding:32px 18px}
    h1{text-align:center}
    .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px}
    .card{background:white;padding:24px;border-radius:20px;box-shadow:0 8px 25px #0001}
    .state{font-size:30px;font-weight:800;margin:15px 0}
    a{display:inline-block;padding:12px 18px;margin:4px;border-radius:10px;
      color:white;text-decoration:none;font-weight:700}
    .on{background:#16a34a}.off{background:#dc2626}
  </style>
</head>
<body><main><h1>ESP32 Smart Home</h1><div class="grid">
)rawliteral";

  html += "<section class='card'><h2>Appliance 1</h2><div class='state'>";
  html += stateLabel(appliance1);
  html += "</div><a class='on' href='/control?id=1&state=on'>ON</a>";
  html += "<a class='off' href='/control?id=1&state=off'>OFF</a></section>";

  html += "<section class='card'><h2>Appliance 2</h2><div class='state'>";
  html += stateLabel(appliance2);
  html += "</div><a class='on' href='/control?id=2&state=on'>ON</a>";
  html += "<a class='off' href='/control?id=2&state=off'>OFF</a></section>";
  html += "</div></main></body></html>";

  return html;
}

void handleRoot() {
  server.send(200, "text/html", dashboard());
}

void handleControl() {
  int id = server.arg("id").toInt();
  bool enabled = server.arg("state") == "on";

  if (id == 1 || id == 2) {
    setAppliance(id, enabled);
  }

  server.sendHeader("Location", "/");
  server.send(303);
}

void readButtons() {
  bool button1 = digitalRead(BUTTON_1);
  bool button2 = digitalRead(BUTTON_2);

  if (lastButton1 == HIGH && button1 == LOW) {
    setAppliance(1, !appliance1);
  }
  if (lastButton2 == HIGH && button2 == LOW) {
    setAppliance(2, !appliance2);
  }

  lastButton1 = button1;
  lastButton2 = button2;
}

void setup() {
  Serial.begin(115200);

  pinMode(RELAY_1, OUTPUT);
  pinMode(RELAY_2, OUTPUT);
  pinMode(BUTTON_1, INPUT_PULLUP);
  pinMode(BUTTON_2, INPUT_PULLUP);

  setAppliance(1, false);
  setAppliance(2, false);

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  Serial.print("Connecting");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println();
  Serial.print("Dashboard: http://");
  Serial.println(WiFi.localIP());

  server.on("/", handleRoot);
  server.on("/control", handleControl);
  server.begin();
}

void loop() {
  server.handleClient();
  readButtons();
  delay(25);
}`;

export default function SmartHomeAutomationPage() {
  useEffect(() => {
    const title = "ESP32 Smart Home Automation Project";
    const description =
      "Build an ESP32 Wi-Fi smart home automation system with relays, mobile web control, wiring, complete Arduino code, safety guidance and beginner steps.";
    const canonical =
      "https://www.nextgenroboticx.com/projects/smart-home-automation";
    const image =
      "https://www.nextgenroboticx.com/images/projects/smarthome.png";

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
    schema.id = "smart-home-howto-schema";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: title,
      description,
      image,
      totalTime: "PT10H",
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
              <span className="rounded-full bg-blue-400/15 px-4 py-2 text-sm font-semibold text-blue-300">
                Intermediate IoT Project · Approximately 10 Hours
              </span>
              <h1 className="mt-7 text-4xl font-extrabold leading-tight sm:text-6xl">
                Smart Home Automation Using ESP32
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                Control two appliances through a responsive local Wi-Fi dashboard while retaining safe manual push-button operation.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
                {["ESP32", "Relay", "Wi-Fi", "Mobile Control"].map((item) => (
                  <span key={item} className="rounded-full border border-slate-600 px-4 py-2">{item}</span>
                ))}
              </div>
            </div>
            <img
              src="/images/projects/smarthome.png"
              alt="ESP32 Wi-Fi smart home automation project"
              className="aspect-video w-full rounded-3xl object-cover shadow-2xl"
            />
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-5 sm:px-6">
            <h2 className="text-3xl font-bold sm:text-4xl">How the project works</h2>
            <div className="mt-9 grid gap-6 md:grid-cols-3">
              {[
                [Smartphone, "Control", "A phone opens the responsive dashboard hosted directly by the ESP32."],
                [Router, "Communicate", "Commands travel through the trusted local Wi-Fi network without a cloud account."],
                [HousePlug, "Switch", "GPIO signals safely control isolated relay inputs for two demonstration loads."],
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
                <strong>Safe learning approach:</strong> Test the complete system using low-voltage DC lamps. Never experiment with exposed household mains wiring.
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
                      <td className="p-4 font-semibold">{name}</td>
                      <td className="p-4">{quantity}</td>
                      <td className="p-4 text-slate-600">{purpose}</td>
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
              <h2 className="text-3xl font-bold">Control flow</h2>
              <div className="mt-7 space-y-4">
                {[
                  "Phone requests the ESP32 dashboard",
                  "User selects an appliance state",
                  "ESP32 validates the appliance number",
                  "GPIO changes the isolated relay input",
                  "Dashboard reloads with the current state",
                ].map((item, index) => (
                  <div key={item} className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">{index + 1}</span>
                    <span>{item}</span>
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
              <h2 className="text-3xl font-bold sm:text-4xl">Complete ESP32 code</h2>
            </div>
            <p className="mt-4 leading-7 text-slate-300">
              This sketch creates a mobile-responsive local dashboard and optional physical-button control without requiring a paid cloud platform.
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

        <section className="bg-red-50 py-14">
          <div className="mx-auto max-w-5xl px-5 sm:px-6">
            <div className="flex gap-4">
              <ShieldAlert className="shrink-0 text-red-700" size={30} />
              <div>
                <h2 className="text-2xl font-bold text-red-950">Critical electrical safety</h2>
                <ul className="mt-4 space-y-3 text-red-950">
                  {[
                    "Use low-voltage DC loads for all student experiments.",
                    "Household mains voltage can cause fatal electric shock or fire.",
                    "Any permanent mains installation must be completed by a qualified electrician.",
                    "Use proper fuses, enclosures, strain relief and electrical isolation.",
                    "Disconnect every power source before touching or changing the circuit.",
                  ].map((note) => (
                    <li key={note} className="flex gap-3"><CheckCircle2 className="mt-0.5 shrink-0" size={20} /><span>{note}</span></li>
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
                ["Relay works in reverse", "Change RELAY_ON to HIGH and RELAY_OFF to LOW for an active-HIGH module."],
                ["Dashboard does not open", "Confirm the phone uses the same Wi-Fi and copy the exact IP shown in Serial Monitor."],
                ["ESP32 restarts when relay switches", "Use a separate regulated relay supply with a common signal ground and adequate current."],
                ["Button toggles more than once", "Increase debounce delay or implement a millis-based debounce routine."],
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
        title="Smart Home Automation Using ESP32"
        description="Build a responsive ESP32 Wi-Fi smart home automation system with relays and mobile control."
      />
      <Footer />
    </div>
  );
}
