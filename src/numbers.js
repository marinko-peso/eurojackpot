const cheerio = require('cheerio');
const rp = require('request-promise');
const config = require('../package.json');


function getNumbers() {
  const numbers = [];
  return rp({
    method: 'GET',
    url: config.resultsUrl
  })
  .then(htmlString => {
    const $ = cheerio.load(htmlString);
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


module.exports = { getNumbers };
