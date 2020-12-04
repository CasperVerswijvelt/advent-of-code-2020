const fs = require("fs");

const text = fs.readFileSync(process.argv[2]).toString();
const lines = text.split("\r\n");

let count = 0;
let count2 = 0;

lines.forEach((line) => {
  const parts = line.split(" ");

  const minmax = parts[0].split("-");
  const letter = parts[1][0];
  const password = parts[2];

  const min = parseInt(minmax[0]);
  const max = parseInt(minmax[1]);

  const regexStr = `^([^${letter}]*${letter}[^${letter}]*){${min},${max}}$`;

  const regex = new RegExp(regexStr, "i");

  if (regex.test(password)) {
    count++;
  }

  if ((password[min - 1] === letter) != (password[max - 1] !== letter)) {
    console.log("CORRECT: ", line);
  } else {
    count2++;
    console.log("WRONG:   ", line);
  }
});

console.log(count, count2);
