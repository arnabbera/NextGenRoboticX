import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const siteUrl = "https://www.nextgenroboticx.com";

const projects = [
  {
    path: "projects/obstacle-avoiding-robot",
    title: "Obstacle Avoiding Robot Using Arduino | NextGenRoboticX",
    description:
      "Build an obstacle avoiding robotic car using Arduino, HC-SR04 ultrasonic sensor and L298N motor driver with wiring, code and beginner-friendly steps.",
    image: "/images/projects/obstacle.png",
  },
  {
    path: "projects/line-following-robot",
    title: "Arduino Line Following Robot | NextGenRoboticX",
    description:
      "Build an Arduino line following robot using IR sensors and an L298N motor driver with components, connections, code, calibration and step-by-step guidance.",
    image: "/images/projects/linefollower.png",
  },
  {
    path: "projects/iot-smart-monitoring",
    title: "IoT Smart Monitoring Using ESP32, MQTT & Firebase | NextGenRoboticX",
    description:
      "Build an ESP32 IoT monitoring system with DHT and soil sensors, MQTT, Firebase storage, wiring, code, calibration and beginner-friendly steps.",
    image: "/images/projects/iot.png",
  },
  {
    path: "projects/smart-home-automation",
    title: "ESP32 Smart Home Automation Project | NextGenRoboticX",
    description:
      "Build an ESP32 Wi-Fi smart home automation system with relays, mobile web control, wiring, complete Arduino code, safety guidance and beginner steps.",
    image: "/images/projects/smarthome.png",
  },
  {
    path: "projects/arduino-drone",
    title: "Build Your First Arduino Drone: Beginner Quadcopter Guide | NextGenRoboticX",
    description:
      "Build your first Arduino quadcopter with an MPU6050, brushless motors, ESCs and radio receiver. Includes wiring, motor-test code, calibration and safety steps.",
    image: "/images/projects/drone.png",
  },
  {
    path: "projects/face-recognition-robot",
    title: "AI Face Recognition Robot Using Raspberry Pi and OpenCV | NextGenRoboticX",
    description:
      "Build an AI face recognition robot using Raspberry Pi, Python, OpenCV and a 2WD chassis with components, wiring, training code, movement code and privacy guidance.",
    image: "/images/projects/facerecognition.png",
  },
  {
    path: "projects/humanoid-robot",
    title: "How to Build a Humanoid Robot Using Arduino Mega | NextGenRoboticX",
    description:
      "Build an Arduino humanoid robot using servo motors and a PCA9685 driver. Includes components, wiring, calibration, motion code, assembly and safety guidance.",
    image: "/images/projects/humanoid.png",
  },
  {
    path: "projects/robotic-arm-automation",
    title: "Arduino Robotic Arm Automation: Pick-and-Place Guide | NextGenRoboticX",
    description:
      "Build an Arduino robotic arm automation project using servo motors and PCA9685. Includes components, wiring, calibration, pick-and-place code and safety.",
    image: "/images/projects/roboticarm.png",
  },
  {
    path: "projects/smart-agriculture",
    title: "ESP32 Smart Agriculture and Automatic Irrigation Project | NextGenRoboticX",
    description:
      "Build an ESP32 smart agriculture system with soil moisture, DHT22, water-level protection and automatic irrigation code, wiring and calibration.",
    image: "/images/projects/agriculture.png",
  },
];

const escapeAttribute = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const baseHtml = await readFile(join("dist", "index.html"), "utf8");

for (const project of projects) {
  const url = `${siteUrl}/${project.path}`;
  const image = `${siteUrl}${project.image}`;
  const title = escapeAttribute(project.title);
  const description = escapeAttribute(project.description);

  const socialMeta = `
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="NextGenRoboticX" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:secure_url" content="${image}" />
    <meta property="og:image:alt" content="${title}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />
  `;

  const html = baseHtml
    .replace(/<title>.*?<\/title>/i, `<title>${title}</title>`)
    .replace("</head>", `${socialMeta}\n  </head>`);

  const outputDirectory = join("dist", project.path);
  await mkdir(outputDirectory, { recursive: true });
  await writeFile(join(outputDirectory, "index.html"), html, "utf8");
}

console.log(`Generated social metadata pages for ${projects.length} projects.`);
