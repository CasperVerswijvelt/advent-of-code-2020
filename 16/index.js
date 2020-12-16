const fs = require("fs");

const text = fs.readFileSync(process.argv[2]).toString();
const lines = text.split("\r\n\r\n");

const rules = lines[0].split("\r\n").reduce((map, line) => {
  const split = line.split(":");
  const key = split[0];
  const ranges = split[1].split(" ");

  const range1 = ranges[1].split("-").map((char) => parseInt(char));
  const range2 = ranges[3].split("-").map((char) => parseInt(char));

  console.log(`${key} ${range1[0]}-${range1[1]} ${range2[0]}-${range2[1]}`);

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
let validTickets = [];
let invalidSum = 0;
for (let ticket of otherTickets) {
  let ticketIsValid = true;
  for (let value of ticket) {
    let isValid = false;
    for (let validFunction of validFunctions) {
      if (validFunction(value)) {
        isValid = true;
        break;
      }
    }

    if (!isValid) {
      console.log(`${value} is incorrect`);
      invalidSum += value;
      ticketIsValid = false;
    }
  }

  // Filter out invalid ticket
  if (!ticketIsValid) {
    //validTickets = validTickets.filter((tick) => tick !== ticket);
  } else {
    validTickets.push(ticket);
  }
}

console.log(
  `Part 1: Ticket scanning error rate: ${invalidSum}, ${validTickets.length} valid tickets out of ${otherTickets.length}`
);

// Loop over columns
const keys = Object.keys(rules);
const length = keys.length;
const columnMap = {};
for (let key of keys) {
  console.log(`Checking for value ${key}`);
  const validFunction = rules[key];
  let foundKey = false;

  for (let column = 0; column < length; column++) {
    if (columnMap[column]) {
      console.log(
        `Position ${column} already determined to be ${columnMap[column]}`
      );
      continue;
    }
    console.log(`Checking position ${column} for ${key}`);
    let columnValid = true;
    for (let ticket of validTickets) {
      if (!validFunction(ticket[column])) {
        columnValid = false;
        console.log(`Invalid value ${ticket[column]} for ${key}`);
        break;
      }
    }

    if (columnValid) {
      columnMap[column] = key;
      foundKey = true;
      console.log(`Position ${column} is completely valid for ${key}`);
      break;
    }
  }

  if (!foundKey) {
    console.log(`None of the colums were completely valid for field ${key}`);
  }
}

console.log("Part 2: My ticket");

const colKeys = Object.keys(columnMap);
const departureValues = [];

for (let key of colKeys) {
  console.log(`- ${columnMap[key]}: ${ticket[key]}`);
  if (columnMap[key].includes("departure")) departureValues.push(ticket[key]);
}

console.log(
  `Multiply all departure fields: ${departureValues.reduce(
    (acc, value) => acc * value,
    1
  )}`
);
