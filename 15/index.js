const fs = require("fs");

const text = fs.readFileSync(process.argv[2]).toString();
const lines = text.split("\n");

for (let i = 0; i < lines.length; i++) {
  const numbers = lines[i].split(",").map((num) => parseInt(num));
  console.log(numbers);

  const lastIndexMap = {};
  const length = numbers.length;

  for (let k = 0; k < length; k++) {
    lastIndexMap[numbers[k]] = k;
    console.log(`Number ${k + 1}: ${numbers[k]}`);
  }
  let lastNumber;
  for (let k = numbers.length; k < 2020; k++) {
    const previousNumber = numbers[k - 1];
    const lastIndex = lastIndexMap[previousNumber];

    lastNumber = typeof lastIndex === "number" ? k - 1 - lastIndex : 0;
    numbers[k] = lastNumber;

    console.log(`Number ${k + 1}: ${numbers[k]}`);

    lastIndexMap[numbers[k - 1]] = k - 1;
  }

  console.log(lastNumber);
}
