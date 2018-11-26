const cheerio = require('cheerio');
const rp = require('request-promise');
const pkg = require('../package.json');


/**
 * Get resutls by scrapping them from the webpage.
 * Secondary method in case api is not working.
 */
function getNumbersFromScrapping() {
  return rp({
    method: 'GET',
    url: pkg.config.scrapUrl
  })
  .then(htmlString => {
    const $ = cheerio.load(htmlString);
    const getNum = el => parseInt($(el).text());
    const numbers = [];
    $('#results').first().find('li').each( (i, el) => numbers.push(getNum(el)) );
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
    url: pkg.config.apiUrl
  })
  .then(d => {
    const data = JSON.parse(d).last;
    return [...data.numbers, ...data.euroNumbers];
  })
  .catch(err => {
    return [];
  });
}


module.exports = { getNumbersFromScrapping, getNumbersFromApi };
