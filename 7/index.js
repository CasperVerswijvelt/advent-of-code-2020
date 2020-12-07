const fs = require("fs");

const text = fs.readFileSync(process.argv[2]).toString();
const lines = text.split("\n");

const bags = {}

lines.forEach((line) => {
  let split = line.split(" contain ")

  let bagRegex = / bag(s){0,1}/

  const bagColor = split[0].replace(bagRegex, "")
  const innerBags = split[1].replace(".","").split(", ").map(bagString => bagString.replace(bagRegex, ""))
  const actualInnerBags = []
  
  innerBags.forEach(bag => {
    //.map(bagString => bagString.replace(/[0-9]+ /, ""))
    let count = parseInt(bag)
    let bagName = bag.replace(/[0-9]+ /, "")

    for(let i = 0; i < count; i++) {
      actualInnerBags.push(bagName)
    }
  })

  bags[bagColor] = actualInnerBags
});

let searchBag = "shiny gold"

let count = 0

let bagKeys = Object.keys(bags)

// for (let i = 0; i < bagKeys.length; i++) {
//   let containingBag = bagKeys[i];

//   if (bagCanContainBag(containingBag, searchBag)) {
//     count++
//   }
// }

//console.log(bags)

//console.log(`${count} bag types can contain shiny gold bags`)

console.log(`Shiny gold bag has ${countInnerBags(searchBag)} inner bags`)

function bagCanContainBag(containingBag, searchBag) {
  //console.log(`Searching for ${searchBag} in ${containingBag}`)

  let containingBagList = bags[containingBag];

  if (!Array.isArray(containingBagList)) return false;

  for (let i = 0; i < containingBagList.length; i++) {
    if (containingBagList[i] === searchBag || bagCanContainBag(containingBagList[i], searchBag)) {
      return true;
    }
  }

  return false;
}

function countInnerBags(containingBag) {
  //console.log(`Counting bags in in ${containingBag}`)

  let containingBagList = bags[containingBag];

  if (!Array.isArray(containingBagList) || containingBagList[0] === "no other") return 0;

  let count = containingBagList.length

  for (let i = 0; i < containingBagList.length; i++) {
    count += countInnerBags(containingBagList[i]);
  }
  return count;
}