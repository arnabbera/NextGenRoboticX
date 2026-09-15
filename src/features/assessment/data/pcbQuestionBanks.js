export const pcbQuestionSeeds = [
  ["What should begin an electronic product-development project?", "Measurable user and system requirements", "PCB routing", "Gerber generation", "Mass production"],
  ["What is a functional requirement?", "A statement of what the product must do", "The preferred board colour", "A supplier discount", "An unmeasurable ambition"],
  ["What is a non-functional requirement?", "A measurable quality such as accuracy, temperature range or response time", "A schematic wire", "A component reference", "A drill file"],
  ["What is the main purpose of a system block diagram?", "Show functional blocks and their interfaces", "Show exact copper geometry", "Replace the BOM", "Define solder-paste thickness"],
  ["What does design verification determine?", "Whether the design meets specified requirements", "Whether every user likes the product", "Whether the logo is attractive", "Whether all traces are blue"],
  ["What does design validation determine?", "Whether the product satisfies its intended use", "Whether DRC can be disabled", "Whether the BOM is alphabetical", "Whether every via is identical"],
  ["Which datasheet section defines stress limits that must not be exceeded?", "Absolute maximum ratings", "Ordering information", "Typical application title", "Package marking"],
  ["Where should a component normally operate?", "Within recommended conditions with suitable margin", "At absolute maximum continuously", "Above its temperature rating", "Without considering tolerance"],
  ["What is derating?", "Operating below maximum capability to improve margin and reliability", "Increasing voltage beyond the rating", "Removing all protection", "Ignoring temperature"],
  ["How is resistor power calculated from current and resistance?", "P = I²R", "P = I/R", "P = R/I", "P = I + R"],
  ["Which MOSFET parameter must be checked at the actual gate-drive voltage?", "On-resistance RDS(on)", "Body colour", "Silkscreen size", "Supplier postcode"],
  ["Why verify component lifecycle status?", "To manage obsolescence and supply risk", "To set track width", "To generate firmware", "To choose solder-mask colour"],
  ["What does a schematic primarily describe?", "Electrical connectivity and circuit intent", "Physical copper artwork only", "Enclosure texture", "Assembly labour cost"],
  ["What is the purpose of a net label?", "Identify and connect an electrical node by name", "Set component price", "Create a board outline", "Measure temperature"],
  ["Where should a local decoupling capacitor be placed?", "Close to the relevant IC supply and ground pins", "At the opposite board edge", "Only beside the connector", "In series with the clock"],
  ["What does ERC detect?", "Likely electrical schematic errors", "Mechanical enclosure collisions only", "PCB surface finish", "Firmware syntax"],
  ["Why define reset and boot-pin states explicitly?", "To ensure predictable behaviour during power-up and reset", "To increase copper thickness", "To remove programming access", "To avoid a schematic"],
  ["What should be done with an unused input pin?", "Follow the manufacturer's defined termination guidance", "Always leave it floating", "Connect it to mains", "Connect it to any output"],
  ["What should a power budget include?", "Normal, peak, start-up and fault-related current", "Only typical current", "Only board area", "Only resistor count"],
  ["What is approximate LDO dissipation?", "(Vin − Vout) × Iout", "Vin + Vout", "Vout/Iout", "Vin × Vout"],
  ["What is a TVS diode used for?", "Clamping short-duration voltage transients", "Program storage", "Clock generation", "Replacing every fuse"],
  ["Why minimise a switching-current loop?", "To reduce inductance, noise and emissions", "To increase ringing", "To lengthen return paths", "To remove capacitance"],
  ["What is a signal return path?", "The path current takes back to its source", "A spare net name", "A BOM field", "Only a chassis screw"],
  ["Why can a fast signal crossing a plane split be harmful?", "Its return current is forced into a larger uncontrolled loop", "It becomes analogue", "It deletes the ground net", "It increases solder mask"],
  ["What should determine a PCB stack-up?", "Electrical, mechanical, EMC, cost and fabrication needs", "Only layer colour", "Only schematic pages", "Only component count"],
  ["What is the annular ring?", "Copper surrounding a drilled hole", "Silkscreen around an IC", "A schematic junction", "The board outline"],
  ["What must a footprint match?", "The exact ordered component package and pin numbering", "Only the generic component family", "Only the symbol colour", "Only the supplier name"],
  ["What is a courtyard used for?", "Representing component placement and assembly space", "Setting impedance", "Naming a power rail", "Defining firmware memory"],
  ["Why define PCB keep-outs?", "Prevent prohibited copper, vias or components in constrained areas", "Increase BOM quantity", "Change resistor tolerance", "Replace DRC"],
  ["When should connector and mounting-hole locations be established?", "During board and mechanical planning before general placement", "After production", "After firmware release", "Only during inspection"],
  ["Which components are normally placed first?", "Mechanically fixed and electrically critical components", "Random passives", "Silkscreen text", "Only test points"],
  ["Why keep regulator switching parts close together?", "To minimise the high di/dt loop", "To increase loop area", "To split ground", "To lengthen traces"],
  ["What determines power-trace width?", "Current, copper thickness, voltage drop and permitted temperature rise", "Net-name length", "Board title", "Component colour"],
  ["What should accompany a fast signal when it changes reference layers?", "A nearby return-current transition such as a stitching via", "An open stub", "A plane split", "A long ground wire"],
  ["What is important for a differential pair?", "Consistent geometry, coupling and reference path", "Unrelated trace lengths", "Routing across plane gaps", "Multiple branches"],
  ["Why plan test points during layout?", "To support accessible and repeatable measurements", "To replace the schematic", "To increase EMI", "To set component cost"],
  ["What does EMC require?", "Acceptable operation without causing or suffering unacceptable electromagnetic disturbance", "Only low emissions", "Only thermal control", "Only a metal enclosure"],
  ["What three elements form an interference problem?", "Source, coupling path and victim", "BOM, invoice and supplier", "Pad, mask and paste", "Clock, firmware and enclosure"],
  ["How is junction temperature estimated at first order?", "Tj = Ta + P × θJA", "Tj = P/Ta", "Tj = Ta − P", "Tj = V + I"],
  ["What do thermal vias provide?", "A heat-transfer path between copper layers", "A clock source", "A firmware interface", "A net label"],
  ["Why conduct pre-compliance EMC testing?", "Find likely problems before formal compliance testing", "Replace every certification", "Avoid layout review", "Set the board revision"],
  ["Which environmental factors can affect reliability?", "Temperature, humidity, vibration and contamination", "Only board colour", "Only software version", "Only schematic scale"],
  ["What is the purpose of DRC?", "Check PCB geometry against defined design rules", "Write firmware", "Select components", "Create marketing images"],
  ["What is DFM?", "Reviewing whether a design can be fabricated and assembled reliably", "Only electrical simulation", "Only purchasing", "Only firmware testing"],
  ["What do Gerber files describe?", "Image data for fabrication layers", "Component prices", "Test logs", "Source code"],
  ["What does a pick-and-place file contain?", "Component positions, rotations and board sides", "Only resistor values", "Copper thickness only", "Firmware binaries"],
  ["Why inspect outputs in an independent viewer?", "Verify completeness, polarity, alignment and generated content", "Replace DRC", "Change the schematic", "Remove traceability"],
  ["What should be checked before first power-up?", "Assembly, polarity and resistance between rails and ground", "Only the LED colour", "Only firmware", "Only enclosure fit"],
  ["Why use a current-limited supply for bring-up?", "Limit damage if the board draws unexpected current", "Increase every rail", "Replace inspection", "Program the board automatically"],
  ["What makes a final PCB handover complete?", "Controlled source, manufacturing files, BOM, test evidence and revision history", "Only a board photograph", "Only the schematic PDF", "Only a firmware binary"],
];

function buildBank(prefix, shift, reverse = false) {
  const source = reverse ? [...pcbQuestionSeeds].reverse() : pcbQuestionSeeds;
  return source.map(([question, correct, ...incorrect], index) => {
    const options = [correct, ...incorrect];
    const rotation = (index + shift) % 4;
    const rotated = [...options.slice(rotation), ...options.slice(0, rotation)];
    return { id: `${prefix}-${index + 1}`, question, options: rotated, answer: rotated.indexOf(correct) };
  });
}

export const pcbQuestionBanks = {
  mock: buildBank("PM", 0),
  assessment1: buildBank("PA1", 1),
  assessment2: buildBank("PA2", 2, true),
};
