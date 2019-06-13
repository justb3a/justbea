---
layout: layouts/note.njk
title: Vim – how to add text at the end of each line
description:
date: 2019-06-13
tags:
  - vim
twitterId:
---
## Vim – how to add text at the end of each line

Given the following code:

```
'item1
'item2 with another name
'item3 something
```

The **goal** is to append **',** at the end of each line so it looks like:

```
'item1',
'item2 with another name',
'item3 something',
```

There are several ways to append text at the end of each line:

1. [using visual block mode](./#using-visual-block-mode)
2. [using the substitute command](./#using-the-substitute-command)
3. [using a macro](./#using-a-macro)

### using visual block mode

```
gg0<C-V>2j$A',<Esc>
```

- go to the beginning of the first line: `gg0`
- enter visual block mode: `<C-V>` (ctrl + V)
    - check for *-- VISUAL BLOCK --*
- move downwards 2 lines to select all lines: `2j`
- go to the end of the last line: `$`
- now enter `A` to append text
    - the cursor appears at the end of the first line
- type in the desired characters **',**
- press the `<Esc>` key to confirm

You can use any kind of selection to select the lines (for example: `vip` - visual select a paragraph).

### using the substitute command

Option A) Apply it to every line in the whole file:

```
:%
```

Option B) Apply it only to a subset of lines, select the desired lines by pressing `v` and moving up/below `k`/`j`:

```
:'<,'>
```

Append the regex

```
s/$/',/
```

- search `s/`
- for the line ending `$`
- and replace with `/`
- some characters `',`
- finish regex `/`

### using a macro

```
gg
qq
$a',<Esc>jq
2@q
```

- go to the first line: `gg`
- type `qq` to start to record at `q`
    - check for *recording @q*
- go to the end of the current line: `$`
- press `a` to enter text afterwards
- type in the desired characters **',**, leave insert mode by hitting `<Esc>`
- press `j` to enter the next line
- now press `q` to stop recording
- go to the second line `:2` and execute the recorded macro twice by typing `2@q`

