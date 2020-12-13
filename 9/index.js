const fs = require("fs");

const text = fs.readFileSync(process.argv[2]).toString();
const lines = text.split("\n");

const preambleLength = parseInt(process.argv[3]);

let invalidNumber = -1;

for (let i = preambleLength; i < lines.length; i++) {
  const number = parseInt(lines[i]);

  if (!checkSum(i)) {
    console.log(
      `Number ${number} at index ${i} is not the sum of 2 of the previous ${preambleLength} numbers`
    );
    invalidNumber = number;
    break;
  }
}

for (let i = 0; i < lines.length; i++) {
  let found = false;
  let sum = 0;
  let min = Number.MAX_SAFE_INTEGER,
    max = Number.MIN_SAFE_INTEGER;
  for (let j = i; j < lines.length; j++) {
    const number = parseInt(lines[j]);

    sum += number;

    if (number > max) max = number;
    if (number < min) min = number;

    if (sum === invalidNumber) {
      found = true;
      console.log(
        `Range: ${i}-${j}, Min: ${min}, Max: ${max}, Sum: ${min + max}`
      );
      break;
    }
  }

  if (found) {
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
