#!/usr/bin/env node
'use strict';

const meow = require('meow');
const chalk = require('chalk');
const vnuValidateHtml = require('..');

const description = 'Validate static HTML with the Nu Html Checker.';
const help = `
  ${chalk.bold('Usage')}
    vnu-validate-html <files>

    If you wrap <files> in quotes, it is passed to node-glob.
`;

const cli = meow({
  description,
  help
});

const files = cli.input;
if (files.length === 0) {
  cli.showHelp();
}

vnuValidateHtml.validate(files).then(report => console.log(report));
