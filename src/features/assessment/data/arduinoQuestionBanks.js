export const arduinoQuestionSeeds = [
  ["What is Arduino?", "An open-source electronics prototyping platform", "A database server", "A mechanical gearbox", "A web browser"],
  ["Which application is commonly used to write and upload Arduino sketches?", "Arduino IDE", "Spreadsheet Editor", "MQTT Broker", "Raspberry Pi Imager"],
  ["What does setup() do in an Arduino sketch?", "Runs once after startup or reset", "Runs forever", "Deletes the program", "Changes the board voltage"],
  ["What does loop() do?", "Repeats while the board is running", "Runs only during compilation", "Formats the computer", "Selects the serial port"],
  ["Which function configures a digital pin direction?", "pinMode()", "digitalRead()", "delay()", "Serial.print()"],
  ["Which mode configures a pin as an output?", "OUTPUT", "INPUT", "LOW", "SERIAL"],
  ["What does digitalWrite(pin, HIGH) normally request?", "A logic-high output on the pin", "An analogue measurement", "A program upload", "A serial connection"],
  ["What values can digitalRead() normally return?", "HIGH or LOW", "Only 0 to 1023", "Text only", "A floating-point voltage only"],
  ["Why should an LED normally use a series resistor?", "To limit current", "To increase memory", "To upload faster", "To enable Wi-Fi"],
  ["What is a breadboard used for?", "Temporary solderless circuit prototyping", "Permanent cloud storage", "Compiling C++", "Measuring radio frequency"],
  ["What does analogRead() measure on a supported input?", "A converted analogue voltage level", "Motor speed directly", "Internet latency", "Program size"],
  ["What is the typical analogRead() range on an Arduino Uno?", "0 to 1023", "0 to 1", "0 to 255 only", "-1024 to 1024"],
  ["What does PWM approximate on supported Arduino pins?", "An adjustable average output using pulses", "A true analogue input", "A network packet", "A file permission"],
  ["Which function produces PWM on classic Arduino boards?", "analogWrite()", "analogRead()", "toneRead()", "pinInput()"],
  ["What is a variable?", "A named storage location for a value", "A fixed resistor", "A USB connector", "A compiler error"],
  ["Which type commonly stores true or false?", "bool", "void", "String only", "float pin"],
  ["Why use const for a pin number that should not change?", "It prevents accidental reassignment and documents intent", "It increases pin voltage", "It enables interrupts", "It removes the bootloader"],
  ["What does an if statement provide?", "Conditional execution", "Permanent data storage", "Circuit protection", "Serial wiring"],
  ["What is a for loop useful for?", "Repeating an operation a controlled number of times", "Supplying motor current", "Selecting a board", "Changing USB voltage"],
  ["What does == test in C++?", "Equality", "Assignment", "Multiplication", "Bit rate"],
  ["Why initialise Serial in setup()?", "To configure serial communication speed", "To power sensors", "To erase flash", "To set PWM frequency automatically"],
  ["What must Serial Monitor baud rate match?", "The rate passed to Serial.begin()", "The LED resistance", "The board voltage only", "The loop count"],
  ["What is debouncing?", "Preventing one mechanical button action from appearing as many transitions", "Removing source comments", "Increasing clock speed", "Encrypting serial data"],
  ["What does INPUT_PULLUP enable?", "The microcontroller's internal pull-up resistor", "An external motor supply", "A DAC", "A Wi-Fi hotspot"],
  ["With INPUT_PULLUP, a pressed button wired to ground normally reads what?", "LOW", "HIGH", "1023", "Undefined text"],
  ["What is a function parameter?", "An input value supplied to a function", "A power rail", "A compiler installation", "A sensor enclosure"],
  ["Why split a sketch into functions?", "To improve structure, reuse, testing, and readability", "To increase GPIO voltage", "To bypass compilation", "To remove all variables"],
  ["What is an array?", "A fixed collection of same-type elements accessed by index", "A motor driver", "A cloud API", "A soldering method"],
  ["What is the first index of a C++ array?", "0", "1", "-1", "10"],
  ["Why check array bounds?", "Out-of-range access can corrupt memory or cause unpredictable behaviour", "It changes PWM duty cycle", "It selects the board", "It powers the USB port"],
  ["What does millis() return?", "Milliseconds since the current program started", "Current in milliamps", "The date from the internet", "Free flash bytes"],
  ["Why prefer millis() timing over long delay() calls?", "It allows other work to continue while waiting", "It raises analogue resolution", "It adds RAM", "It changes the compiler"],
  ["What is a finite-state machine?", "A design with explicit states and controlled transitions", "A power converter", "A serial cable", "A sensor calibration unit"],
  ["What is an interrupt suitable for?", "Responding quickly to an important supported event", "Running long blocking network requests", "Printing many lines", "Powering a motor directly"],
  ["What should an interrupt service routine generally be?", "Short and non-blocking", "Long and delay-heavy", "Dependent on Serial printing", "Used for every calculation"],
  ["What protocol uses SDA and SCL lines?", "I2C", "SPI", "UART only", "PWM"],
  ["What is an I2C address used for?", "Selecting a device on the shared bus", "Setting GPIO current", "Naming a C++ variable", "Choosing a USB cable"],
  ["Which signals are central to SPI?", "Clock, data-in, data-out, and chip-select", "SDA and SCL only", "TX and RX only", "HIGH and LOW only"],
  ["Which lines are normally used by UART?", "TX and RX", "SDA and SCL", "MOSI and MISO only", "A0 and A1 only"],
  ["Why must communicating boards share a compatible ground reference?", "So signal voltage levels have a common reference", "To increase program memory", "To compile libraries", "To create PWM"],
  ["Why should a DC motor not be powered directly from an Arduino I/O pin?", "The motor can require more current and create damaging transients", "The pin cannot output logic", "The IDE blocks motors", "Serial requires the pin"],
  ["What does an H-bridge allow?", "Bidirectional control of a DC motor", "Analogue sensing only", "Cloud storage", "Program compilation"],
  ["Why use a flyback diode with an inductive load when required?", "To provide a path for damaging voltage transients", "To increase RAM", "To debounce buttons", "To change baud rate"],
  ["What does a servo control signal specify?", "Target position through timed pulses", "Supply current directly", "An I2C address", "A serial string"],
  ["Why use a separate suitable supply for motors or multiple servos?", "Their current demand may exceed the board regulator or USB source", "They require internet access", "They only accept analogue input", "They erase flash"],
  ["What is a library in Arduino development?", "Reusable code that provides an interface to hardware or functionality", "A physical power supply", "A sensor error", "A PCB trace"],
  ["What commonly causes an upload failure?", "Wrong board or port selection, cable, driver, or port conflict", "Too many comments", "A low loop count", "Using const"],
  ["What should be done before rewiring a circuit?", "Disconnect power and verify the planned connections", "Set every output HIGH", "Remove all resistors", "Publish credentials"],
  ["What makes sensor calibration credible?", "Comparison with known references across the intended operating range", "One unrecorded reading", "Changing code until it looks right", "Ignoring environmental conditions"],
  ["What belongs in a final Arduino project report?", "Requirements, diagram, code, tests, results, safety, limitations, and improvements", "Passwords and private keys", "Only a photograph", "Claims without evidence"],
];

function buildBank(prefix, shift, reverse = false) {
  const source = reverse ? [...arduinoQuestionSeeds].reverse() : arduinoQuestionSeeds;
  return source.map(([question, correct, ...incorrect], index) => {
    const options = [correct, ...incorrect];
    const rotation = (index + shift) % 4;
    const rotated = [...options.slice(rotation), ...options.slice(0, rotation)];
    return { id: `${prefix}-${index + 1}`, question, options: rotated, answer: rotated.indexOf(correct) };
  });
}

export const arduinoQuestionBanks = {
  mock: buildBank("AM", 0),
  assessment1: buildBank("AA1", 1),
  assessment2: buildBank("AA2", 2, true),
};
