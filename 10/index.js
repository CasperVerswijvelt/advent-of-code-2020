const fs = require("fs");

const text = fs.readFileSync(process.argv[2]).toString();
const lines = text.split("\n");

const differencesMap = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
};
const differencesArray = [];

const jolts = lines.map((line) => parseInt(line)).sort((a, b) => a - b);
jolts.push(jolts[jolts.length - 1] + 3);
jolts.unshift(0);

for (let i = 1; i < jolts.length; i++) {
  const diff = jolts[i] - jolts[i - 1];

  differencesArray.push(diff);

  differencesMap[diff] = differencesMap[diff] + 1;
}

console.log(`Part 1: ${differencesMap[1] * differencesMap[3]}`);

const tribonacciArr = [1, 1, 2, 4, 7, 13, 24, 44, 81, 149];
function tribonacci(num) {
  return tribonacciArr[num - 1];
}

let multiplier = 1;
let currentRun = 1;
jolts.forEach((jolt) => {
  if (jolts.indexOf(jolt + 1) !== -1) {
    currentRun++;
  } else {
    multiplier *= tribonacci(currentRun);
    currentRun = 1;
  }
});

console.log(`Part 2: ${multiplier}`);
