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
