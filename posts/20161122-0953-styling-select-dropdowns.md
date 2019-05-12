---
title: Styling select-dropdowns [1]
description: Styling select-dropdowns
date: 2016-11-22
tags:
  - styling
  - css
layout: layouts/post.njk
---
# Styling select-dropdowns

`// @see:` [webgefrickel.de – Styling form elements](https://webgefrickel.de/blog/styling-form-elements)

This is a similar approach keeping the select element focusable (via keyboard / tab).

## The markup:

```
<p>
  <label for="chooser">Choose it</label>
  <div class="fake-select">
    <select id="chooser" name="choosychoose">
      <option value="">Choose</option>
      <option value="1">wisely you must</option>
      <option value="2">young padawan</option>
    </select>
  </div>
</p>
```

## The CSS:

```
.fake-select {
  margin-bottom: 1.125rem;
  background: url('path/to/icon.svg') no-repeat right center;
  background-size: 10px;
  overflow: hidden;

  select {
    background: transparent;
    margin: 0;
  }
}
```

![Styling Choose](/img/choose.jpg)
