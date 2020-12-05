const fs = require("fs");

const text = fs.readFileSync(process.argv[2]).toString();
const lines = text.split("\n");

const colLenght = 3;
const rowLenght = 7;

const rows = 127;
const cols = 7;

let highestSeatId = 0;
let seatIds = [];

lines.forEach((line) => {
  let downRowLimit = 0;
  let upRowLimit = rows;

  for (let i = 0; i < rowLenght; i++) {
    const char = line[i];
    const half = Math.ceil((upRowLimit - downRowLimit) / 2);

    if (char === "F") {
      upRowLimit -= half;
    } else if (char === "B") {
      downRowLimit += half;
    }
  }

  let downColLimit = 0;
  let upColLimit = cols;

  for (let i = rowLenght; i < colLenght + rowLenght; i++) {
    const char = line[i];
    const half = Math.ceil((upColLimit - downColLimit) / 2);

    if (!char) {
      break;
    }

    if (char === "L") {
      upColLimit -= half;
    } else if (char === "R") {
      downColLimit += half;
    }
  }

  console.log("Row", upRowLimit, "Col", downColLimit);

  let seatId = downRowLimit * 8 + downColLimit;
  console.log("seatId", seatId, "\n");

  seatIds.push(seatId);

  if (seatId > highestSeatId) {
    highestSeatId = seatId;
  }
});

seatIds = seatIds.sort();

console.log("Highest seat id", highestSeatId);

for (let i = 0; i < seatIds.length; i++) {
  let current = seatIds[i];
  let next = seatIds[i + 1];
  if (next - 2 === current) {
    console.log("Open seat between ", current, next);
  }
}
