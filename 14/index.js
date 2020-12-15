const fs = require("fs");
const { parse } = require("path");

const text = fs.readFileSync(process.argv[2]).toString();
const lines = text.split("\n");

let currentMask;

const memory = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.indexOf("mask = ") === 0) {
    let mask = line.substr(7, 36);
    currentMask = mask;
  } else {
    const endbracketIndex = line.indexOf("]");
    const memIndex = parseInt(line.substr(4, endbracketIndex - 4));
    const value = parseInt(line.split("= ")[1]);
    memory[memIndex] = applyBitmask(currentMask, value);
  }
}
console.log(
  memory,
  memory.reduce((a, b) => a + b, 0)
);

function applyBitmask(mask, value) {
  const binary = pad(value.toString(2), "0", 36);
  //console.log("binary ", binary);
  //console.log("mask   ", mask);
  let result = [];

  for (let i = 0; i < 36; i++) {
    if (mask[i] === "X") {
      result.push(binary[i]);
    } else {
      result.push(mask[i]);
    }
  }

  //console.log("result ", result.join(""));

  return parseInt(result.join(""), 2);
}

function pad(value, padCharacter, length) {
  const currentLength = value.length;

  let pad = "";

  for (let i = 0; i < length - currentLength; i++) {
    pad += padCharacter;
  }

  return pad + value;
}
