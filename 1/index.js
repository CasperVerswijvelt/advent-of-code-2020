const fs = require("fs");

const text = fs.readFileSync(process.argv[2]).toString();
const lines = text.split("\r\n");

const numbers = lines.map((line) => parseInt(line));

numbers.forEach((num1) => {
  numbers.forEach((num2) => {
    if (num1 + num2 === 2020) {
      console.log("2 ", num1, num2, num1 * num2);
    }

    numbers.forEach((num3) => {
      if (num1 + num2 + num3 === 2020) {
        console.log("3 ", num1, num2, num3, num1 * num2 * num3);
      }
    });
  });
});
