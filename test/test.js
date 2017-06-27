'use strict';

const path = require('path');
const vnuValidateHtml = require('..');

const fixture = name => path.join(__dirname, 'fixtures', name + '.html');

describe('validate', () => {
  global.jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

  test('basically works', () => {
    return vnuValidateHtml.validate(fixture('one')).then(report => {
      expect(report).toMatchSnapshot();
    });
  });

  test('strips colors', () => {
    return vnuValidateHtml
      .validate(fixture('one'), {
        stripColors: true
      })
      .then(report => {
        expect(report).toMatchSnapshot();
      });
  });
});
