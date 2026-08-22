export const courseContent = {
  "robotics-foundation": {
    chapters: [
      {
        id: 1,

        title: "Introduction to Robotics",

        duration: "20 min",

        video: "https://www.youtube.com/embed/VIDEO_ID",

        pdf: "/pdfs/robotics/chapter1.pdf",

        notes: `
Robotics is the branch of engineering that combines
Mechanical Engineering, Electronics and Computer Science
to design intelligent machines.

In this lesson you will learn:

• What is Robotics
• Types of Robots
• Industrial Applications
• Service Robots
• Educational Robotics
• Future of Robotics
        `,

        quiz: true,

        project: false,

        resources: [
          {
            title: "Chapter Presentation",
            file: "/resources/robotics/chapter1-slides.pdf",
          },
        ],

        code: [
          {
            title: "Hello Robot",
            language: "cpp",
            file: "/code/robotics/hello_robot.ino",
          },
        ],
      },

      {
        id: 2,

        title: "Arduino Basics",

        duration: "35 min",

        video: "",

        pdf: "",

        notes: `
Learn the basic electronic components used
inside every robot.

Topics include:

• Resistor
• Capacitor
• LED
• Diode
• Transistor
• Breadboard
        `,

        quiz: true,

        project: false,

        resources: [],

        code: [],
      },

      {
        id: 3,

        title: "Sensors & Actuators",

        duration: "45 min",

        video: "",

        pdf: "",

        notes: `
Introduction to Arduino IDE.

Writing the first program.

Uploading code.

Understanding setup()

Understanding loop()
        `,

        quiz: true,

        project: true,

        resources: [],

        code: [],
      },

      {
        id: 4,

        title: "Motor Driver (L298N)",

        duration: "40 min",

        video: "",

        pdf: "",

        notes: "",

        quiz: true,

        project: true,

        resources: [],

        code: [],
      },

      {
        id: 5,

        title: "Bluetooth Robot",

        duration: "45 min",

        video: "",

        pdf: "",

        notes: "",

        quiz: true,

        project: true,

        resources: [],

        code: [],
      },

      {
        id: 6,

        title: "Obstacle Avoiding Robot",

        duration: "60 min",

        video: "",

        pdf: "",

        notes: "",

        quiz: true,

        project: true,

        resources: [],

        code: [],
      },

      {
        id: 7,

        title: "Line Following Robot",

        duration: "60 min",

        video: "",

        pdf: "",

        notes: "",

        quiz: true,

        project: true,

        resources: [],

        code: [],
      },

      {
        id: 8,

        title: "Voice Controlled Robot",

        duration: "90 min",

        video: "",

        pdf: "",

        notes: "",

        quiz: true,

        project: true,

        resources: [],

        code: [],
      },

      {
        id: 9,
        title: "AI Robot Integration",
        duration: "75 min",
        video: "",
        pdf: "",
        notes: "",
        quiz: true,
        project: true,
        resources: [],
        code: [],
      },

      {
        id: 10,
        title: "Final Project: Multi-Mode Mobile Robot",
        duration: "90 min",
        video: "",
        pdf: "",
        notes: "",
        quiz: true,
        project: true,
        resources: [],
        code: [],
      },
    ],
  },

  "arduino-programming": {
    chapters: [
      { id: 1, title: "Introduction to Arduino and the Arduino IDE", duration: "35 min", video: "", pdf: "", notes: "", quiz: true, project: false, resources: [], code: [] },
      { id: 2, title: "Arduino Board Architecture and Development Setup", duration: "40 min", video: "", pdf: "", notes: "", quiz: true, project: false, resources: [], code: [] },
      { id: 3, title: "Embedded C Programming Fundamentals", duration: "50 min", video: "", pdf: "", notes: "", quiz: true, project: false, resources: [], code: [] },
      { id: 4, title: "Digital Input, Output and Push-Button Control", duration: "55 min", video: "", pdf: "", notes: "", quiz: true, project: true, resources: [], code: [] },
      { id: 5, title: "Analogue Input, ADC and Sensor Reading", duration: "55 min", video: "", pdf: "", notes: "", quiz: true, project: true, resources: [], code: [] },
      { id: 6, title: "PWM, LED Brightness and Motor Speed Control", duration: "60 min", video: "", pdf: "", notes: "", quiz: true, project: true, resources: [], code: [] },
      { id: 7, title: "Timers, Interrupts and Switch Debouncing", duration: "60 min", video: "", pdf: "", notes: "", quiz: true, project: true, resources: [], code: [] },
      { id: 8, title: "Serial, I2C and SPI Communication", duration: "65 min", video: "", pdf: "", notes: "", quiz: true, project: true, resources: [], code: [] },
      { id: 9, title: "Interfacing Sensors, Displays and Actuators", duration: "75 min", video: "", pdf: "", notes: "", quiz: true, project: true, resources: [], code: [] },
      { id: 10, title: "Final Project: Smart Arduino Automation System", duration: "90 min", video: "", pdf: "", notes: "", quiz: true, project: true, resources: [], code: [] },
    ],
  },

  "raspberry-pi": {
    chapters: [],
  },

  "internet-of-things": {
    chapters: [],
  },

  "embedded-systems": {
    chapters: [],
  },

  "artificial-intelligence": {
    chapters: [],
  },

  "drone-technology": {
    chapters: [],
  },

  "sensors-actuators": {
    chapters: [],
  },

  "pcb-design-hardware-development": {
    chapters: [],
  },
};
