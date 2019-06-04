---
layout: layouts/note.njk
title: How to combine multiple PDFs using the command line
description: How to combine multiple PDFs using the command line
date: 2019-06-04
tags:
  - command-line
  - pdf
  - macOS
twitterId:
---
## How to combine multiple PDFs using the command line

There are several ways with different advantages and disadvantages:

1. [using pre-installed macOS python script](./#using-pre-installed-macos-python-script)
2. [using Ghostscript](./#using-ghostscript)
3. [manually using Preview.app](./#manually-using-preview.app)

### using pre-installed macOS python script

> Joing pages from a a collection of PDF files into a single PDF file.

```
/System/Library/Automator/Combine\ PDF\ Pages.action/Contents/Resources/join.py -o path/to/merged-file.pdf /path/to/source1.pdf /path/to/source2.pdf /path/to/dir/*.pdf
```

**Usage:**

`join [--output <file>] [--shuffle] [--verbose]`

**Parameter:**

`--output` | `-o`
Set a certain file as the destination.

`--shuffle` | `-s`
Take a page from each PDF input file in turn before taking another from each file.
If this option is not specified then all of the pages from a PDF file are appended to the output PDF file before the next input PDF file is processed.

`--verbose` | `-v`
Write information about the doings of this tool to stderr.

**Easier use by using a shorter command:**

*Option 1*

Set up an alias.

Edit `~/.bash_profile`, add a new line:

```
alias joinPDF='/System/Library/Automator/Combine\ PDF\ Pages.action/Contents/Resources/join.py -o'
```

Reload .bash_profile file by running:

```
source ~/.bash_profile
```

Use it from everywhere:

```
joinPDF path/to/merged-file.pdf /path/to/source1.pdf /path/to/source2.pdf /path/to/dir/*.pdf
```

*Option 2*

Put the link in `/usr/local/bin` (as it is in the $PATH)

```
cd /usr/local/bin
sudo ln /System/Library/Automator/Combine\ PDF\ Pages.action/Contents/Resources/join.py joinPDF
```

Use it from everywhere:

```
joinPDF -o path/to/merged-file.pdf /path/to/source1.pdf /path/to/source2.pdf /path/to/dir/*.pdf
```

`@see:` [Joining PDF files in OS X from the command line](https://gotofritz.net/blog/howto/joining-pdf-files-in-os-x-from-the-command-line/)

*Option 3*

Set up an symbolic link like `ln -s /System/Library/Automator/Combine\ PDF\ Pages.action/Contents/Resources/join.py joinPDF.py`.

Use it depending on symlinc location:

```
./joinPDF.py -o path/to/merged-file.pdf /path/to/source1.pdf /path/to/source2.pdf /path/to/dir/*.pdf
```

`@see:` [How do I join multiple PDFs into one from command-line?](https://www.cs.cmu.edu/~benhdj/Mac/unix.html#joinPDF)

### using Ghostscript

Install Ghostscript via homebrew:

```
brew install gs
```

Run command:

```
gs -q -dNOPAUSE -dBATCH -sDEVICE=pdfwrite -sOutputFile=path/to/merged-file.pdf /path/to/source1.pdf /path/to/source2.pdf /path/to/dir/*.pdf
```

### manually using Preview.app

To combine PDF files manually, open the first PDF in Preview.app as you are used to. Open the thumbnail view. Then drag and drop all the PDF files you want below or above the last page thumbnail and move them to the desired position.
