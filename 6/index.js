const fs = require("fs");

const text = fs.readFileSync(process.argv[2]).toString();
const lines = text.split("\n\r\n");

let count = 0;

lines.forEach((line) => {
  const yesMap = {};
  //console.log("Line");

  let individualCount = 0;

  persons = line.split("\r\n");
  persons.forEach((person) => {
    for (let i = 0; i < person.length; i++) {
      if (person[i] !== "\r") {
        yesMap[person[i]] =
          typeof yesMap[person[i]] === "number" ? yesMap[person[i]] + 1 : 1;
      }
    }
  });

  //console.log(yesMap, "\n");

  let keys = Object.keys(yesMap);

  for (let i = 0; i < keys.length; i++) {
    if (yesMap[keys[i]] === persons.length) {
      individualCount += 1;
    }
  }

  count += individualCount;
  console.log(`Everyone answerred yes to ${individualCount} questions`);
});

console.log(count);
