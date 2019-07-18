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
## Add git support for vim using fugitive


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

![Git Add and Checkout](/assets/img/posts/201907_git-add.jpg)

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

#### Add specific changes

1. add hunk from working copy to index
  - *option 1* select working copy: add hunk by running `:diffput` (shortcut: `dp`)
  - *option 2* select index: add hunk by running `:diffget` (shortcut: `do`)
  - divide hunks by using visual selection `:'<,'>diffput`
2. write updated index file (`:w`)
3. check status split
  - status split should be realoaded automatically, if not type `:e`
  - if you have not added all changes, the file should appear twice
  - only some of the changes have been staged
4. run `:git diff --cached %` (similar to `git diff --cached <file>`) to list only staged changes for the file

