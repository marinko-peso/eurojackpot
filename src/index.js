const { getNumbersFromApi } = require('./numbers');


// TODO: Later make sure regulars are between 0 and 100 and extra between 0 and 10.
const numbersValid = it => it.length === 7;


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
    const regularNumbers = myNumbers.slice(0, 5);
    const extraNumbers = myNumbers.slice(5, 7);

    let status = true;
    const regularReducer = (acc, current) => winningNumbers.slice(0, 5).indexOf(current) !== -1 && acc;
    const extraReducer = (acc, current) => winningNumbers.slice(5, 7).indexOf(current) !== -1 && acc;

    status = regularNumbers.reduce(regularReducer, status);
    status = extraNumbers.reduce(extraReducer, status);

    console.log(status);

    return status;
  });
}


module.exports = { checkNumbersForWin };
