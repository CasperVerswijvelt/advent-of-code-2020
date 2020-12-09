const fs = require("fs");
const { parse } = require("path");

const text = fs.readFileSync(process.argv[2]).toString();
const lines = text.split("\n");

const preambleLength = parseInt(process.argv[3]);

for (let i = preambleLength; i < lines.length; i++) {
  const number = parseInt(lines[i]);

  if (!checkSum(i)) {
    console.log(
      `Number ${number} at index ${i} is not the sum of 2 of the previous ${preambleLength} numbers`
    );
    break;
  }
}

function checkSum(index) {
  const startIndex = index - preambleLength;
  const checkNumber = parseInt(lines[index]);

  for (let i = startIndex; i < index; i++) {
    for (let j = startIndex; i < index; j++) {
      if (j == i) break;

      if (parseInt(lines[i]) + parseInt(lines[j]) === checkNumber) {
        return true;
      }
    }
  }

  return false;
}
