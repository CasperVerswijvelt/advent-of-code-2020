const fs = require("fs");
const { type } = require("os");
const { parse } = require("path");

const text = fs.readFileSync(process.argv[2]).toString();
const lines = text.split("\n");

let currentMask = "000000000000000000000000000000000000";

const memory = [];
const memory2 = {};

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

    const memIndex2 = applyMemoryBitmask(currentMask, memIndex);
    getFloatingVariants(memIndex2).forEach((indexVariant) => {
      memory2[indexVariant] = value;
    });
  }
}
console.log(
  "Part 1",
  memory.reduce((a, b) => a + b, 0)
);
console.log(
  "Part 2",
  Object.values(memory2).reduce((a, b) => a + b, 0)
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

function applyMemoryBitmask(mask, memory) {
  const binary = pad(memory.toString(2), "0", 36);
  let result = [];

  for (let i = 0; i < 36; i++) {
    if (mask[i] === "X") {
      result.push("X");
    } else {
      result.push(mask[i] === "1" ? mask[i] : binary[i]);
    }
  }

  return result.join("");
}

function pad(value, padCharacter, length) {
  const currentLength = value.length;

  let pad = "";

  for (let i = 0; i < length - currentLength; i++) {
    pad += padCharacter;
  }

  return pad + value;
}

function getFloatingVariants(mask) {
  const xIndex = mask.indexOf("X");
  if (xIndex === -1) {
    return [parseInt(mask, 2)];
  } else {
    const oneArray = mask.split("");
    const zeroArray = mask.split("");

    oneArray[xIndex] = "1";
    zeroArray[xIndex] = "0";
    return [
      ...getFloatingVariants(oneArray.join("")),
      ...getFloatingVariants(zeroArray.join("")),
    ];
  }
}
