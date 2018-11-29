#!/usr/bin/env node
'use strict';

const meow = require('meow');
const { checkNumbersForWin, saveUserNumbers, numbersValid } = require('./');

/**
 * Define cli help text and params.
 */
const helpText = `
Usage:
  $ eurojackpot <options>

Options:
  --numbers, -n  Define your numbers to check against (last 2 are extras)

Examples:
  $ eurojackpot
  $ eurojackpot --numbers 12,15,20,30,34,4,5
`;
const flags = {
  numbers: {
    type: 'string',
    alias: 'n',
    default: ''
  }
};
const cli = meow(helpText, { flags });

/**
 * If user sent numbers make sure to validate them and store.
 * We don't run numbers check at this point.
 */
const numbersString = cli.flags.numbers;
if (cli.flags.numbers) {
  const userNumbers = numbersString.split(',').map(x => parseInt(x));
  if (!numbersValid(userNumbers)) {
    console.log('Your numbers are INVALID, please enter all 7 numbers, extras last, separated by comma: 1,2,3,4,5,6,7');
    console.log('First five need to be in range [1-50], and last two in range [1-10]')
  } else {
    saveUserNumbers(userNumbers);
    console.log('Number succcessfully saved. Check you winnings by running: eurojackpot');
  }
} else {
  /**
   * Check did user win with his stored numbers.
   * First we need to make sure did he store any numbers and if not tell him to specify.
   */
  checkNumbersForWin().then(d => {
    if (!d.userNumbersDefined) {
      console.log('Please first save your numbers to check against. Use `eurojackpot --help` for more information.');
      return;
    }

    if (!d.someWin) {
      console.log('You have no winnings this time 😢. Better luck in the future!');
    } else if (d.bigWin) {
      console.log('YOU HAVE WON THE JACKPOT! 👏');
    } else {
      console.log('You have a winning! 👍  Combination: %i + %i', d.regularMatches, d.extraMatches);
    }
  });
}
