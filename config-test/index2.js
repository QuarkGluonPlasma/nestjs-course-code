const yaml = require('js-yaml');
const fs = require('fs');

const config = fs.readFileSync('./hello.yaml');

console.log(yaml.load(config));
