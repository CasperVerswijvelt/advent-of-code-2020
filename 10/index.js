const fs = require("fs");

const text = fs.readFileSync(process.argv[2]).toString();
const lines = text.split("\n");

const differences = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
};

const jolts = lines.map((line) => parseInt(line)).sort((a, b) => a - b);

differences[jolts[0]] = 1;

for (let i = 1; i < jolts.length; i++) {
  const diff = jolts[i] - jolts[i - 1];

  differences[diff] = differences[diff] + 1;
}

differences[3] = differences[3] + 1;

console.log(`Part 1: ${differences[1] * differences[3]}`);
