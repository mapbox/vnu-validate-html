# @mapbox/vnu-validate-html

[![Build Status](https://travis-ci.org/mapbox/vnu-validate-html.svg?branch=master)](https://travis-ci.org/mapbox/vnu-validate-html)

Validate static HTML with the Nu Html Checker.

Uses [vnu-jar](https://www.npmjs.com/package/vnu-jar), so requires a Java 8 environment.

🚧🚧 **WORK IN PROGRESS!** 🚧🚧

More tests and options could be added, and more edge cases anticipated (e.g. `type: 'info'` warnings).

## API

### validate

`validate(glob: string | Array<string>, options?: Object)`

`glob` is passed to [globby](https://github.com/sindresorhus/globby) to find your files.

**Options** (none required)

- **stripColors** `boolean` - Default: `false`.
  If `true`, colors are stripped from the report.

```js
const vnuValidateHtml = require('@mapbox/vnu-validate-html');

vnuValidateHtml.validate(myFilesGlob)
  .then(report => console.log(report))
  .catch(/* ... */);
```

## CLI

The CLI allows you to run [`validate`](#validate) and log the report.

Run `vnu-validate-html --help` for details.

## Alternatives

[html-validator](https://github.com/zrrrzzt/html-validator) and [html-validator-cli](https://github.com/zrrrzzt/html-validator-cli) validate your HTML through Validator.nu's [Web Service Interface](https://github.com/validator/validator/wiki/Service-%C2%BB-HTTP-interface).
You don't need Java to run those.
But you might hit rate limits on the API, if you validate a lot of HTML files frequently.
