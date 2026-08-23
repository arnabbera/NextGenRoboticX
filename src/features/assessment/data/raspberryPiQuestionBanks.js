const raspberryPiQuestionSeeds = [
  ["What is a Raspberry Pi?", "A single-board computer", "A passive sensor", "A motor driver", "A cloud database"],
  ["Which component performs the main computation on a Raspberry Pi?", "The system-on-chip", "The GPIO header alone", "The microSD adapter", "The status LED"],
  ["What commonly stores Raspberry Pi OS?", "A microSD card or supported storage device", "A resistor", "An HDMI cable", "A breadboard rail"],
  ["Why use an approved power supply?", "To provide stable voltage and sufficient current", "To increase Python speed", "To create GPIO input", "To replace storage"],
  ["What must be done before connecting a CSI camera ribbon?", "Power off the Raspberry Pi", "Enable every GPIO output", "Start an MQTT broker", "Delete the OS"],
  ["What voltage logic do modern Raspberry Pi GPIO pins use?", "3.3 V", "12 V", "24 V", "230 V"],
  ["Why must 5 V not be applied directly to a GPIO input?", "It can permanently damage the GPIO or SoC", "It reduces disk space", "It disables SSH only", "It changes Linux users"],
  ["What is the purpose of a common ground between interfaced circuits?", "Provide a shared signal-voltage reference", "Increase storage", "Compile Python", "Encrypt Wi-Fi"],
  ["What does GPIO stand for?", "General-Purpose Input/Output", "Global Python Internet Operation", "General Power Internal Oscillator", "Graphical Port Installation Option"],
  ["Why use a resistor with an LED?", "To limit current", "To add RAM", "To enable SSH", "To format the SD card"],
  ["Which official tool writes Raspberry Pi OS images?", "Raspberry Pi Imager", "OpenCV", "Flask", "Paho MQTT"],
  ["What is a hostname?", "A human-readable name assigned to a networked computer", "A GPIO voltage", "A filesystem permission", "A PWM pulse"],
  ["Which command shows the current working directory?", "pwd", "cd", "rm", "mkdir"],
  ["Which command lists directory contents?", "ls", "pwd", "sudo only", "python3 -m venv"],
  ["What does chmod manage?", "File permission bits", "CPU temperature", "GPIO numbering", "MQTT topics"],
  ["Why avoid routinely running applications as root?", "Least privilege limits damage from faults or compromise", "Root cannot read files", "Python requires GPIO voltage", "SSH rejects root programs"],
  ["What is apt used for on Raspberry Pi OS?", "Managing approved Debian packages", "Reading analogue voltage", "Controlling servo pulses", "Publishing MQTT messages"],
  ["Why update package indexes before installing software?", "To obtain current package metadata from configured repositories", "To erase logs", "To change GPIO voltage", "To calibrate sensors"],
  ["What does a Python virtual environment provide?", "Isolated project dependencies", "Electrical isolation", "A remote desktop", "A hardware watchdog"],
  ["Why use a requirements file?", "To document reproducible Python dependencies", "To store passwords", "To set pin voltage", "To replace tests"],
  ["Which Python structure repeats while a condition remains true?", "while loop", "dictionary only", "import statement", "exception class"],
  ["What does a try/finally block help guarantee?", "Cleanup runs even when an error occurs", "Every network request succeeds", "GPIO becomes 5 V tolerant", "Files are automatically encrypted"],
  ["Why validate sensor readings?", "Faulty or malformed values can cause incorrect or unsafe behaviour", "Every sensor is always accurate", "Linux validates physical units", "MQTT corrects calibration"],
  ["What library provides beginner-friendly Raspberry Pi GPIO device abstractions?", "GPIO Zero", "NumPy only", "Flask", "systemd"],
  ["What does PWM control by changing duty cycle?", "The average power delivered to a suitable load or driver", "File permissions", "IP addresses", "Python imports"],
  ["Why use a transistor or driver for a motor, relay, or high-current load?", "GPIO cannot safely supply the required current or handle transients", "The Pi has no CPU", "Linux blocks outputs", "SSH needs the driver"],
  ["What does I2C use for communication?", "SDA and SCL shared bus lines", "TX and RX only", "MOSI and MISO only", "One PWM pin only"],
  ["What identifies a device on an I2C bus?", "Its bus address", "Its Linux password", "Its MQTT topic", "Its HDMI resolution"],
  ["What is SPI useful for?", "Fast synchronous peripheral communication with clock and chip select", "Remote shell login", "Filesystem mounting", "HTTP routing"],
  ["What is UART commonly based on?", "Transmit and receive serial lines", "SDA and SCL", "Camera pixels", "PWM and ADC"],
  ["What is SSH used for?", "Secure remote command-line access", "Supplying GPIO current", "Image segmentation", "Sensor calibration"],
  ["Why prefer SSH keys over reusable passwords?", "They support stronger, revocable authentication when protected correctly", "They increase CPU clock", "They replace firewall rules", "They power sensors"],
  ["What does a firewall do?", "Restricts network traffic according to rules", "Corrects image colour", "Compiles Python", "Measures humidity"],
  ["What should be done before exposing a service outside a trusted network?", "Review authentication, TLS, firewall, updates, logging, and need for exposure", "Disable all passwords", "Run as root", "Publish secrets"],
  ["What is an MQTT broker's role?", "Route messages from publishers to authorised subscribers", "Power GPIO devices", "Store the OS image", "Create camera frames"],
  ["What is an MQTT topic?", "A hierarchical message channel name", "A Linux user", "A sensor voltage", "An image pixel"],
  ["What does MQTT QoS 1 provide?", "At-least-once delivery, so duplicates are possible", "Guaranteed exactly once application processing", "No acknowledgement", "Encryption without TLS"],
  ["Why use TLS for MQTT or HTTP?", "To protect traffic and authenticate the server when verified", "To increase GPIO current", "To replace authorisation", "To remove validation"],
  ["Where should API and broker secrets be stored?", "Protected configuration outside source code", "A public repository", "MQTT topic names", "Dashboard screenshots"],
  ["What is JSON?", "A structured text data-interchange format", "A GPIO bus", "A camera connector", "A package manager"],
  ["Which HTTP method normally retrieves a resource?", "GET", "DELETE", "PATCH", "FORMAT"],
  ["What does HTTP status 404 mean?", "The requested resource was not found", "The request succeeded", "GPIO is high", "The certificate is valid"],
  ["What does Picamera2 provide?", "A supported Python interface for Raspberry Pi cameras", "An MQTT broker", "A firewall", "A motor supply"],
  ["Why convert an image to grayscale in some vision pipelines?", "Reduce data while retaining brightness structure", "Increase physical resolution", "Encrypt the image", "Guarantee object recognition"],
  ["Why apply Gaussian blur before edge detection?", "Reduce small noise that may produce false edges", "Add GPS data", "Increase disk size", "Enable SSH"],
  ["What does Canny edge detection produce?", "A map of strong intensity boundaries", "An audio signal", "A Linux service", "A voltage regulator"],
  ["Why is HSV useful for colour segmentation?", "It separates hue from brightness-related components", "It removes all calibration", "It guarantees identity", "It stores certificates"],
  ["How can a vision pipeline improve frame rate?", "Process a suitable lower resolution or region of interest", "Save every full-resolution frame", "Use blocking delays", "Disable error checks"],
  ["What should a resilient IoT device do during network loss?", "Maintain a defined safe local mode and reconnect with controlled backoff", "Activate every output", "Retry continuously without delay", "Delete every log"],
  ["What completes a credible Raspberry Pi capstone?", "Requirements, architecture, code, wiring, tests, evidence, security, limitations, and operation guide", "Only a photograph", "Unverified claims", "Published credentials"],
];

function buildBank(prefix, shift, reverse = false) {
  const source = reverse ? [...raspberryPiQuestionSeeds].reverse() : raspberryPiQuestionSeeds;
  return source.map(([question, correct, ...incorrect], index) => {
    const options = [correct, ...incorrect];
    const rotation = (index + shift) % 4;
    const rotated = [...options.slice(rotation), ...options.slice(0, rotation)];
    return { id: `${prefix}-${index + 1}`, question, options: rotated, answer: rotated.indexOf(correct) };
  });
}

export const raspberryPiQuestionBanks = {
  mock: buildBank("PM", 0),
  assessment1: buildBank("PA1", 1),
  assessment2: buildBank("PA2", 2, true),
};
