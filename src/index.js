const ConfigStore = require('configstore');
const { getNumbersFromApi } = require('./numbers');
const pkg = require('../package.json');

const userConfig = new ConfigStore(pkg.name, { numbers: [] });


// TODO: Later make sure regulars are between 0 and 100 and extra between 0 and 10.
const numbersValid = it => it.length === 7;


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
      console.error('Problem with fetching lottery winning numbers...')
      return false;
    }

    const myNumbers = userConfig.get('numbers');
    if (!numbersValid(myNumbers)) {
      console.error('Please specify your valid lottery numbers using the --numbers option.')
      return false;
    }

    const regularMatches = getMatches(myNumbers.slice(0, 5), winningNumbers.slice(0, 5));
    const extraMatches = getMatches(myNumbers.slice(5, 7), winningNumbers.slice(5, 7));

    // To win at least something you have to have some of the following: 2+1, 1+2, 3+0.
    const someWin = (regularMatches + extraMatches) >= 3;
    // Hitting all numbers wins the jackpot!
    const bigWin = regularMatches === 5 && extraMatches === 2;

    return { regularMatches, extraMatches, someWin, bigWin };
  });
}


/**
 * Save user selected numbers to config for later usage.
 * @param {Array} numbers
 */
function saveUserNumbers(numbers) {
  userConfig.set({ numbers });
}



module.exports = { checkNumbersForWin, saveUserNumbers };
