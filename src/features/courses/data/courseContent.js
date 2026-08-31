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
    chapters: [
      { id: 1, title: "Introduction to Raspberry Pi and Single-Board Computers", duration: "40 min", video: "", pdf: "", notes: "", quiz: true, project: false, resources: [], code: [] },
      { id: 2, title: "Raspberry Pi Hardware, GPIO and Safe Setup", duration: "45 min", video: "", pdf: "", notes: "", quiz: true, project: false, resources: [], code: [] },
      { id: 3, title: "Installing Raspberry Pi OS and Linux Essentials", duration: "55 min", video: "", pdf: "", notes: "", quiz: true, project: true, resources: [], code: [] },
      { id: 4, title: "Python Programming on Raspberry Pi", duration: "60 min", video: "", pdf: "", notes: "", quiz: true, project: true, resources: [], code: [] },
      { id: 5, title: "GPIO Programming: LEDs, Buttons and PWM", duration: "60 min", video: "", pdf: "", notes: "", quiz: true, project: true, resources: [], code: [] },
      { id: 6, title: "Interfacing Sensors, Displays and Actuators", duration: "65 min", video: "", pdf: "", notes: "", quiz: true, project: true, resources: [], code: [] },
      { id: 7, title: "Networking, SSH and Remote Development", duration: "55 min", video: "", pdf: "", notes: "", quiz: true, project: true, resources: [], code: [] },
      { id: 8, title: "IoT Communication with MQTT and Web APIs", duration: "70 min", video: "", pdf: "", notes: "", quiz: true, project: true, resources: [], code: [] },
      { id: 9, title: "Camera, OpenCV and Computer Vision Basics", duration: "75 min", video: "", pdf: "", notes: "", quiz: true, project: true, resources: [], code: [] },
      { id: 10, title: "Final Project: Smart Raspberry Pi IoT System", duration: "90 min", video: "", pdf: "", notes: "", quiz: true, project: true, resources: [], code: [] },
    ],
  },

  "internet-of-things": {
    chapters: [],
  },

  "embedded-systems": {
    chapters: [
      { id: 1, title: "Introduction to Embedded Systems and Applications", duration: "40 min", video: "", pdf: "", notes: "", quiz: true, project: false, resources: [], code: [] },
      { id: 2, title: "Microcontrollers, Processors and System Architecture", duration: "50 min", video: "", pdf: "", notes: "", quiz: true, project: false, resources: [], code: [] },
      { id: 3, title: "Digital Electronics, GPIO and Peripheral Interfacing", duration: "55 min", video: "", pdf: "", notes: "", quiz: true, project: true, resources: [], code: [] },
      { id: 4, title: "Embedded C Programming and Firmware Structure", duration: "60 min", video: "", pdf: "", notes: "", quiz: true, project: true, resources: [], code: [] },
      { id: 5, title: "Timers, Counters, Interrupts and PWM", duration: "65 min", video: "", pdf: "", notes: "", quiz: true, project: true, resources: [], code: [] },
      { id: 6, title: "ADC, DAC, Sensors and Actuator Control", duration: "65 min", video: "", pdf: "", notes: "", quiz: true, project: true, resources: [], code: [] },
      { id: 7, title: "UART, I2C, SPI and CAN Communication", duration: "70 min", video: "", pdf: "", notes: "", quiz: true, project: true, resources: [], code: [] },
      { id: 8, title: "Memory, Power Management and Reliability", duration: "65 min", video: "", pdf: "", notes: "", quiz: true, project: true, resources: [], code: [] },
      { id: 9, title: "RTOS Fundamentals, Tasks and Synchronisation", duration: "75 min", video: "", pdf: "", notes: "", quiz: true, project: true, resources: [], code: [] },
      { id: 10, title: "Final Project: Real-Time Monitoring and Control System", duration: "90 min", video: "", pdf: "", notes: "", quiz: true, project: true, resources: [], code: [] },
    ],
  },

  "artificial-intelligence": {
    chapters: [],
  },

  "drone-technology": {
    chapters: [
      { id: 1, title: "Introduction to Drones and Aviation Safety", duration: "40 min", video: "", pdf: "", notes: "", quiz: true, project: false, resources: [], code: [] },
      { id: 2, title: "Drone Types, Frames and Multirotor Aerodynamics", duration: "50 min", video: "", pdf: "", notes: "", quiz: true, project: false, resources: [], code: [] },
      { id: 3, title: "Brushless Motors, ESCs, Propellers and Power Systems", duration: "60 min", video: "", pdf: "", notes: "", quiz: true, project: true, resources: [], code: [] },
      { id: 4, title: "Flight Controllers, IMU Sensors and Stabilisation", duration: "65 min", video: "", pdf: "", notes: "", quiz: true, project: true, resources: [], code: [] },
      { id: 5, title: "Radio Transmitters, Receivers and Flight Modes", duration: "55 min", video: "", pdf: "", notes: "", quiz: true, project: true, resources: [], code: [] },
      { id: 6, title: "Drone Assembly, Wiring and Pre-Flight Configuration", duration: "75 min", video: "", pdf: "", notes: "", quiz: true, project: true, resources: [], code: [] },
      { id: 7, title: "Calibration, PID Tuning and Safe Flight Testing", duration: "70 min", video: "", pdf: "", notes: "", quiz: true, project: true, resources: [], code: [] },
      { id: 8, title: "GPS, Telemetry and Ground Control Stations", duration: "65 min", video: "", pdf: "", notes: "", quiz: true, project: true, resources: [], code: [] },
      { id: 9, title: "Autonomous Missions, Geofencing and Fail-Safes", duration: "75 min", video: "", pdf: "", notes: "", quiz: true, project: true, resources: [], code: [] },
      { id: 10, title: "Final Project: Build and Test a GPS Quadcopter", duration: "90 min", video: "", pdf: "", notes: "", quiz: true, project: true, resources: [], code: [] },
    ],
  },

  "sensors-actuators": {
    chapters: [],
  },

  "pcb-design-hardware-development": {
    chapters: [],
  },
};
