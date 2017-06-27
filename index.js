'use strict';

const vnuJar = require('vnu-jar');
const globby = require('globby');
const path = require('path');
const exec = require('child_process').exec;
const chalk = require('chalk');
const indentString = require('indent-string');
const stripAnsi = require('strip-ansi');

function validateHtmlFiles(files) {
  return new Promise((resolve, reject) => {
    // JSON format does not stream, so no point in using a streaming child process
    exec(
      `java -jar ${vnuJar} --format json --asciiquotes ${files.join(' ')}`,
      { maxBuffer: 20000 * 1024 },
      (err, stdout, stderr) => {
        if (err && (err.code !== 1 || err.killed || err.signal)) {
          return reject(err);
        }
        if (stdout) console.log(stdout);
        resolve(JSON.parse(stderr));
      }
    );
  });
}

function enhanceMessage(message) {
  const strayEndTag = message.match(/but a (“[a-zA-Z]+”) end tag seen./);
  if (strayEndTag) {
    message += `\n${chalk.red(
      '⚆_⚆'
    )} Are you illegally nesting a block-level element inside a ${strayEndTag[1]} element?`;
  }
  return message;
}

function stringifyValidationError(data) {
  const relativeSource = path.relative(
    process.cwd(),
    data.url.replace(/^file:/, '')
  );
  const startLine = data.firstLine === undefined
    ? data.lastLine
    : data.firstLine;
  const startColumn = data.firstColumn === undefined
    ? data.lastColumn
    : data.firstColumn;
  const endLine = data.lastLine;
  const endColumn = data.lastColumn;
  let fullPosition = chalk.grey('[');
  fullPosition += chalk.magenta(`${startLine}:${startColumn}`);
  if (startLine !== endLine || startColumn !== endColumn) {
    fullPosition += chalk.grey('-');
    fullPosition += chalk.magenta(`${endLine}:${endColumn}`);
  }
  fullPosition += chalk.grey(']');

  const code = [
    chalk.gray(data.extract.slice(0, data.hiliteStart)),
    chalk.yellow(data.extract.substr(data.hiliteStart, data.hiliteLength)),
    chalk.gray(data.extract.slice(data.hiliteStart + data.hiliteLength))
  ].join('');

  return `\n${chalk.underline(
    relativeSource
  )} ${fullPosition}\n${enhanceMessage(data.message)}\n${indentString(
    code,
    2
  )}\n`;
}

function stringifyResult(result) {
  return result.messages.reduce((str, errorData) => {
    return str + stringifyValidationError(errorData);
  }, '');
}

function validate(glob, options) {
  options = options || {};
  return globby(glob)
    .then(validateHtmlFiles)
    .then(stringifyResult)
    .then(report => {
      if (options.stripColors) return stripAnsi(report);
      return report;
    });
}

module.exports = { validate };
