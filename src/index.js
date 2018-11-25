const { getNumbersFromApi } = require('./numbers');


// TODO: Later make sure regulars are between 0 and 100 and extra between 0 and 10.
const numbersValid = it => it.length === 7;


/**
 * Numbers are winners only if all of them match.
 */
function didNumbersWin() {
  getNumbersFromApi().then(winningNumbers => {
    if (!numbersValid(winningNumbers)) {
      console.error('Problem with fetching lottery winning numbers...')
      return false;
    }

    const myNumbers = [1, 2, 3, 4, 5, 6, 7];
    const regularNumbers = myNumbers.slice(0, 5);
    const extraNumbers = myNumbers.slice(5, 7);

    let status = true;
    const validReducer = (acc, current) => winningNumbers.indexOf(current) !== -1 && acc;
    status = regularNumbers.reduce(validReducer, status);
    status = regularNumbers.reduce(validReducer, status);

    regularNumbers.forEach((i, n) => {

    })
  });
}


module.exports = { didNumbersWin };
