const fs = require("fs");

const text = fs.readFileSync(process.argv[2]).toString();
const lines = text.split("\r\n");

const slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

const width = lines[0].length;

let mult = [];

for (let slope of slopes) {
  let x = 0;
  let count = 0;

  for (let y = 0; y < lines.length; ) {
    const line = lines[y];

    if (line[x % width] === "#") {
      count++;
    }

    x += slope[0];
    y += slope[1];
  }

  //console.log(grid.join("\n"));
  console.log(slope, count);
  mult.push(count);
}

let multiplyResult = 1;

mult.forEach((count) => {
  multiplyResult = multiplyResult * count;
});

console.log(multiplyResult);
