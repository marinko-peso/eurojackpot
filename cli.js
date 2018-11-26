#!/usr/bin/env node
'use strict';

const meow = require('meow');
const { checkNumbersForWin } = require('./');


const meowText = `
Usage:
  $ eurojackpot <options>

Options:
  --numbers, -n  Define your numbers to check against (last 2 are extras)

Examples:
  $ eurojackpot
  $ eurojackpot --numbers 12,15,20,30,34,4,5
`;

const meowFlags = {
  numbers: {
    type: 'string',
    alias: 'n',
    default: ''
  }
};

const cli = meow(meowText, meowFlags);
// console.log(cli.input);
// console.log(cli.flags);

checkNumbersForWin().then(winData => {
  console.log(winData);
});
