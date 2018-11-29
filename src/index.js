const ConfigStore = require('configstore');
const { getNumbersFromApi } = require('./numbers');
const pkg = require('../package.json');

const userConfig = new ConfigStore(pkg.name);

/**
 * TODO: Later make sure regulars are between 0 and 100 and extra between 0 and 10.
 * @param {Array} n
 */
function numbersValid(n) {
  // We are expecting 7 numbers in the list.
  if (n.length !== 7) {
    return false;
  }

  const regularNumbers = n.slice(0, 5);
  const extraNumbers = n.slice(5, 7);
  let checkStatus = true;
  // Regular numbers have to be between in range [1-50]
  regularNumbers.forEach(it => {
    if (!Number.isInteger(it) || it < 1 || it > 50) {
      checkStatus = false;
    }
  });
  // Extra numbers have to be between in range [1-10]
  extraNumbers.forEach(it => {
    if (!Number.isInteger(it) || it < 1 || it > 10) {
      checkStatus = false;
    }
  });

  return checkStatus;
}

/**
 * Check how many matches exist between arrays sent.
 * @param {Array} arr1
 * @param {Array} arr2
 */
function getMatches(arr1, arr2) {
  let matches = 0;
  arr1.forEach(num => {
    if (arr2.indexOf(num) !== -1) matches += 1;
  });
  return matches;
}

/**
 * Numbers are winners only if all of them match.
 */
function checkNumbersForWin() {
  return getNumbersFromApi()
    .then(winningNumbers => {
      // Getting winning numbers resulted in invalid, cancelling...
      if (!numbersValid(winningNumbers)) {
        console.error('Problem with fetching lottery winning numbers...');
        return false;
      }

      // If user numbers are not defined at this point, no action to do.
      const myNumbers = userConfig.get('numbers');
      let userNumbersDefined = false;
      if (!myNumbers || !myNumbers.length) {
        return { userNumbersDefined };
      }
      userNumbersDefined = true;

      const regularMatches = getMatches(myNumbers.slice(0, 5), winningNumbers.slice(0, 5));
      const extraMatches = getMatches(myNumbers.slice(5, 7), winningNumbers.slice(5, 7));

      // To win at least something you have to have some of the following: 2+1, 1+2, 3+0.
      const someWin = (regularMatches + extraMatches) >= 3;
      // Hitting all numbers wins the jackpot!
      const bigWin = regularMatches === 5 && extraMatches === 2;

      return {
        regularMatches,
        extraMatches,
        someWin,
        bigWin,
        userNumbersDefined
      };
    });
}

/**
 * Save user selected numbers to config for later usage.
 * @param {Array} numbers
 */
function saveUserNumbers(numbers) {
  userConfig.set({ numbers });
}

module.exports = { checkNumbersForWin, saveUserNumbers, numbersValid };
