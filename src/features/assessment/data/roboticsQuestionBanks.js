export const TEST_DURATION_SECONDS = 30 * 60;
export const PASS_PERCENTAGE = 80;
export const TOTAL_QUESTIONS = 50;
export const MARKS_PER_QUESTION = 2;

export const roboticsQuestionBanks = {
  "mock": [
    {
      "id": "M-1",
      "question": "Which option correctly describes a robot?",
      "options": [
        "a programmable machine that senses, decides and acts",
        "a motor without control",
        "only a mobile application",
        "a fixed mechanical toy"
      ]
    },
    {
      "id": "M-2",
      "question": "Which option correctly describes robot sensing?",
      "options": [
        "replacing all software",
        "converting physical conditions into usable signals",
        "supplying motor current directly",
        "storing mechanical energy"
      ]
    },
    {
      "id": "M-3",
      "question": "Which option correctly describes an actuator?",
      "options": [
        "an ultrasonic calculation",
        "a training dataset",
        "a device that converts commands into physical action",
        "a device used only for data storage"
      ]
    },
    {
      "id": "M-4",
      "question": "Which option correctly describes a controller?",
      "options": [
        "providing unlimited motor current",
        "acting only as a battery",
        "replacing every sensor",
        "processing inputs and producing output commands"
      ]
    },
    {
      "id": "M-5",
      "question": "Which option correctly describes open-loop control?",
      "options": [
        "acting without measuring the resulting output",
        "correcting from continuous feedback",
        "training a neural network",
        "measuring echo time"
      ]
    },
    {
      "id": "M-6",
      "question": "Which option correctly describes closed-loop control?",
      "options": [
        "using maximum PWM always",
        "using feedback to reduce an error",
        "running without any sensor input",
        "disconnecting the controller"
      ]
    },
    {
      "id": "M-7",
      "question": "Which option correctly describes Arduino setup()?",
      "options": [
        "measuring only analogue voltage",
        "stopping every motor automatically",
        "running initialization once after startup",
        "repeating continuously forever"
      ]
    },
    {
      "id": "M-8",
      "question": "Which option correctly describes Arduino loop()?",
      "options": [
        "executing only during compilation",
        "configuring pins only once",
        "uploading a sketch",
        "repeating program logic while the board runs"
      ]
    },
    {
      "id": "M-9",
      "question": "Which option correctly describes pinMode()?",
      "options": [
        "configuring a pin as input or output",
        "reading an analogue sensor",
        "setting a servo angle",
        "starting Bluetooth pairing"
      ]
    },
    {
      "id": "M-10",
      "question": "Which option correctly describes digitalRead()?",
      "options": [
        "training an AI model",
        "reading a digital HIGH or LOW state",
        "writing PWM speed",
        "measuring a floating-point distance"
      ]
    },
    {
      "id": "M-11",
      "question": "Which option correctly describes analogRead() on Uno?",
      "options": [
        "driving a DC motor directly",
        "creating a Bluetooth password",
        "returning a value normally from 0 to 1023",
        "returning only HIGH or LOW"
      ]
    },
    {
      "id": "M-12",
      "question": "Which option correctly describes PWM?",
      "options": [
        "changing a battery chemistry",
        "measuring ultrasonic frequency",
        "storing course progress",
        "controlling average delivered power with pulses"
      ]
    },
    {
      "id": "M-13",
      "question": "Which option correctly describes common ground?",
      "options": [
        "providing circuits with a shared voltage reference",
        "doubling every supply voltage",
        "isolating all signal paths",
        "replacing a motor driver"
      ]
    },
    {
      "id": "M-14",
      "question": "Which option correctly describes a pull-up resistor?",
      "options": [
        "converting speech to text",
        "holding an input at a defined HIGH when open",
        "supplying motor stall current",
        "increasing servo torque"
      ]
    },
    {
      "id": "M-15",
      "question": "Which option correctly describes debouncing?",
      "options": [
        "reversing an H-bridge",
        "encrypting serial data",
        "preventing repeated transitions from one physical switch action",
        "increasing sensor range"
      ]
    },
    {
      "id": "M-16",
      "question": "Which option correctly describes an L298N module?",
      "options": [
        "recognising spoken words",
        "measuring reflected infrared only",
        "training object detection",
        "driving two DC motors with direction control"
      ]
    },
    {
      "id": "M-17",
      "question": "Which option correctly describes an H-bridge?",
      "options": [
        "reversing current through a motor",
        "converting analogue input to digital",
        "measuring battery capacity",
        "pairing two Bluetooth devices"
      ]
    },
    {
      "id": "M-18",
      "question": "Which option correctly describes ENA and ENB?",
      "options": [
        "labelling AI images",
        "enabling L298N channels and accepting PWM speed control",
        "measuring left and right distance",
        "powering Arduino analogue references"
      ]
    },
    {
      "id": "M-19",
      "question": "Which option correctly describes motor stall current?",
      "options": [
        "a serial communication speed",
        "an AI confidence value",
        "the high current drawn when the shaft cannot rotate",
        "the lowest possible sensor current"
      ]
    },
    {
      "id": "M-20",
      "question": "Which option correctly describes a flyback diode?",
      "options": [
        "increasing motor RPM",
        "reading an LDR",
        "creating a common ground",
        "suppressing voltage spikes from an inductive load"
      ]
    },
    {
      "id": "M-21",
      "question": "Which option correctly describes the HC-05?",
      "options": [
        "providing Bluetooth UART serial communication",
        "detecting distance with sound",
        "driving motors directly",
        "recognising speech by itself"
      ]
    },
    {
      "id": "M-22",
      "question": "Which option correctly describes crossed UART wiring?",
      "options": [
        "removing the common ground",
        "connecting one device TX to the other device RX",
        "joining both TX pins together only",
        "connecting RX directly to motor output"
      ]
    },
    {
      "id": "M-23",
      "question": "Which option correctly describes a voltage divider on HC-05 RX?",
      "options": [
        "charging the robot battery",
        "setting the baud rate",
        "reducing 5 V Arduino logic to a safer input level",
        "increasing Bluetooth range"
      ]
    },
    {
      "id": "M-24",
      "question": "Which option correctly describes baud rate?",
      "options": [
        "the motor gear ratio",
        "the sensor mounting height",
        "the quiz pass mark",
        "the serial signalling rate used by both communicating devices"
      ]
    },
    {
      "id": "M-25",
      "question": "Which option correctly describes a command watchdog?",
      "options": [
        "stopping motion when fresh valid commands cease",
        "increasing model accuracy",
        "measuring wheel diameter",
        "calibrating an LDR"
      ]
    },
    {
      "id": "M-26",
      "question": "Which option correctly describes the HC-SR04 TRIG pin?",
      "options": [
        "selecting autonomous mode",
        "starting an ultrasonic measurement pulse",
        "returning echo duration",
        "controlling motor PWM"
      ]
    },
    {
      "id": "M-27",
      "question": "Which option correctly describes the HC-SR04 ECHO pin?",
      "options": [
        "supplying servo power",
        "selecting a motor direction",
        "reporting the sound round-trip pulse duration",
        "starting Bluetooth pairing"
      ]
    },
    {
      "id": "M-28",
      "question": "Which option correctly describes ultrasonic distance calculation?",
      "options": [
        "using PWM divided by battery voltage",
        "adding both motor speeds",
        "counting Bluetooth characters",
        "multiplying travel time by sound speed and dividing by two"
      ]
    },
    {
      "id": "M-29",
      "question": "Which option correctly describes pulseIn() timeout?",
      "options": [
        "preventing indefinite waiting for a missing echo",
        "making the robot run longer",
        "increasing servo travel",
        "removing sensor noise entirely"
      ]
    },
    {
      "id": "M-30",
      "question": "Which option correctly describes servo scanning?",
      "options": [
        "protecting a relay coil",
        "aiming a distance sensor in multiple directions",
        "changing DC motor gear ratio",
        "training a vision model"
      ]
    },
    {
      "id": "M-31",
      "question": "Which option correctly describes an obstacle threshold?",
      "options": [
        "the ADC reference voltage",
        "the number of training labels",
        "the distance at which avoidance action begins",
        "the maximum Bluetooth password length"
      ]
    },
    {
      "id": "M-32",
      "question": "Which option correctly describes IR reflectance sensing?",
      "options": [
        "measuring sound travel time",
        "receiving UART commands",
        "monitoring motor current only",
        "distinguishing surfaces by reflected infrared energy"
      ]
    },
    {
      "id": "M-33",
      "question": "Which option correctly describes line sensor calibration?",
      "options": [
        "setting height and threshold for the real track surface",
        "using full motor speed immediately",
        "removing all feedback",
        "pairing the sensor to a phone"
      ]
    },
    {
      "id": "M-34",
      "question": "Which option correctly describes differential steering?",
      "options": [
        "retraining an AI model",
        "turning by changing left and right wheel speeds",
        "moving a servo to 90 degrees",
        "changing the ultrasonic frequency"
      ]
    },
    {
      "id": "M-35",
      "question": "Which option correctly describes line-loss recovery?",
      "options": [
        "disabling both sensors",
        "changing Bluetooth PIN",
        "searching in the last known error direction",
        "continuing straight at maximum speed"
      ]
    },
    {
      "id": "M-36",
      "question": "Which option correctly describes proportional control?",
      "options": [
        "using only one fixed correction",
        "ignoring sensor measurements",
        "stopping after every loop",
        "making correction magnitude depend on current error"
      ]
    },
    {
      "id": "M-37",
      "question": "Which option correctly describes voice robot speech recognition?",
      "options": [
        "being performed by the phone or voice application",
        "being performed inside the L298N",
        "being performed by the motor",
        "being guaranteed by HC-05"
      ]
    },
    {
      "id": "M-38",
      "question": "Which option correctly describes a safe unknown voice command?",
      "options": [
        "changing mode randomly",
        "causing the robot to stop",
        "causing full-speed movement",
        "disabling the watchdog"
      ]
    },
    {
      "id": "M-39",
      "question": "Which option correctly describes machine learning?",
      "options": [
        "working without any data",
        "replacing all safety logic",
        "learning statistical patterns from examples",
        "guaranteeing correct predictions"
      ]
    },
    {
      "id": "M-40",
      "question": "Which option correctly describes inference?",
      "options": [
        "collecting labels only",
        "charging an edge device",
        "drawing a wiring diagram",
        "using a trained model to produce a prediction"
      ]
    },
    {
      "id": "M-41",
      "question": "Which option correctly describes training data?",
      "options": [
        "examples used to optimise model parameters",
        "the final independent test results",
        "motor driver commands",
        "certificate records"
      ]
    },
    {
      "id": "M-42",
      "question": "Which option correctly describes validation data?",
      "options": [
        "Bluetooth serial bytes",
        "data used to tune choices without final test contamination",
        "data used only to power motors",
        "the same as every training example"
      ]
    },
    {
      "id": "M-43",
      "question": "Which option correctly describes test data?",
      "options": [
        "servo angle commands",
        "the power-supply specification",
        "held-out examples used for final performance estimation",
        "examples repeatedly used to tune the model"
      ]
    },
    {
      "id": "M-44",
      "question": "Which option correctly describes confidence threshold?",
      "options": [
        "proof that every accepted prediction is correct",
        "a motor voltage regulator",
        "a fixed ultrasonic distance",
        "a policy boundary for accepting or rejecting predictions"
      ]
    },
    {
      "id": "M-45",
      "question": "Which option correctly describes edge inference?",
      "options": [
        "running a model on or near the robot",
        "always sending inputs to a remote cloud",
        "using no processor",
        "performing only mechanical control"
      ]
    },
    {
      "id": "M-46",
      "question": "Which option correctly describes dataset bias?",
      "options": [
        "a loose caster wheel",
        "poor representation of real users or operating conditions",
        "a motor spinning backwards",
        "an incorrect baud rate"
      ]
    },
    {
      "id": "M-47",
      "question": "Which option correctly describes false negative?",
      "options": [
        "a motor that stops safely",
        "a completed certificate",
        "a real target or hazard that the model fails to detect",
        "a correct positive detection"
      ]
    },
    {
      "id": "M-48",
      "question": "Which option correctly describes acceptance criteria?",
      "options": [
        "informal goals that cannot be tested",
        "only the project title",
        "unrecorded assumptions",
        "measurable conditions defining project success"
      ]
    },
    {
      "id": "M-49",
      "question": "Which option correctly describes staged integration?",
      "options": [
        "testing subsystems before combining the complete robot",
        "connecting everything before any test",
        "skipping electrical inspection",
        "using maximum speed first"
      ]
    },
    {
      "id": "M-50",
      "question": "Which option correctly describes a physical emergency stop?",
      "options": [
        "calibrating line sensors",
        "providing a direct way to remove or halt power",
        "replacing software documentation",
        "increasing AI confidence"
      ]
    }
  ],
  "assessment1": [
    {
      "id": "A1-1",
      "question": "In a robotics system, select the correct statement about a robot.",
      "options": [
        "a fixed mechanical toy",
        "a programmable machine that senses, decides and acts",
        "a motor without control",
        "only a mobile application"
      ]
    },
    {
      "id": "A1-2",
      "question": "In a robotics system, select the correct statement about robot sensing.",
      "options": [
        "storing mechanical energy",
        "replacing all software",
        "converting physical conditions into usable signals",
        "supplying motor current directly"
      ]
    },
    {
      "id": "A1-3",
      "question": "In a robotics system, select the correct statement about an actuator.",
      "options": [
        "a device used only for data storage",
        "an ultrasonic calculation",
        "a training dataset",
        "a device that converts commands into physical action"
      ]
    },
    {
      "id": "A1-4",
      "question": "In a robotics system, select the correct statement about a controller.",
      "options": [
        "processing inputs and producing output commands",
        "providing unlimited motor current",
        "acting only as a battery",
        "replacing every sensor"
      ]
    },
    {
      "id": "A1-5",
      "question": "In a robotics system, select the correct statement about open-loop control.",
      "options": [
        "measuring echo time",
        "acting without measuring the resulting output",
        "correcting from continuous feedback",
        "training a neural network"
      ]
    },
    {
      "id": "A1-6",
      "question": "In a robotics system, select the correct statement about closed-loop control.",
      "options": [
        "disconnecting the controller",
        "using maximum PWM always",
        "using feedback to reduce an error",
        "running without any sensor input"
      ]
    },
    {
      "id": "A1-7",
      "question": "In a robotics system, select the correct statement about Arduino setup().",
      "options": [
        "repeating continuously forever",
        "measuring only analogue voltage",
        "stopping every motor automatically",
        "running initialization once after startup"
      ]
    },
    {
      "id": "A1-8",
      "question": "In a robotics system, select the correct statement about Arduino loop().",
      "options": [
        "repeating program logic while the board runs",
        "executing only during compilation",
        "configuring pins only once",
        "uploading a sketch"
      ]
    },
    {
      "id": "A1-9",
      "question": "In a robotics system, select the correct statement about pinMode().",
      "options": [
        "starting Bluetooth pairing",
        "configuring a pin as input or output",
        "reading an analogue sensor",
        "setting a servo angle"
      ]
    },
    {
      "id": "A1-10",
      "question": "In a robotics system, select the correct statement about digitalRead().",
      "options": [
        "measuring a floating-point distance",
        "training an AI model",
        "reading a digital HIGH or LOW state",
        "writing PWM speed"
      ]
    },
    {
      "id": "A1-11",
      "question": "In a robotics system, select the correct statement about analogRead() on Uno.",
      "options": [
        "returning only HIGH or LOW",
        "driving a DC motor directly",
        "creating a Bluetooth password",
        "returning a value normally from 0 to 1023"
      ]
    },
    {
      "id": "A1-12",
      "question": "In a robotics system, select the correct statement about PWM.",
      "options": [
        "controlling average delivered power with pulses",
        "changing a battery chemistry",
        "measuring ultrasonic frequency",
        "storing course progress"
      ]
    },
    {
      "id": "A1-13",
      "question": "In a robotics system, select the correct statement about common ground.",
      "options": [
        "replacing a motor driver",
        "providing circuits with a shared voltage reference",
        "doubling every supply voltage",
        "isolating all signal paths"
      ]
    },
    {
      "id": "A1-14",
      "question": "In a robotics system, select the correct statement about a pull-up resistor.",
      "options": [
        "increasing servo torque",
        "converting speech to text",
        "holding an input at a defined HIGH when open",
        "supplying motor stall current"
      ]
    },
    {
      "id": "A1-15",
      "question": "In a robotics system, select the correct statement about debouncing.",
      "options": [
        "increasing sensor range",
        "reversing an H-bridge",
        "encrypting serial data",
        "preventing repeated transitions from one physical switch action"
      ]
    },
    {
      "id": "A1-16",
      "question": "In a robotics system, select the correct statement about an L298N module.",
      "options": [
        "driving two DC motors with direction control",
        "recognising spoken words",
        "measuring reflected infrared only",
        "training object detection"
      ]
    },
    {
      "id": "A1-17",
      "question": "In a robotics system, select the correct statement about an H-bridge.",
      "options": [
        "pairing two Bluetooth devices",
        "reversing current through a motor",
        "converting analogue input to digital",
        "measuring battery capacity"
      ]
    },
    {
      "id": "A1-18",
      "question": "In a robotics system, select the correct statement about ENA and ENB.",
      "options": [
        "powering Arduino analogue references",
        "labelling AI images",
        "enabling L298N channels and accepting PWM speed control",
        "measuring left and right distance"
      ]
    },
    {
      "id": "A1-19",
      "question": "In a robotics system, select the correct statement about motor stall current.",
      "options": [
        "the lowest possible sensor current",
        "a serial communication speed",
        "an AI confidence value",
        "the high current drawn when the shaft cannot rotate"
      ]
    },
    {
      "id": "A1-20",
      "question": "In a robotics system, select the correct statement about a flyback diode.",
      "options": [
        "suppressing voltage spikes from an inductive load",
        "increasing motor RPM",
        "reading an LDR",
        "creating a common ground"
      ]
    },
    {
      "id": "A1-21",
      "question": "In a robotics system, select the correct statement about the HC-05.",
      "options": [
        "recognising speech by itself",
        "providing Bluetooth UART serial communication",
        "detecting distance with sound",
        "driving motors directly"
      ]
    },
    {
      "id": "A1-22",
      "question": "In a robotics system, select the correct statement about crossed UART wiring.",
      "options": [
        "connecting RX directly to motor output",
        "removing the common ground",
        "connecting one device TX to the other device RX",
        "joining both TX pins together only"
      ]
    },
    {
      "id": "A1-23",
      "question": "In a robotics system, select the correct statement about a voltage divider on HC-05 RX.",
      "options": [
        "increasing Bluetooth range",
        "charging the robot battery",
        "setting the baud rate",
        "reducing 5 V Arduino logic to a safer input level"
      ]
    },
    {
      "id": "A1-24",
      "question": "In a robotics system, select the correct statement about baud rate.",
      "options": [
        "the serial signalling rate used by both communicating devices",
        "the motor gear ratio",
        "the sensor mounting height",
        "the quiz pass mark"
      ]
    },
    {
      "id": "A1-25",
      "question": "In a robotics system, select the correct statement about a command watchdog.",
      "options": [
        "calibrating an LDR",
        "stopping motion when fresh valid commands cease",
        "increasing model accuracy",
        "measuring wheel diameter"
      ]
    },
    {
      "id": "A1-26",
      "question": "In a robotics system, select the correct statement about the HC-SR04 TRIG pin.",
      "options": [
        "controlling motor PWM",
        "selecting autonomous mode",
        "starting an ultrasonic measurement pulse",
        "returning echo duration"
      ]
    },
    {
      "id": "A1-27",
      "question": "In a robotics system, select the correct statement about the HC-SR04 ECHO pin.",
      "options": [
        "starting Bluetooth pairing",
        "supplying servo power",
        "selecting a motor direction",
        "reporting the sound round-trip pulse duration"
      ]
    },
    {
      "id": "A1-28",
      "question": "In a robotics system, select the correct statement about ultrasonic distance calculation.",
      "options": [
        "multiplying travel time by sound speed and dividing by two",
        "using PWM divided by battery voltage",
        "adding both motor speeds",
        "counting Bluetooth characters"
      ]
    },
    {
      "id": "A1-29",
      "question": "In a robotics system, select the correct statement about pulseIn() timeout.",
      "options": [
        "removing sensor noise entirely",
        "preventing indefinite waiting for a missing echo",
        "making the robot run longer",
        "increasing servo travel"
      ]
    },
    {
      "id": "A1-30",
      "question": "In a robotics system, select the correct statement about servo scanning.",
      "options": [
        "training a vision model",
        "protecting a relay coil",
        "aiming a distance sensor in multiple directions",
        "changing DC motor gear ratio"
      ]
    },
    {
      "id": "A1-31",
      "question": "In a robotics system, select the correct statement about an obstacle threshold.",
      "options": [
        "the maximum Bluetooth password length",
        "the ADC reference voltage",
        "the number of training labels",
        "the distance at which avoidance action begins"
      ]
    },
    {
      "id": "A1-32",
      "question": "In a robotics system, select the correct statement about IR reflectance sensing.",
      "options": [
        "distinguishing surfaces by reflected infrared energy",
        "measuring sound travel time",
        "receiving UART commands",
        "monitoring motor current only"
      ]
    },
    {
      "id": "A1-33",
      "question": "In a robotics system, select the correct statement about line sensor calibration.",
      "options": [
        "pairing the sensor to a phone",
        "setting height and threshold for the real track surface",
        "using full motor speed immediately",
        "removing all feedback"
      ]
    },
    {
      "id": "A1-34",
      "question": "In a robotics system, select the correct statement about differential steering.",
      "options": [
        "changing the ultrasonic frequency",
        "retraining an AI model",
        "turning by changing left and right wheel speeds",
        "moving a servo to 90 degrees"
      ]
    },
    {
      "id": "A1-35",
      "question": "In a robotics system, select the correct statement about line-loss recovery.",
      "options": [
        "continuing straight at maximum speed",
        "disabling both sensors",
        "changing Bluetooth PIN",
        "searching in the last known error direction"
      ]
    },
    {
      "id": "A1-36",
      "question": "In a robotics system, select the correct statement about proportional control.",
      "options": [
        "making correction magnitude depend on current error",
        "using only one fixed correction",
        "ignoring sensor measurements",
        "stopping after every loop"
      ]
    },
    {
      "id": "A1-37",
      "question": "In a robotics system, select the correct statement about voice robot speech recognition.",
      "options": [
        "being guaranteed by HC-05",
        "being performed by the phone or voice application",
        "being performed inside the L298N",
        "being performed by the motor"
      ]
    },
    {
      "id": "A1-38",
      "question": "In a robotics system, select the correct statement about a safe unknown voice command.",
      "options": [
        "disabling the watchdog",
        "changing mode randomly",
        "causing the robot to stop",
        "causing full-speed movement"
      ]
    },
    {
      "id": "A1-39",
      "question": "In a robotics system, select the correct statement about machine learning.",
      "options": [
        "guaranteeing correct predictions",
        "working without any data",
        "replacing all safety logic",
        "learning statistical patterns from examples"
      ]
    },
    {
      "id": "A1-40",
      "question": "In a robotics system, select the correct statement about inference.",
      "options": [
        "using a trained model to produce a prediction",
        "collecting labels only",
        "charging an edge device",
        "drawing a wiring diagram"
      ]
    },
    {
      "id": "A1-41",
      "question": "In a robotics system, select the correct statement about training data.",
      "options": [
        "certificate records",
        "examples used to optimise model parameters",
        "the final independent test results",
        "motor driver commands"
      ]
    },
    {
      "id": "A1-42",
      "question": "In a robotics system, select the correct statement about validation data.",
      "options": [
        "the same as every training example",
        "Bluetooth serial bytes",
        "data used to tune choices without final test contamination",
        "data used only to power motors"
      ]
    },
    {
      "id": "A1-43",
      "question": "In a robotics system, select the correct statement about test data.",
      "options": [
        "examples repeatedly used to tune the model",
        "servo angle commands",
        "the power-supply specification",
        "held-out examples used for final performance estimation"
      ]
    },
    {
      "id": "A1-44",
      "question": "In a robotics system, select the correct statement about confidence threshold.",
      "options": [
        "a policy boundary for accepting or rejecting predictions",
        "proof that every accepted prediction is correct",
        "a motor voltage regulator",
        "a fixed ultrasonic distance"
      ]
    },
    {
      "id": "A1-45",
      "question": "In a robotics system, select the correct statement about edge inference.",
      "options": [
        "performing only mechanical control",
        "running a model on or near the robot",
        "always sending inputs to a remote cloud",
        "using no processor"
      ]
    },
    {
      "id": "A1-46",
      "question": "In a robotics system, select the correct statement about dataset bias.",
      "options": [
        "an incorrect baud rate",
        "a loose caster wheel",
        "poor representation of real users or operating conditions",
        "a motor spinning backwards"
      ]
    },
    {
      "id": "A1-47",
      "question": "In a robotics system, select the correct statement about false negative.",
      "options": [
        "a correct positive detection",
        "a motor that stops safely",
        "a completed certificate",
        "a real target or hazard that the model fails to detect"
      ]
    },
    {
      "id": "A1-48",
      "question": "In a robotics system, select the correct statement about acceptance criteria.",
      "options": [
        "measurable conditions defining project success",
        "informal goals that cannot be tested",
        "only the project title",
        "unrecorded assumptions"
      ]
    },
    {
      "id": "A1-49",
      "question": "In a robotics system, select the correct statement about staged integration.",
      "options": [
        "using maximum speed first",
        "testing subsystems before combining the complete robot",
        "connecting everything before any test",
        "skipping electrical inspection"
      ]
    },
    {
      "id": "A1-50",
      "question": "In a robotics system, select the correct statement about a physical emergency stop.",
      "options": [
        "increasing AI confidence",
        "calibrating line sensors",
        "providing a direct way to remove or halt power",
        "replacing software documentation"
      ]
    }
  ],
  "assessment2": [
    {
      "id": "A2-1",
      "question": "For a new robot design, which principle correctly applies to a robot?",
      "options": [
        "only a mobile application",
        "a fixed mechanical toy",
        "a programmable machine that senses, decides and acts",
        "a motor without control"
      ]
    },
    {
      "id": "A2-2",
      "question": "For a new robot design, which principle correctly applies to robot sensing?",
      "options": [
        "supplying motor current directly",
        "storing mechanical energy",
        "replacing all software",
        "converting physical conditions into usable signals"
      ]
    },
    {
      "id": "A2-3",
      "question": "For a new robot design, which principle correctly applies to an actuator?",
      "options": [
        "a device that converts commands into physical action",
        "a device used only for data storage",
        "an ultrasonic calculation",
        "a training dataset"
      ]
    },
    {
      "id": "A2-4",
      "question": "For a new robot design, which principle correctly applies to a controller?",
      "options": [
        "replacing every sensor",
        "processing inputs and producing output commands",
        "providing unlimited motor current",
        "acting only as a battery"
      ]
    },
    {
      "id": "A2-5",
      "question": "For a new robot design, which principle correctly applies to open-loop control?",
      "options": [
        "training a neural network",
        "measuring echo time",
        "acting without measuring the resulting output",
        "correcting from continuous feedback"
      ]
    },
    {
      "id": "A2-6",
      "question": "For a new robot design, which principle correctly applies to closed-loop control?",
      "options": [
        "running without any sensor input",
        "disconnecting the controller",
        "using maximum PWM always",
        "using feedback to reduce an error"
      ]
    },
    {
      "id": "A2-7",
      "question": "For a new robot design, which principle correctly applies to Arduino setup()?",
      "options": [
        "running initialization once after startup",
        "repeating continuously forever",
        "measuring only analogue voltage",
        "stopping every motor automatically"
      ]
    },
    {
      "id": "A2-8",
      "question": "For a new robot design, which principle correctly applies to Arduino loop()?",
      "options": [
        "uploading a sketch",
        "repeating program logic while the board runs",
        "executing only during compilation",
        "configuring pins only once"
      ]
    },
    {
      "id": "A2-9",
      "question": "For a new robot design, which principle correctly applies to pinMode()?",
      "options": [
        "setting a servo angle",
        "starting Bluetooth pairing",
        "configuring a pin as input or output",
        "reading an analogue sensor"
      ]
    },
    {
      "id": "A2-10",
      "question": "For a new robot design, which principle correctly applies to digitalRead()?",
      "options": [
        "writing PWM speed",
        "measuring a floating-point distance",
        "training an AI model",
        "reading a digital HIGH or LOW state"
      ]
    },
    {
      "id": "A2-11",
      "question": "For a new robot design, which principle correctly applies to analogRead() on Uno?",
      "options": [
        "returning a value normally from 0 to 1023",
        "returning only HIGH or LOW",
        "driving a DC motor directly",
        "creating a Bluetooth password"
      ]
    },
    {
      "id": "A2-12",
      "question": "For a new robot design, which principle correctly applies to PWM?",
      "options": [
        "storing course progress",
        "controlling average delivered power with pulses",
        "changing a battery chemistry",
        "measuring ultrasonic frequency"
      ]
    },
    {
      "id": "A2-13",
      "question": "For a new robot design, which principle correctly applies to common ground?",
      "options": [
        "isolating all signal paths",
        "replacing a motor driver",
        "providing circuits with a shared voltage reference",
        "doubling every supply voltage"
      ]
    },
    {
      "id": "A2-14",
      "question": "For a new robot design, which principle correctly applies to a pull-up resistor?",
      "options": [
        "supplying motor stall current",
        "increasing servo torque",
        "converting speech to text",
        "holding an input at a defined HIGH when open"
      ]
    },
    {
      "id": "A2-15",
      "question": "For a new robot design, which principle correctly applies to debouncing?",
      "options": [
        "preventing repeated transitions from one physical switch action",
        "increasing sensor range",
        "reversing an H-bridge",
        "encrypting serial data"
      ]
    },
    {
      "id": "A2-16",
      "question": "For a new robot design, which principle correctly applies to an L298N module?",
      "options": [
        "training object detection",
        "driving two DC motors with direction control",
        "recognising spoken words",
        "measuring reflected infrared only"
      ]
    },
    {
      "id": "A2-17",
      "question": "For a new robot design, which principle correctly applies to an H-bridge?",
      "options": [
        "measuring battery capacity",
        "pairing two Bluetooth devices",
        "reversing current through a motor",
        "converting analogue input to digital"
      ]
    },
    {
      "id": "A2-18",
      "question": "For a new robot design, which principle correctly applies to ENA and ENB?",
      "options": [
        "measuring left and right distance",
        "powering Arduino analogue references",
        "labelling AI images",
        "enabling L298N channels and accepting PWM speed control"
      ]
    },
    {
      "id": "A2-19",
      "question": "For a new robot design, which principle correctly applies to motor stall current?",
      "options": [
        "the high current drawn when the shaft cannot rotate",
        "the lowest possible sensor current",
        "a serial communication speed",
        "an AI confidence value"
      ]
    },
    {
      "id": "A2-20",
      "question": "For a new robot design, which principle correctly applies to a flyback diode?",
      "options": [
        "creating a common ground",
        "suppressing voltage spikes from an inductive load",
        "increasing motor RPM",
        "reading an LDR"
      ]
    },
    {
      "id": "A2-21",
      "question": "For a new robot design, which principle correctly applies to the HC-05?",
      "options": [
        "driving motors directly",
        "recognising speech by itself",
        "providing Bluetooth UART serial communication",
        "detecting distance with sound"
      ]
    },
    {
      "id": "A2-22",
      "question": "For a new robot design, which principle correctly applies to crossed UART wiring?",
      "options": [
        "joining both TX pins together only",
        "connecting RX directly to motor output",
        "removing the common ground",
        "connecting one device TX to the other device RX"
      ]
    },
    {
      "id": "A2-23",
      "question": "For a new robot design, which principle correctly applies to a voltage divider on HC-05 RX?",
      "options": [
        "reducing 5 V Arduino logic to a safer input level",
        "increasing Bluetooth range",
        "charging the robot battery",
        "setting the baud rate"
      ]
    },
    {
      "id": "A2-24",
      "question": "For a new robot design, which principle correctly applies to baud rate?",
      "options": [
        "the quiz pass mark",
        "the serial signalling rate used by both communicating devices",
        "the motor gear ratio",
        "the sensor mounting height"
      ]
    },
    {
      "id": "A2-25",
      "question": "For a new robot design, which principle correctly applies to a command watchdog?",
      "options": [
        "measuring wheel diameter",
        "calibrating an LDR",
        "stopping motion when fresh valid commands cease",
        "increasing model accuracy"
      ]
    },
    {
      "id": "A2-26",
      "question": "For a new robot design, which principle correctly applies to the HC-SR04 TRIG pin?",
      "options": [
        "returning echo duration",
        "controlling motor PWM",
        "selecting autonomous mode",
        "starting an ultrasonic measurement pulse"
      ]
    },
    {
      "id": "A2-27",
      "question": "For a new robot design, which principle correctly applies to the HC-SR04 ECHO pin?",
      "options": [
        "reporting the sound round-trip pulse duration",
        "starting Bluetooth pairing",
        "supplying servo power",
        "selecting a motor direction"
      ]
    },
    {
      "id": "A2-28",
      "question": "For a new robot design, which principle correctly applies to ultrasonic distance calculation?",
      "options": [
        "counting Bluetooth characters",
        "multiplying travel time by sound speed and dividing by two",
        "using PWM divided by battery voltage",
        "adding both motor speeds"
      ]
    },
    {
      "id": "A2-29",
      "question": "For a new robot design, which principle correctly applies to pulseIn() timeout?",
      "options": [
        "increasing servo travel",
        "removing sensor noise entirely",
        "preventing indefinite waiting for a missing echo",
        "making the robot run longer"
      ]
    },
    {
      "id": "A2-30",
      "question": "For a new robot design, which principle correctly applies to servo scanning?",
      "options": [
        "changing DC motor gear ratio",
        "training a vision model",
        "protecting a relay coil",
        "aiming a distance sensor in multiple directions"
      ]
    },
    {
      "id": "A2-31",
      "question": "For a new robot design, which principle correctly applies to an obstacle threshold?",
      "options": [
        "the distance at which avoidance action begins",
        "the maximum Bluetooth password length",
        "the ADC reference voltage",
        "the number of training labels"
      ]
    },
    {
      "id": "A2-32",
      "question": "For a new robot design, which principle correctly applies to IR reflectance sensing?",
      "options": [
        "monitoring motor current only",
        "distinguishing surfaces by reflected infrared energy",
        "measuring sound travel time",
        "receiving UART commands"
      ]
    },
    {
      "id": "A2-33",
      "question": "For a new robot design, which principle correctly applies to line sensor calibration?",
      "options": [
        "removing all feedback",
        "pairing the sensor to a phone",
        "setting height and threshold for the real track surface",
        "using full motor speed immediately"
      ]
    },
    {
      "id": "A2-34",
      "question": "For a new robot design, which principle correctly applies to differential steering?",
      "options": [
        "moving a servo to 90 degrees",
        "changing the ultrasonic frequency",
        "retraining an AI model",
        "turning by changing left and right wheel speeds"
      ]
    },
    {
      "id": "A2-35",
      "question": "For a new robot design, which principle correctly applies to line-loss recovery?",
      "options": [
        "searching in the last known error direction",
        "continuing straight at maximum speed",
        "disabling both sensors",
        "changing Bluetooth PIN"
      ]
    },
    {
      "id": "A2-36",
      "question": "For a new robot design, which principle correctly applies to proportional control?",
      "options": [
        "stopping after every loop",
        "making correction magnitude depend on current error",
        "using only one fixed correction",
        "ignoring sensor measurements"
      ]
    },
    {
      "id": "A2-37",
      "question": "For a new robot design, which principle correctly applies to voice robot speech recognition?",
      "options": [
        "being performed by the motor",
        "being guaranteed by HC-05",
        "being performed by the phone or voice application",
        "being performed inside the L298N"
      ]
    },
    {
      "id": "A2-38",
      "question": "For a new robot design, which principle correctly applies to a safe unknown voice command?",
      "options": [
        "causing full-speed movement",
        "disabling the watchdog",
        "changing mode randomly",
        "causing the robot to stop"
      ]
    },
    {
      "id": "A2-39",
      "question": "For a new robot design, which principle correctly applies to machine learning?",
      "options": [
        "learning statistical patterns from examples",
        "guaranteeing correct predictions",
        "working without any data",
        "replacing all safety logic"
      ]
    },
    {
      "id": "A2-40",
      "question": "For a new robot design, which principle correctly applies to inference?",
      "options": [
        "drawing a wiring diagram",
        "using a trained model to produce a prediction",
        "collecting labels only",
        "charging an edge device"
      ]
    },
    {
      "id": "A2-41",
      "question": "For a new robot design, which principle correctly applies to training data?",
      "options": [
        "motor driver commands",
        "certificate records",
        "examples used to optimise model parameters",
        "the final independent test results"
      ]
    },
    {
      "id": "A2-42",
      "question": "For a new robot design, which principle correctly applies to validation data?",
      "options": [
        "data used only to power motors",
        "the same as every training example",
        "Bluetooth serial bytes",
        "data used to tune choices without final test contamination"
      ]
    },
    {
      "id": "A2-43",
      "question": "For a new robot design, which principle correctly applies to test data?",
      "options": [
        "held-out examples used for final performance estimation",
        "examples repeatedly used to tune the model",
        "servo angle commands",
        "the power-supply specification"
      ]
    },
    {
      "id": "A2-44",
      "question": "For a new robot design, which principle correctly applies to confidence threshold?",
      "options": [
        "a fixed ultrasonic distance",
        "a policy boundary for accepting or rejecting predictions",
        "proof that every accepted prediction is correct",
        "a motor voltage regulator"
      ]
    },
    {
      "id": "A2-45",
      "question": "For a new robot design, which principle correctly applies to edge inference?",
      "options": [
        "using no processor",
        "performing only mechanical control",
        "running a model on or near the robot",
        "always sending inputs to a remote cloud"
      ]
    },
    {
      "id": "A2-46",
      "question": "For a new robot design, which principle correctly applies to dataset bias?",
      "options": [
        "a motor spinning backwards",
        "an incorrect baud rate",
        "a loose caster wheel",
        "poor representation of real users or operating conditions"
      ]
    },
    {
      "id": "A2-47",
      "question": "For a new robot design, which principle correctly applies to false negative?",
      "options": [
        "a real target or hazard that the model fails to detect",
        "a correct positive detection",
        "a motor that stops safely",
        "a completed certificate"
      ]
    },
    {
      "id": "A2-48",
      "question": "For a new robot design, which principle correctly applies to acceptance criteria?",
      "options": [
        "unrecorded assumptions",
        "measurable conditions defining project success",
        "informal goals that cannot be tested",
        "only the project title"
      ]
    },
    {
      "id": "A2-49",
      "question": "For a new robot design, which principle correctly applies to staged integration?",
      "options": [
        "skipping electrical inspection",
        "using maximum speed first",
        "testing subsystems before combining the complete robot",
        "connecting everything before any test"
      ]
    },
    {
      "id": "A2-50",
      "question": "For a new robot design, which principle correctly applies to a physical emergency stop?",
      "options": [
        "replacing software documentation",
        "increasing AI confidence",
        "calibrating line sensors",
        "providing a direct way to remove or halt power"
      ]
    }
  ]
};
