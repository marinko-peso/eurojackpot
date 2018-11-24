#!/usr/bin/env node

'use strict';

const { config } = require('./package.json');
const { getNumbers } = require('./index.js');
const spinner = require('ora')();

spinner.start(`Fetching results from: ${config.resultsUrl}`);
getNumbers()
  .then(numbers => spinner.succeed(`Eurojackpot results: ${numbers.join(', ')}`))
  .catch(err => spinner.fail(`Error: ${err.message}`));
