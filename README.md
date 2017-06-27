# @mapbox/vnu-validate-html

Validate static HTML with the Nu Html Checker.

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
  .then(report => /* ... */)
  .catch(/* ... */);
```

## CLI

The CLI allows you to run [`validate`](#validate) and log the report.

Run `vnu-validate-html --help` for details.
