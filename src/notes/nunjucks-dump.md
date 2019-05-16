---
layout: layouts/note.njk
title: How to dump a collection using eleventy and nunjucks
description: How to dump a collection using eleventy and nunjucks
date: 2019-05-16
tags:
  - eleventy
  - nunjucks
  - staticsite
location: Leipzig
---
## How to dump a collection using eleventy and nunjucks

Nunjucks offers some [builtin filters](https://mozilla.github.io/nunjucks/templating.html#builtin-filters) out of the box.
Most of them are ported from [jinja's filters](https://jinja.pocoo.org/docs/dev/templates/#builtin-filters), in addition nunjucks has a few of its own.

### Examples

<pre><code>&#123;% set items = [1, 2, 3] %}
&#123;{ items | first }}
> 1

&#123;{ items | dump }}
> [1,2,3]
</code></pre>

<pre><code>&#123;% set foods = { ketchup: '5 tbsp', mustard: '1 tbsp', pickle: '0 tbsp', salt: '1 tbsp' } %}
&#123;{ foods | length }}
> 3

&#123;{ foods | dump }}
> {"ketchup":"5 tbsp","mustard":"1 tbsp","pickle":"0 tbsp"}
</code></pre>

### Dumping a collection

However, dumping a collection leads to the following error:

```
TypeError: Converting circular structure to JSON (Template render error)
```

There are several solutions to dump a circular structure anyway:

- in node.js use `util.inspect(object)` to replace circular links with "[Circular]"
- use JSON.stringify with a custom replacer function (the second parameter of `stringify`) to exclude already serialized objects**
- use a module/plugin like [Circular JSON](https://github.com/WebReflection/circular-json)

#### Example using util

Add a filter function in *.eleventy.js*.
Util is a built-in module, you do not have to install it.

*.eleventy.js*

```
const util = require('util')

eleventyConfig.addFilter('dump', obj => {
  return util.inspect(obj)
});
```

You can pass an [options](https://nodejs.org/api/util.html#util_util_inspect_object_options) as second parameter:
`util.inspect(obj, { depth: 5, ... })`

*Usage*

<pre><code>&lt;pre>&#123;{ foods | dump }}&lt;/pre></code></pre>

*Output*

```
{ ketchup: '5 tbsp',
  mustard: '1 tbsp',
  pickle: '0 tbsp',
  salt: '1 tbsp' }
```

#### Example using JSON.stringify

Solution from [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value#Examples).
This solution removes all repeating values, not just the circular ones.

Add a filter function in *.eleventy.js*.

*.eleventy.js*

```
eleventyConfig.addFilter('dump', obj => {
  const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };

  return JSON.stringify(obj, getCircularReplacer(), 4);
});
```

*Usage*

<pre><code>&lt;pre>&#123;{ foods | dump }}&lt;/pre></code></pre>

*Output*

```
{
    "ketchup": "5 tbsp",
    "mustard": "1 tbsp",
    "pickle": "0 tbsp",
    "salt": "1 tbsp"
}
```
