/* eslint-disable no-console */
const chalk = require('chalk');

const colors = {
    error: chalk.red,
    info: chalk.gray,
    log: chalk,
    warn: chalk.yellowBright
};

const write = type => (...args) => {
    console[type](colors[type]('[EM]'), ...args);
};

module.exports.log = write('log');
module.exports.warn = write('warn');
module.exports.error = write('error');
module.exports.info = write('info');
module.exports.chalk = chalk;
