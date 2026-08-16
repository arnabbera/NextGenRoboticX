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
