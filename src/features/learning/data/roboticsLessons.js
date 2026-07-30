const roboticsLessons = [
  {
    id: 1,
    title: "Introduction to Robotics",
    duration: "12 min",
    description: "Understand what robotics is and where it is used.",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    notes: `
Robotics is a multidisciplinary field that combines:

• Mechanical Engineering
• Electronics
• Computer Science
• Artificial Intelligence

A robot is a programmable machine capable of carrying out tasks automatically or semi-automatically.

Learning Outcomes

• Understand robotics
• Learn robot components
• Explore real-world applications
`,
    codeExample: `// Arduino Blink Example

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);

  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
}`,
    resources: [
      {
        title: "Chapter 1 Notes",
        type: "pdf",
        url: "#",
      },
      {
        title: "Presentation Slides",
        type: "ppt",
        url: "#",
      },
    ],
    quizId: "robotics-ch1",
    completed: false,
    locked: false,
  },

  {
    id: 2,
    title: "History of Robotics",
    duration: "15 min",
    description: "Learn how robotics evolved over time.",
    video: "",
    notes: `
Topics Covered

• Ancient Automata
• Industrial Robots
• Modern Collaborative Robots
• Humanoid Robots
`,
    codeExample: "",
    resources: [],
    quizId: "robotics-ch2",
    completed: false,
    locked: true,
  },

  {
    id: 3,
    title: "Robot Components",
    duration: "20 min",
    description: "Understand the hardware of a robot.",
    video: "",
    notes: `
Main Components

• Controller
• Sensors
• Actuators
• Power Supply
• Chassis
`,
    codeExample: "",
    resources: [],
    quizId: "robotics-ch3",
    completed: false,
    locked: true,
  },

  {
    id: 4,
    title: "Introduction to Arduino",
    duration: "18 min",
    description: "Learn the Arduino ecosystem.",
    video: "",
    notes: `
Arduino is an open-source electronics platform.

Popular Boards

• Arduino Uno
• Nano
• Mega
• ESP32
`,
    codeExample: "",
    resources: [],
    quizId: "robotics-ch4",
    completed: false,
    locked: true,
  },

  {
    id: 5,
    title: "Sensors",
    duration: "25 min",
    description: "Learn different sensors used in robotics.",
    video: "",
    notes: `
Common Sensors

• Ultrasonic
• IR
• Temperature
• Gas
• Light
`,
    codeExample: "",
    resources: [],
    quizId: "robotics-ch5",
    completed: false,
    locked: true,
  },

  {
    id: 6,
    title: "Motors",
    duration: "22 min",
    description: "Understand motors and motion control.",
    video: "",
    notes: `
Types of Motors

• DC Motor
• Servo Motor
• Stepper Motor
• BLDC Motor
`,
    codeExample: "",
    resources: [],
    quizId: "robotics-ch6",
    completed: false,
    locked: true,
  },

  {
    id: 7,
    title: "Building Your First Robot",
    duration: "35 min",
    description: "Assemble your first robot.",
    video: "",
    notes: `
Project

• Assemble chassis
• Install motors
• Connect Arduino
• Upload code
• Test movement
`,
    codeExample: "",
    resources: [],
    quizId: "robotics-ch7",
    completed: false,
    locked: true,
  },

  {
    id: 8,
    title: "Final Project",
    duration: "45 min",
    description: "Complete the robotics foundation project.",
    video: "",
    notes: `
Build a Line Following Robot

Requirements

• Arduino Nano
• IR Sensors
• Motor Driver
• Battery
• Chassis
`,
    codeExample: "",
    resources: [],
    quizId: "robotics-ch8",
    completed: false,
    locked: true,
  },
];

export default roboticsLessons;