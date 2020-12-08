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
  let done = false;

  console.log(instruction, value)

  lineExecutedMap[currentInstruction] = true;

  switch (instruction) {
    case "acc":
      acc+=value
      currentInstruction += 1;
      break
    case "jmp":
      currentInstruction += value;
      break
    case "nop":
      currentInstruction += 1;
      break;
  }

  if (done) {
    break;
  }
}

console.log(`Acc:  ${acc}`)

