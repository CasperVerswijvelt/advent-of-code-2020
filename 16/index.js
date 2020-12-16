const fs = require("fs");

const text = fs.readFileSync(process.argv[2]).toString();
const lines = text.split("\r\n\r\n");

const rules = lines[0].split("\r\n").reduce((map, line) => {
  const split = line.split(" ");
  const key = split[0].slice(0, split[0].length - 1);

  const range1 = split[1].split("-").map((char) => parseInt(char));
  const range2 = split[3].split("-").map((char) => parseInt(char));

  map[key] = (value) => {
    return (
      (value >= range1[0] && value <= range1[1]) ||
      (value >= range2[0] && value <= range2[1])
    );
  };

  return map;
}, {});
const ticket = lines[1]
  .split("\r\n")[1]
  .split(",")
  .map((line) => parseInt(line));
const otherTickets = lines[2]
  .split("\r\n")
  .slice(1, lines[2].split("\r\n").length)
  .map((line) => line.split(",").map((char) => parseInt(char)));

const validFunctions = Object.values(rules);
let invalidSum = 0;
for (let ticket of otherTickets) {
  for (let value of ticket) {
    let isValid = false;
    for (let validFunction of validFunctions) {
      if (validFunction(value)) {
        isValid = true;
        return;
      }
    }

    if (!isValid) {
      console.log(`${value} is incorrect`);
      invalidSum += value;
    }
  }
}

console.log(`Part 1: Ticket scanning error rate: ${invalidSum}`);
