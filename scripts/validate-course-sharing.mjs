import { readFile } from "node:fs/promises";

const courses = {
  "robotics-foundation": "robotics-social-1200x675.png",
  "arduino-programming": "arduino-social-1200x675.png",
  "raspberry-pi": "raspberrypi-social-1200x675.png",
  "internet-of-things": "iot-social-1200x675.png",
  "embedded-systems": "embedded-social-1200x675.png",
  "pcb-design-hardware-development": "pcb-social-1200x675.png",
  "artificial-intelligence": "ai-social-1200x675.png",
  "drone-technology": "drone-social-1200x675.png",
  "sensors-and-actuators": "sensors-social-1200x675.png",
};

for (const [courseId, imageName] of Object.entries(courses)) {
  const html = await readFile(`dist/courses/${courseId}/index.html`, "utf8");
  const expectedUrl = `https://www.nextgenroboticx.com/courses/${courseId}`;
  const expectedImage = `https://www.nextgenroboticx.com/images/courses/${imageName}`;
  const assertions = [
    [html.includes(`rel="canonical" href="${expectedUrl}"`), "canonical URL"],
    [html.includes(`property="og:url" content="${expectedUrl}"`), "Open Graph URL"],
    [html.includes(`property="og:image" content="${expectedImage}"`), "Open Graph image"],
    [html.includes('property="og:image:width" content="1200"'), "image width"],
    [html.includes('property="og:image:height" content="675"'), "image height"],
    [html.includes('name="twitter:card" content="summary_large_image"'), "Twitter/X card type"],
    [html.includes(`name="twitter:image" content="${expectedImage}"`), "Twitter/X image"],
  ];
  for (const [pass, label] of assertions) {
    if (!pass) throw new Error(`${courseId}: missing or incorrect ${label}`);
  }

  const png = await readFile(`public/images/courses/${imageName}`);
  if (png.readUInt32BE(16) !== 1200 || png.readUInt32BE(20) !== 675) {
    throw new Error(`${courseId}: social image is not 1200x675`);
  }
  console.log(`PASS ${courseId}`);
}
console.log(`Validated ${Object.keys(courses).length} course share pages.`);
