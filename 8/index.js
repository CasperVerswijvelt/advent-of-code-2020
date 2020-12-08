const fs = require("fs");

const text = fs.readFileSync(process.argv[2]).toString();
const lines = text.split("\n");

let acc = 0
let lineExecutedMap = {}

let currentInstruction = 0;

while (true) {

  if (lineExecutedMap[currentInstruction]) {
    console.log(`Already executed instruction ${currentInstruction}`)
    break
  }

  const line = lines[currentInstruction];
  const split = line.split(" ");
  const instruction = split[0]
  const value = parseInt(split[1])

  console.log(`Instruction ${currentInstruction}: ${instruction}, ${value}`)

  lineExecutedMap[currentInstruction] = true;

  switch (instruction) {
    case "acc":
      acc += value
      currentInstruction += 1;
      break
    case "jmp":
      currentInstruction += value;
      break
    case "nop":
      currentInstruction += 1;
      break;
  }

  if (currentInstruction === lines.length) {
    console.log(`Program exited succesfully`)
    break;
  }
}

console.log(`Acc:  ${acc}\n`)

// Part 2

console.log(`Acc 2: ${executeInstruction(0, false, 0, 0)} <= ACC INCORRECT`)

function executeInstruction(originalInstruction, hasChanged, acc, level) {
  if (originalInstruction === lines.length)
    return acc;

  if (level > lines.length)
    return -1

  const line = lines[originalInstruction];

  if (!line)
    return -1

  const split = line.split(" ");
  const instruction = split[0]
  const value = parseInt(split[1])
  let instructionNumber = originalInstruction
  let changedInstruction = -1;

  //console.log(`Instruction ${instructionNumber}: ${instruction}, ${value}, hasChanged ${hasChanged}`)

  switch (instruction) {
    case "acc":
      acc += value;
      instructionNumber += 1;
      break;

    case "jmp":

      if (!hasChanged) {

        changedInstruction = instructionNumber + 1
      }

      instructionNumber = instructionNumber + value

      break;

    case "nop":

      if (!hasChanged) {

        changedInstruction = instructionNumber + value
      }

      instructionNumber = instructionNumber + 1

      break;
  }

  // First try actual instruction result
  let result = executeInstruction(instructionNumber, hasChanged, acc, level + 1)

  // If actual instruction resulted in loop, try alternative instruction result
  if (result === -1 && changedInstruction !== -1) {
    //console.log(`Trying alternative instruction number ${changedInstruction}`)
    result = executeInstruction(changedInstruction, true, acc, level + 1)
    if (result != -1) {
      // THIS IS CORRECT, BUT RETURNED ACC ISN'T
      console.log(`Changing instruction  ${originalInstruction} fixed it`)
    }
  }
  return result
}

