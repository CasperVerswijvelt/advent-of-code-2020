const fs = require("fs");

const text = fs.readFileSync(process.argv[2]).toString();
const lines = text.split("\n\r\n");

let count = 0;

lines.forEach((line) => {
  const yesMap = {};
  console.log("Line");

  persons = line.split("\r\n");
  persons.forEach((person) => {
    for (let i = 0; i < person.length; i++) {
      if (person[i] !== "\r") {
        yesMap[person[i]] =
          typeof yesMap[person[i]] === "number" ? yesMap[person[i]] + 1 : 0;
      }
    }
  });

  console.log(yesMap, "\n");

  count += Object.keys(yesMap).length;
});

console.log(count);
