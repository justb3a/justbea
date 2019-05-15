---
layout: layouts/note.njk
title: Styling select-dropdowns [2]
description: Styling select-dropdowns – Follow up
date: 2017-09-13
tags:
  - styling
  - css
---
Follow up: [Styling select-dropdowns](https://justbea.dev/notes/20161122-0953-styling-select-dropdowns/)

Another way would be:

## The markup:

```html
<div class="form-item">
  <label for="subject">Subject*</label>
  <select name="subject" id="subject">
    <option value="">Choose</option>
    <option value="1">wisely you must</option>
    <option value="2">young padawan</option>
  </select>
  <svg class="icon  icon--arrow">
    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/sprites.svg#icon--arrow"></use>
  </svg>
</div>
```

## The CSS:

```css
.form-item {
  position: relative;
}
.icon {
  position: absolute;
  right: 0.75rem;
  bottom: 0.75rem;
  pointer-events: none;
}
select {
  width: 100%;
  border: 3px solid grey;
  appearance: none;
}
```
