---
layout: layouts/note.njk
title: Add git support for vim using fugitive – diff
description:
date: 2019-07-18
tags:
  - vim
  - git
  - diff
  - patch
location: Leipzig
---
## Add git support for vim using fugitive [1]

### Basics: add and checkout

- **index**: last committed version of the <file>
- **working copy**: file containing local changes (unstaged)

#### workflow

- **start**: index and working copy are the same
- **change**: working copy has been changed
- **add**: after `git add <file>` index and working copy does match – changes has been staged

#### commands

- run `:Gwrite` (similar to  `:Git add %` and `git add <file>`) on the working copy to apply changes to the index
- run `:Gread` (similar to  `:Git checkout %` and `git checkout <file>`) on the working copy to reset changes to the index

![Git Add and Checkout](/assets/img/posts/20190718_git-add.jpg)

### Using add --patch

- add patches from a changed file similar to `git add --patch`
- in vim status split (`:Gstatus`) press `P` (*shortcut* in terminal: `g add -p`)
- does not add all the changes immediately
- goes through each change and asks whether you want to add it or not
- splits changes into *hunks*: displays a diff for each change (called *hunk*)
- *Stage this hunk [y,n,q,a,d,j,J,g,/,s,e,?]?*
    - `y` **y**es stage this hunk
    - `n` **n**o do not stage this hunk
    - `q` **q**uit, do not stage this hunk or any of the remaining ones
    - `a` stage this hunk and **a**ll later hunks in the file
    - `d` do not stage this hunk or any of the later hunks in the file
    - `j` leave this hunk undecided, see next undecided hunk
    - `J` leave this hunk undecided, see next hunk
    - `g` **g**o to: select hunk to go to
    - `/` search for hunk matching the given regex
    - `s` **s**plit the current hunk into smaller hunks
    - `e` **e**dit the current hunk manually
    - `?` print help

### Using diff to execute add --patch

- stage only some of the changes and keep others in the working copy (but not in the index)
