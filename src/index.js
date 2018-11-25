const { getNumbersFromApi } = require('./numbers');


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
  getNumbersFromApi().then(winningNumbers => {
    if (!numbersValid(winningNumbers)) {
      console.error('Problem with fetching lottery winning numbers...')
      return false;
    }

    const myNumbers = [22, 17, 31, 28, 46, 10, 5];

    const regularMatches = getMatches(myNumbers.slice(0, 5), winningNumbers.slice(0, 5));
    const extraMatches = getMatches(myNumbers.slice(5, 7), winningNumbers.slice(5, 7));
    const someWin = false;
    const bigWin = regularMatches === 5 && extraMatches === 2;

    return { regularMatches, extraMatches, someWin, bigWin };
  });
}


module.exports = { checkNumbersForWin };
