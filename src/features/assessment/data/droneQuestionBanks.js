const droneQuestionSeeds = [
  ["What produces lift on a multirotor drone?", "Rotating propellers accelerating air", "The GPS antenna", "The landing gear", "The camera mount"],
  ["What is a quadcopter?", "A multirotor aircraft with four motors", "A fixed-wing aircraft with four seats", "A helicopter with four pilots", "A ground robot"],
  ["What primarily controls altitude in a multirotor?", "The combined thrust of its motors", "The frame colour", "The GPS map scale", "The receiver antenna length"],
  ["What causes a quadcopter to roll?", "A controlled thrust difference between its left and right sides", "Changing every propeller to the same direction", "Turning off the receiver", "Removing the battery strap"],
  ["Why do adjacent quadcopter propellers normally rotate in opposite directions?", "To balance reaction torque", "To increase GPS accuracy", "To charge the battery", "To cool the radio"],
  ["What is the safest condition for learning initial flight control?", "A permitted open area with an instructor or trained observer", "A crowded street", "Inside an airport boundary", "Above people"],
  ["What should a pilot check before every flight?", "Aircraft condition, weather, area, battery, controls and fail-safes", "Only the camera resolution", "Only the frame colour", "Only the mobile data balance"],
  ["Why must local drone regulations be checked before operating?", "Rules vary by location, aircraft and operation", "Regulations configure PID gains", "They increase motor power", "They replace pre-flight inspection"],
  ["What is line of sight in drone operation?", "Continuous unaided visual awareness of the aircraft as required", "A telemetry graph", "A GPS waypoint", "A motor test"],
  ["Why should a drone not be flown over uninvolved people?", "A failure could cause injury", "It reduces video colour", "It disables GPS", "It changes propeller pitch"],
  ["What is the frame's main function?", "Hold components in a rigid, aligned structure", "Measure altitude", "Transmit radio commands", "Store flight logs"],
  ["What does wheelbase commonly describe on a quadcopter frame?", "The distance between opposing motor axes", "Battery capacity", "Radio frequency", "Propeller thickness"],
  ["What does a brushless motor require for electronic commutation?", "An electronic speed controller", "A GPS receiver", "A barometer", "A landing pad"],
  ["What does KV indicate on a brushless motor?", "Approximate no-load rpm per volt", "Battery capacity in watt-hours", "Maximum GPS satellites", "Frame weight in kilograms"],
  ["Why must the motor, propeller, ESC and battery be matched?", "An incompatible combination can overheat or fail", "Matching changes legal airspace", "It creates telemetry encryption", "It calibrates the compass"],
  ["What is an ESC?", "An electronic speed controller for a brushless motor", "An emergency satellite compass", "An external sensor camera", "An electronic storage card"],
  ["What is the safest way to perform an initial motor-direction test?", "Remove propellers and restrain the frame", "Hold the drone by hand with propellers fitted", "Increase full throttle immediately", "Test over people"],
  ["What can happen if a propeller is installed on the wrong motor direction?", "The aircraft may flip or fail to lift", "GPS becomes more accurate", "The battery gains capacity", "The frame becomes lighter"],
  ["What does a LiPo battery's cell count affect?", "Nominal pack voltage", "Receiver channel order", "GPS coordinates", "Frame geometry"],
  ["Why must a damaged or swollen LiPo battery be isolated and handled properly?", "It presents a serious fire risk", "It cannot store flight logs", "It changes radio mode", "It only affects camera focus"],
  ["What is the flight controller's main role?", "Estimate motion and command motors to stabilise and navigate", "Supply unlimited motor current", "Replace every radio antenna", "Act as the airframe"],
  ["What does an accelerometer measure?", "Specific force including the effect of gravity", "GPS longitude only", "Motor temperature only", "Radio signal strength only"],
  ["What does a gyroscope measure?", "Angular rotation rate", "Battery capacity", "Airframe length", "Satellite identity"],
  ["What does a barometer help estimate?", "Altitude from air pressure", "Propeller direction", "Radio channel order", "Motor KV"],
  ["Why is sensor calibration performed on a stable surface?", "Movement or tilt can corrupt calibration", "It increases battery capacity", "It registers the pilot", "It changes motor wiring"],
  ["What is sensor fusion?", "Combining multiple measurements for a better state estimate", "Connecting batteries in parallel", "Mixing propeller sizes", "Joining radio channels"],
  ["What does a PID controller do in flight stabilisation?", "Correct error using proportional, integral and derivative terms", "Select legal airspace", "Balance a battery", "Decode video"],
  ["What may excessive proportional gain cause?", "Fast oscillation or instability", "Longer propellers", "Higher GPS resolution", "More receiver channels"],
  ["What is the safest PID tuning approach?", "Small controlled changes with logs and test observations", "Random large changes in flight", "Disable all limits", "Tune over people"],
  ["Why should configuration backups be saved?", "A known working setup can be restored", "They charge batteries", "They replace firmware", "They improve airframe strength"],
  ["What does a radio transmitter send?", "Pilot commands to the aircraft receiver", "Motor phase current", "GPS correction by itself", "Battery balance voltage"],
  ["What should an arming control do?", "Deliberately enable motor operation", "Download maps", "Charge the flight battery", "Change propeller pitch mechanically"],
  ["Why configure a throttle failsafe?", "To define a safe response when control signal is lost", "To increase maximum speed", "To sharpen camera video", "To bypass geofencing"],
  ["What is an assisted flight mode?", "A mode in which the controller helps stabilise or hold a target", "A mode without sensors", "A battery storage mode", "A propeller-balancing tool"],
  ["What should be verified after changing receiver channel mapping?", "Every stick and switch moves the intended control in the correct direction", "Only the screen brightness", "Only the GPS date", "Only the motor colour"],
  ["Why should propellers remain removed during configuration?", "Unexpected motor start cannot produce propeller injury", "GPS cannot work with propellers", "Receivers require no propellers", "It updates firmware faster"],
  ["What is telemetry?", "Operational data exchanged between aircraft and ground station", "A propeller material", "A battery connector", "A frame shape"],
  ["What does a ground control station provide?", "Configuration, monitoring, mapping and mission tools", "Direct motor power", "A physical airframe", "Battery fire suppression"],
  ["Why should telemetry warnings be configured?", "They alert the operator to unsafe battery, GPS or system conditions", "They increase thrust", "They legalise every operation", "They replace visual observation"],
  ["What does GPS provide to a flight controller?", "Position, velocity and time information", "Motor phase timing", "Battery cell balance", "Propeller torque"],
  ["Why is compass calibration sensitive to nearby metal and current-carrying wires?", "Magnetic interference can distort heading", "Metal increases GPS satellites", "Current changes frame size", "Wires change air pressure"],
  ["What is return-to-home?", "A configured recovery mode that navigates toward a recorded home location", "A battery-charging method", "A radio binding process", "A motor test"],
  ["What is a waypoint mission?", "A planned sequence of geographic targets and actions", "A list of motor KV values", "A battery inspection", "A receiver channel map"],
  ["Why must an autonomous mission be reviewed before upload?", "Incorrect altitude, path or actions can create hazards", "Reviewing increases battery voltage", "It changes the frame material", "It removes the need for a pilot"],
  ["What does geofencing do?", "Applies configured geographic or altitude boundaries", "Balances propellers", "Encrypts video", "Changes battery chemistry"],
  ["What is a sensible response to poor GPS quality before takeoff?", "Delay or cancel GPS-dependent flight until quality is acceptable", "Arm and fly farther", "Disable every fail-safe", "Ignore all warnings"],
  ["Why should autonomous modes have a tested pilot takeover method?", "Automation can encounter unexpected conditions", "Manual control improves GPS satellites", "It charges the battery", "It changes local rules"],
  ["What is the purpose of flight logs?", "Support diagnosis, tuning, evidence and maintenance decisions", "Provide motor power", "Replace pre-flight checks", "Authorise airspace automatically"],
  ["What should the final quadcopter project documentation include?", "Requirements, wiring, configuration, safety checks, tests, logs and limitations", "Only a photograph", "Only the purchase receipt", "Unverified performance claims"],
  ["When is a final flight test complete?", "After controlled checks confirm safe behaviour and the results are documented", "After the motors spin once", "After GPS connects indoors", "After removing all fail-safes"],
];

function buildBank(prefix, shift, reverse = false) {
  const source = reverse ? [...droneQuestionSeeds].reverse() : droneQuestionSeeds;
  return source.map(([question, correct, ...incorrect], index) => {
    const options = [correct, ...incorrect];
    const rotation = (index + shift) % 4;
    const rotated = [...options.slice(rotation), ...options.slice(0, rotation)];
    return { id: `${prefix}-${index + 1}`, question, options: rotated, answer: rotated.indexOf(correct) };
  });
}

export const droneQuestionBanks = {
  mock: buildBank("DM", 0),
  assessment1: buildBank("DA1", 1),
  assessment2: buildBank("DA2", 2, true),
};
