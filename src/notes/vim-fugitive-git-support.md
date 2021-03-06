---
layout: layouts/note.njk
title: Add git support for vim using fugitive
description:
date: 2019-07-17
tags:
  - vim
  - git
location: Leipzig
---
## Add git support for vim using fugitive

Git wrapper plugin by Tim Pope: [tpope/vim-fugitive](https://github.com/tpope/vim-fugitive)

- `%` expands to the full path of the current file

| command  | note                                                          |
|----------|---------------------------------------------------------------|
| :Git     | run an arbitrary git command, *shortcut:* `:G {args}`         |
| :Gwrite  | stage file to the index                                       |
|          | like `:Git add %`                                             |
| :Gread   | revert file                                                   |
|          | like `:Git checkout %`                                        |
| :Gremove | delete file & vim buffer                                      |
|          | like `:Git rm %`                                              |
| :Gmove   | rename file & vim buffer                                      |
|          | like `:Git mv %`                                              |
| :Gcommit | opens commit window (interactive status: `C`)                 |
| :Gblame  | opens window containing annotations for each line of the file |
| :Gpush   | invoke `git push`                                             |
| :Gpull   | invoke `git pull`                                             |
| :Gstatus | invoke `git status`, *shortcut:* `:G`                         |
| :Gdiff   | invoke `git diff` (interactive status: `D`)                  |

### :Git

- run an arbitrary git command
- aliases work just fine

```
:Git branch
:Git br

// .gitconfig
[alias]
  br = branch
```

### :Gstatus

- shortcut `:G`, like `git status`
- interactive split window
- navigate between listed files:
  - `ctrl-n` next file
  - `ctrl-p` prev file
  - `gu` jump to *unstaged* section
  - `gs` jump to *staged* section
  - `gU` jump to *untracked* section
- stage / unstage file under cursor
  - `-` *toggle*: to add / remove a file from the index
  - `s` *stage* unstaged file: add to the index like `git add`
  - `u` *unstage* staged file: remove from the index like `git reset`
- works in visual mode as well (select multiple files and press `-`)
- if you want to add all files use `:git add .`
- press `<Enter>` to open current file (review it before adding)
    - press `o` to open current file in a new horizontal split
    - press `gO` to open current file in a new vertical split
    - press `O` to open current file in a tab

### :Gwrite

- stage file to the index like `:Git add %` or `git add <file>`
- adds all changes in that file to the index by default

## vimconfig example

```
nnoremap <silent> <leader>gs :Gstatus<CR><C-w>20+
nnoremap <silent> <leader>gd :Gdiff<CR><C-w>20+
nnoremap <silent> <leader>gc :Gcommit<CR><C-w>20+
nnoremap <silent> <leader>gw :Gwrite<CR><C-w>20+
nnoremap <silent> <leader>gp :Gpush<CR><C-w>20+
```

## manage index, commit and push

- `,gs` / `:G` to show git status
- `-` to add/remove file to the index
- `D` to get the diff for the selected file
- `cc` to enter commit message (`i` insert mode, write message, leave `:wq`)
- `,gp` / `:Gpush` push to current branch

## Further reading

- [documentation](https://github.com/tpope/vim-fugitive/blob/master/doc/fugitive.txt)
* [vimcasts: A complement to command line git](http://vimcasts.org/e/31)
* [vimcasts: Working with the git index](http://vimcasts.org/e/32)
* [git add --patch and --interactive](https://nuclearsquid.com/writings/git-add/)
* [vimcasts: Resolving merge conflicts with vimdiff](http://vimcasts.org/e/33)
* [vimcasts: Browsing the git object database](http://vimcasts.org/e/34)
* [vimcasts: Exploring the history of a git repository](http://vimcasts.org/e/35)
