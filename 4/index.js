const fs = require("fs");

const text = fs.readFileSync(process.argv[2]).toString();
const lines = text.split("\n\r\n");

const requiredMap = {
  byr: {
    isValid: (value) => {
      return testYear(value, 1920, 2002);
    },
  },
  iyr: {
    isValid: (value) => {
      return testYear(value, 2010, 2020);
    },
  },
  eyr: {
    isValid: (value) => {
      return testYear(value, 2020, 2030);
    },
  },
  hgt: {
    isValid: (value) => {
      let test = matchRegexFunction(value, /[0-9]+(in|cm)/);

      if (test) {
        let height = parseInt(value);

        return (
          (value.indexOf("cm") !== -1 && height >= 150 && height <= 193) ||
          (value.indexOf("in") !== -1 && height >= 59 && height <= 76)
        );
      } else {
        return false;
      }
    },
  },
  hcl: {
    isValid: (value) => {
      return matchRegexFunction(value, /^#[0-9|a-f]{6}$/);
    },
  },
  ecl: {
    isValid: (value) => {
      return matchRegexFunction(value, /^(amb|blu|brn|gry|grn|hzl|oth)$/);
    },
  },
  pid: {
    isValid: (value) => {
      return matchRegexFunction(value, /^[0-9]{9}$/);
    },
  },
  cid: {
    isValid: (value) => {
      return true;
    },
  },
};

let validCount = 0;
lines.forEach((line) => {
  let isValid = true;
  const properties = line.split(/\s+/).reduce((ac, b) => {
    const propSplit = b.split(":");
    ac[propSplit[0]] = propSplit[1];
    return ac;
  }, {});

  //console.log(properties);

  let requiredKeys = Object.keys(requiredMap);

  for (let i = 0; i < requiredKeys.length; i++) {
    let requirements = requiredMap[requiredKeys[i]];

    let propValid = requirements.isValid(properties[requiredKeys[i]]);

    if (!propValid) {
      isValid = false;
    }
    console.log(
      `${requiredKeys[i]}: '${
        properties[requiredKeys[i]]
      }', valid: ${propValid}`
    );
  }

  if (isValid) {
    console.log("\nPASSPORT VALID");
    validCount++;
  } else {
    console.log("\n PASSPORT INVALID");
  }

  console.log("\n");
});
console.log(`Found ${validCount} valid passports`);

function matchRegexFunction(value, regex) {
  //console.log(value, regex, regex.test(value));
  return regex.test(value);
}

function testYear(value, min, max) {
  let test = matchRegexFunction(value, /^[0-9]{4}$/);

  if (test) {
    let year = parseInt(value);

    return year >= min && year <= max;
  } else {
    return false;
  }
}
