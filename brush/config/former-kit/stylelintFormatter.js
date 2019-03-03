'use strict';

const chalk = require('chalk');
const table = require('text-table');

function isError(message) {
  if (message.fatal || message.severity === 2) {
    return true;
  }
  return false;
}

function formatter(results) {
  let output = '\n';
  let hasErrors = false;
  let reportContainsErrorRuleIDs = false;

  results.forEach(result => {
    let warnings = result.warnings;
    if (warnings.length === 0) {
      return;
    }

    warnings = warnings.map(message => {
      let messageType;
      if (isError(message)) {
        messageType = 'error';
        hasErrors = true;
        if (message.ruleId) {
          reportContainsErrorRuleIDs = true;
        }
      } else {
        messageType = 'warn';
      }

      let line = message.line || 0;
      let position = chalk.bold('Line ' + line + ':');
      return [
        '',
        position,
        messageType,
        message.text.replace(/\.$/, ''),
        chalk.underline(message.ruleId || ''),
      ];
    });

    // if there are error warnings, we want to show only errors
    if (hasErrors) {
      warnings = warnings.filter(m => m[2] === 'error');
    }

    // add color to rule keywords
    warnings.forEach(m => {
      m[4] = m[2] === 'error' ? chalk.red(m[4]) : chalk.yellow(m[4]);
      m.splice(2, 1);
    });

    let outputTable = table(warnings, {
      align: ['l', 'l', 'l'],
      stringLength(str) {
        return chalk.stripColor(str).length;
      },
    });

    output += `${outputTable}\n\n`;
  });

  if (reportContainsErrorRuleIDs) {
    // Unlike with warnings, we have to do it here.
    // We have similar code in react-scripts for warnings,
    // but warnings can appear in multiple files so we only
    // print it once at the end. For errors, however, we print
    // it here because we always show at most one error, and
    // we can only be sure it's an ESLint error before exiting
    // this function.
    output +=
      'Search for the ' +
      chalk.underline(chalk.red('keywords')) +
      ' to learn more about each error.';
  }

  return output;
}

module.exports = formatter;
