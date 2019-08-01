---
layout: layouts/note.njk
title: Add git support for vim using fugitive – diff
description:
date: 2019-08-01
tags:
  - vim
  - git
  - diff
  - patch
location: Leipzig
---
## Add git support for vim using fugitive [2: stage specific change]

- use `diff` to execute `add --patch`
- stage only some of the unstaged changes
- keep others in the working copy
- update index file (index file needs to be saved)

### Prerequisites

- change something in the working copy of a file
- open status split (`:Gstatus`)
- get diff for certain file (move to file in status split, press `D`)

### 1. add hunk from working copy to index

- this could be either added *(Example 1)*, removed lines *(Example 2)* or edited lines *(Example 3)*
- place cursor on the desired line
- divide hunks by using visual selection `:'<,'>diffput` (if necessary)

**OPTION 1: select index** (left)

add hunk by running `:diffget` (shortcut: `do`)

**OPTION 2: select working copy** (right)

add hunk by running `:diffput` (shortcut: `dp`)

### 2. save index file

by running `:w`

### 3. check status split

- status split should be realoaded automatically, if not type `:e`
- if you have not added all changes, the file should appear twice
- only some of the changes have been staged

### 4. review staged changes

run `:Git diff --cached %` (similar to `git diff --cached <file>`) to list only staged changes for the file

### 5. commit and push changes

`:Gcommit` and `Gpush`

### Examples

**Example 1: stage added lines**

![Git stage changes added](/assets/img/posts/20190801_git-patch-stage1.jpg)

**Example 2: stage removed lines**

![Git stage changes removed](/assets/img/posts/20190801_git-patch-stage2.jpg)

**Example 3: stage edited lines**

![Git stage changes edited](/assets/img/posts/20190801_git-patch-stage3.jpg)

