[![npm](https://img.shields.io/npm/v/key-value-transformer.svg)](https://www.npmjs.com/package/key-value-transformer)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
[![minified size](https://badgen.net/bundlephobia/min/key-value-transformer)](https://bundlephobia.com/result?p=key-value-transformer)
[![downloads](http://img.shields.io/npm/dm/key-value-transformer.svg?style=flat-square)](https://npmjs.org/package/key-value-transformer)
[![GitHub Issues](https://img.shields.io/github/issues/arlac77/key-value-transformer.svg?style=flat-square)](https://github.com/arlac77/key-value-transformer/issues)
[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Farlac77%2Fkey-value-transformer%2Fbadge\&style=flat)](https://actions-badge.atrox.dev/arlac77/key-value-transformer/goto)
[![Styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Known Vulnerabilities](https://snyk.io/test/github/arlac77/key-value-transformer/badge.svg)](https://snyk.io/test/github/arlac77/key-value-transformer)
[![Coverage Status](https://coveralls.io/repos/arlac77/key-value-transformer/badge.svg)](https://coveralls.io/github/arlac77/key-value-transformer)

# key-value-transformer

Replaces key value pairs in a stream of lines

```js
import { keyValueTransformer } from "key-value-transformer";

const input = getTextStream();
const output = keyValueTransformer(input, async * (key,value) => { yield [key, "newValue" ];})

```

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

*   [KeyValueUpdates](#keyvalueupdates)
    *   [Parameters](#parameters)
*   [KeyValueTransformOptions](#keyvaluetransformoptions)
    *   [Properties](#properties)
*   [colonSeparatedKeyValuePairOptions](#colonseparatedkeyvaluepairoptions)
*   [equalSeparatedKeyValuePairOptions](#equalseparatedkeyvaluepairoptions)
*   [colonSeparatedKeyValuePairOptionsDoublingKeys](#colonseparatedkeyvaluepairoptionsdoublingkeys)
*   [keyValueTransformer](#keyvaluetransformer)
    *   [Parameters](#parameters-1)

## KeyValueUpdates

Type: [Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)

### Parameters

*   `key` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** current key
*   `value` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** current value
*   `presentKeys` **[Set](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set)<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** the already seen keys

Returns **AsyncIterator<[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>>** updated key and value pairs

## KeyValueTransformOptions

Type: Objects

### Properties

*   `extractKeyValue` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** 1st. line with key and value
*   `extractValueContinuation` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** additional lines holding only values
*   `lineEnding` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** used to separate lines
*   `keyValueSeparator` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** chars to separate key vrom value like '=' or ':'
*   `keyValueLines` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** to generate line(s) for a key value(s) pair
*   `trailingLines` **Iterator<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** lines coming after all key values have been written

## colonSeparatedKeyValuePairOptions

## equalSeparatedKeyValuePairOptions

## colonSeparatedKeyValuePairOptionsDoublingKeys

## keyValueTransformer

Replaces key value pairs in a stream of lines.

### Parameters

*   `source` **AsyncIterator<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** 
*   `updates` **[KeyValueUpdates](#keyvalueupdates)** 
*   `options` **[KeyValueTransformOptions](#keyvaluetransformoptions)**  (optional, default `colonSeparatedKeyValuePairOptions`)

Returns **AsyncIterator<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** lines with replaces key value pairs

# install

With [npm](http://npmjs.org) do:

```shell
npm install key-value-transformer
```

# license

BSD-2-Clause
