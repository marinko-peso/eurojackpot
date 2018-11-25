const cheerio = require('cheerio');
const rp = require('request-promise');
const appConfig = require('../package.json');


/**
 * Get resutls by scrapping them from the webpage.
 * Secondary method in case api is not working.
 */
function getNumbersFromScrapping() {
  return rp({
    method: 'GET',
    url: appConfig.config.scrapUrl
  })
  .then(htmlString => {
    const $ = cheerio.load(htmlString);
    // TODO: change to map.
    const numbers = [];
    $('#results').first().find('li').each((index, element) => {
      numbers.push(
        parseInt($(element).text())
      );
    });
    return numbers;
  })
  .catch(err => {
    return [];
  });
}


/**
 * Get results of the last draw using an api.
 * Only extract winning numbers.
 */
function getNumbersFromApi() {
  return rp({
    method: 'GET',
    url: appConfig.config.apiUrl
  })
  .then(d => {
    const data = JSON.parse(d).last;
    const numbers = [];
    numbers.push(...data.numbers);
    numbers.push(...data.euroNumbers);
    return numbers;
  })
  .catch(err => {
    return [];
  });
}

getNumbersFromApi();


module.exports = { getNumbersFromScrapping, getNumbersFromApi };
