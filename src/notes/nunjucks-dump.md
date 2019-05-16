---
layout: layouts/note.njk
title: How to dump a collection using eleventy and nunjucks
description: How to dump a collection using eleventy and nunjucks
date: 2019-05-16
tags:
  - eleventy
  - nunjucks
  - staticsite
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

<pre><code>&#123;% set foods = { ketchup: '5 tbsp', mustard: '1 tbsp', pickle: '0 tbsp' } %}
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

There are several solutions to dump a collection anyway:

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
