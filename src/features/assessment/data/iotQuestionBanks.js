export const iotQuestionSeeds = [
  [
    "What best describes the Internet of Things (IoT)?",
    "A network of physical devices that sense, process, and exchange data",
    "A website made only for mobile phones",
    "A local spreadsheet with no connected devices",
    "A replacement for all embedded systems"
  ],
  [
    "Which layer directly measures temperature, motion, or light?",
    "The perception or device layer",
    "The presentation layer",
    "The billing layer",
    "The domain-name layer"
  ],
  [
    "What is the main role of an IoT gateway?",
    "Aggregate devices and bridge local protocols to wider networks",
    "Increase every sensor's physical range",
    "Replace all cloud services",
    "Generate electrical power for actuators"
  ],
  [
    "When is edge computing especially useful?",
    "When low latency or operation during cloud outages is required",
    "When devices never generate data",
    "Only when a public website is being designed",
    "When all processing must be delayed"
  ],
  [
    "What does telemetry mean in an IoT system?",
    "Measurements and status sent from a device to another system",
    "A command that always turns a motor on",
    "A printed circuit board layout",
    "A password stored in source code"
  ],
  [
    "What is an actuator?",
    "A component that converts a control signal into physical action",
    "A sensor that only measures voltage",
    "A database table for time-series data",
    "A wireless encryption algorithm"
  ],
  [
    "Why is a unique device identity important?",
    "It lets the platform authenticate and manage each device separately",
    "It guarantees unlimited battery life",
    "It removes the need for network security",
    "It makes calibration unnecessary"
  ],
  [
    "Which ESP32 feature makes it suitable for many IoT prototypes?",
    "Integrated Wi-Fi and Bluetooth with programmable GPIO",
    "A built-in mains power supply",
    "Unlimited flash memory",
    "A mechanical relay on every pin"
  ],
  [
    "Why must ESP32 GPIO voltage limits be respected?",
    "Overvoltage can damage the microcontroller",
    "Higher voltage always improves Wi-Fi",
    "It changes MQTT topic names",
    "It prevents dashboards from loading"
  ],
  [
    "What does an ADC do?",
    "Converts an analogue voltage into a digital reading",
    "Converts JSON into HTML",
    "Amplifies every radio signal",
    "Encrypts a firmware image"
  ],
  [
    "Why should a push button often use a pull-up or pull-down resistor?",
    "To prevent the input from floating when the switch is open",
    "To increase the processor clock speed",
    "To create a cloud account",
    "To calibrate a temperature sensor"
  ],
  [
    "What is sensor calibration?",
    "Comparing readings with a reference and correcting systematic error",
    "Renaming the sensor in a dashboard",
    "Sending every reading twice",
    "Replacing a sensor with an actuator"
  ],
  [
    "Why is sampling too frequently sometimes harmful?",
    "It can waste power, bandwidth, and storage without adding useful information",
    "It makes all sensors more accurate",
    "It guarantees zero network latency",
    "It disables the ADC"
  ],
  [
    "What is a sensible response to an obviously invalid sensor value?",
    "Reject or flag it and keep the system in a safe state",
    "Use it immediately for irreversible control",
    "Delete all historical data",
    "Expose the device password"
  ],
  [
    "Why should a relay controlling a load default to OFF after reset?",
    "It provides a safer fail-safe state",
    "It increases MQTT bandwidth",
    "It improves ADC resolution",
    "It removes the need for isolation"
  ],
  [
    "What does Wi-Fi station mode allow an ESP32 to do?",
    "Join an existing wireless access point",
    "Act as an analogue sensor",
    "Compile firmware in the cloud",
    "Drive a mains load directly"
  ],
  [
    "What is a common reason to implement Wi-Fi reconnection logic?",
    "Wireless links can drop temporarily during normal operation",
    "MQTT forbids persistent connections",
    "GPIO pins require internet access",
    "TLS works only after a reboot"
  ],
  [
    "In an HTTP REST API, which method commonly retrieves a resource?",
    "GET",
    "DELETE",
    "PATCH only",
    "CONNECT only"
  ],
  [
    "Why is JSON widely used in IoT web APIs?",
    "It is a structured, human-readable data format supported by many platforms",
    "It physically powers sensors",
    "It guarantees encrypted transport by itself",
    "It replaces device authentication"
  ],
  [
    "What does an HTTP 401 response normally indicate?",
    "Authentication is missing or invalid",
    "The sensor value is perfectly calibrated",
    "The request succeeded and created a resource",
    "The device has unlimited storage"
  ],
  [
    "What is MQTT primarily designed for?",
    "Lightweight publish-subscribe messaging",
    "PCB autorouting",
    "Image compression only",
    "Power conversion"
  ],
  [
    "What is the role of an MQTT broker?",
    "Receive published messages and deliver them to matching subscribers",
    "Measure analogue voltage",
    "Generate device certificates automatically in all cases",
    "Replace the device firmware"
  ],
  [
    "What is an MQTT topic?",
    "A hierarchical label used to route messages",
    "A Wi-Fi password",
    "A type of temperature sensor",
    "A fixed IP address"
  ],
  [
    "Which topic design is easiest to scale across many devices?",
    "A consistent hierarchy such as site/device/measurement",
    "One unrelated random topic for every message",
    "The same topic for commands and secrets",
    "A topic containing the plaintext password"
  ],
  [
    "What does MQTT QoS 0 provide?",
    "At-most-once delivery without acknowledgement",
    "Exactly-once delivery with two handshakes",
    "Guaranteed storage forever",
    "Automatic TLS encryption"
  ],
  [
    "When is MQTT QoS 1 a reasonable choice?",
    "When at-least-once delivery is needed and duplicates can be handled",
    "When no messages may ever be repeated or lost under any condition",
    "Only for analogue GPIO",
    "When the broker is not used"
  ],
  [
    "What is a retained MQTT message useful for?",
    "Giving a new subscriber the latest known value immediately",
    "Storing every message forever",
    "Hiding a device identifier",
    "Updating firmware without validation"
  ],
  [
    "What does an MQTT Last Will and Testament help report?",
    "An unexpected client disconnection",
    "The ADC reference voltage",
    "The PCB copper thickness",
    "A successful HTTP redirect"
  ],
  [
    "Why should command and telemetry topics be separated?",
    "It clarifies permissions and prevents accidental command handling",
    "It removes the need for a broker",
    "It doubles sensor accuracy",
    "It makes TLS unnecessary"
  ],
  [
    "What is a time-series database optimized to store?",
    "Values indexed by time, such as sensor measurements",
    "Only image files",
    "Source code dependencies",
    "Wi-Fi credentials"
  ],
  [
    "What should a useful IoT dashboard show first?",
    "Current state, trends, and actionable alerts",
    "Every raw packet without labels",
    "Only decorative animations",
    "Private credentials"
  ],
  [
    "Why add timestamps to telemetry?",
    "To know when a measurement was produced and analyze trends",
    "To increase GPIO voltage",
    "To replace sensor calibration",
    "To authenticate a user by itself"
  ],
  [
    "What is threshold hysteresis used for in alerting?",
    "To prevent rapid on-off toggling near a boundary",
    "To increase network latency",
    "To erase duplicate measurements",
    "To create a new MQTT broker"
  ],
  [
    "What is a good alerting practice?",
    "Send actionable alerts with severity, context, and time",
    "Notify continuously for every normal reading",
    "Include device secrets in the message",
    "Disable logging after the first alert"
  ],
  [
    "Why aggregate data before long-term storage?",
    "To reduce storage while preserving useful trends",
    "To make the sensor physically larger",
    "To remove all timestamps",
    "To bypass access control"
  ],
  [
    "What does TLS protect on an IoT connection?",
    "Data confidentiality and integrity in transit",
    "A sensor from incorrect calibration",
    "A relay from electrical overload",
    "A battery from discharging"
  ],
  [
    "Where should production device secrets be stored?",
    "In protected device storage or a secure provisioning system",
    "Hard-coded in a public repository",
    "Displayed on the dashboard",
    "Published to an MQTT topic"
  ],
  [
    "What does least privilege mean for an IoT device?",
    "Grant only the permissions needed for its intended tasks",
    "Give every device administrator access",
    "Use one shared password for all products",
    "Disable authentication on local networks"
  ],
  [
    "Why should each device have separate credentials?",
    "One compromised device can be revoked without exposing the entire fleet",
    "It guarantees the sensor never fails",
    "It removes certificate expiry",
    "It increases antenna gain"
  ],
  [
    "What must be verified before installing an over-the-air firmware update?",
    "Its authenticity and integrity",
    "Only the filename length",
    "The dashboard background color",
    "The latest sensor value"
  ],
  [
    "Why should firmware and dependencies be patched?",
    "To fix known vulnerabilities and reliability defects",
    "To prevent all future hardware failures",
    "To avoid using encryption",
    "To increase mains voltage"
  ],
  [
    "What should happen when an IoT device loses cloud connectivity?",
    "Continue safe local operation and buffer essential data when practical",
    "Drive every actuator to maximum output",
    "Erase its identity immediately",
    "Ignore all safety rules"
  ],
  [
    "Why use exponential backoff for reconnection attempts?",
    "To avoid flooding the network or server during an outage",
    "To sample analogue inputs faster",
    "To guarantee exactly-once MQTT delivery",
    "To disable the watchdog"
  ],
  [
    "What is the purpose of a watchdog timer?",
    "Reset or recover the device if software becomes unresponsive",
    "Store cloud telemetry permanently",
    "Encrypt Wi-Fi radio waves",
    "Calibrate every connected sensor"
  ],
  [
    "What information is most helpful in device logs?",
    "Timestamped state changes, errors, and relevant diagnostic context",
    "Passwords and private keys",
    "Only successful boot messages",
    "Unbounded raw data with no timestamps"
  ],
  [
    "Why should remote commands be validated on the device?",
    "Malformed or unsafe commands must not directly control hardware",
    "Cloud users can never make mistakes",
    "Validation increases antenna range",
    "MQTT validates application meaning automatically"
  ],
  [
    "In a smart monitoring and control project, what should be tested first?",
    "Individual sensors and actuators before full-system integration",
    "The final dashboard after deployment only",
    "Certificate printing",
    "Marketing analytics"
  ],
  [
    "What is an end-to-end IoT test?",
    "Verifying sensing, communication, storage, rules, commands, and physical response together",
    "Checking only that an LED lights",
    "Reviewing only the schematic title",
    "Measuring internet speed without the device"
  ],
  [
    "What is the safest design for an automatic actuator rule?",
    "Defined limits, manual override, timeout, and fail-safe behavior",
    "An unlimited command with no feedback",
    "A public unauthenticated control topic",
    "Permanent ON after any sensor error"
  ],
  [
    "What best demonstrates a completed IoT final project?",
    "Documented requirements plus repeatable evidence that monitoring, control, security, and failure handling work",
    "A device that boots once with no test records",
    "A dashboard mockup without connected hardware",
    "Source code containing production credentials"
  ]
];

function buildBank(prefix, shift, reverse = false) {
  const source = reverse ? [...iotQuestionSeeds].reverse() : iotQuestionSeeds;
  return source.map(([question, correct, ...incorrect], index) => {
    const options = [correct, ...incorrect];
    const rotation = (index + shift) % 4;
    const rotated = [...options.slice(rotation), ...options.slice(0, rotation)];
    return {
      id: `${prefix}-${index + 1}`,
      question,
      options: rotated,
      answer: rotated.indexOf(correct),
    };
  });
}

export const iotQuestionBanks = {
  mock: buildBank("IM", 0),
  assessment1: buildBank("IA1", 1),
  assessment2: buildBank("IA2", 2, true),
};
