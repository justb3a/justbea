---
layout: layouts/note.njk
title: Responsive Typography – min and max font-size
description:
date: 2019-06-11
tags:
  - typographie
  - css
twitterId:
---
## Setting min and max font-size via CSS

Learnings from [*Design Meets Code LAB: #Responsive Typography*](https://design-meets-code.org/blog/post/responsive-typography)
<small>6th June 2019 in Leipzig, Germany</small>

```
font-size:
  calc(
    [minimum font size] + ([maximum font size] - [minimum font size])
    * ((100vw - [minimum viewport width]) / ([maximum viewport width] - [minimum viewport width]))
  );
```

### Example

- minimum viewport width: 320px
- minimum font size: 14px
- maximum viewport width: 1600px
- maximum font size: 24px

```
font-size:
  calc(
    14px + (24 - 14)
    * ((100vw - 320px) / (1600 - 320))
  );
```

It's really important to skipp the units in the first and last bracket.
Also make sure that the spaces are preserved.

### SASS Mixin

There are also several SASS Mixins:

- [Mike Riethmuller: Codepen](https://codepen.io/MadeByMike/pen/vNrvdZ)
- [Indrek Paas : Sass Gist](https://www.sassmeister.com/gist/7f22e44ace49b5124eec)
- [Matej Latin: Codepen](https://codepen.io/matejlatin/pen/dEXQmG)

```
// @include fluid-type([minimum viewport width], [maximum viewport width], [minimum font size], [maximum font size]);

body {
  @include fluid-type(320px, 1600px, 14px, 24px);
}
```

### Read More

- [Mike Riethmuller: Fluid typography examples](https://www.madebymike.com.au/writing/fluid-type-calc-examples/)
- [Geoff Graham: Fluid Typography](https://css-tricks.com/snippets/css/fluid-typography/)
