const fs = require("fs");

const text = fs.readFileSync(process.argv[2]).toString();
const lines = text.split("\n");

const bags = {}

lines.forEach((line) => {
  console.log("Line", line);
  let split = line.split(" contain ")

  let bagRegex = / bag(s){0,1}/

  const bagColor = split[0].replace(bagRegex, "")
  const innerBags = split[1].replace(".","").split(", ").map(bagString => bagString.replace(bagRegex, "")).map(bagString => bagString.replace(/[0-9]+ /, ""))

  bags[bagColor] = innerBags
});

let searchBag = "shiny gold"

let count = 0

let bagKeys = Object.keys(bags)

for (let i = 0; i < bagKeys.length; i++) {
  let containingBag = bagKeys[i];

  if (bagCanContainBag(containingBag, searchBag)) {
    count++
  }
}

console.log(count)

function bagCanContainBag(containingBag, searchBag) {
  console.log(`Searching for ${searchBag} in ${containingBag}`)

  let containingBagList = bags[containingBag];

  if (!Array.isArray(containingBagList)) return false;

  for (let i = 0; i < containingBagList.length; i++) {
    if (containingBagList[i] === searchBag || bagCanContainBag(containingBagList[i], searchBag)) {
      return true;
    }
  }

  return false;
}