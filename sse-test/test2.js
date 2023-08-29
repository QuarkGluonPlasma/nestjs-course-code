const { readFileSync } = require("fs");

const buffer = readFileSync('./package.json');

console.log(buffer.toJSON());