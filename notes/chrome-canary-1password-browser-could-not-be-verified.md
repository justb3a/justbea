---
layout: layouts/note.njk
title: Chrome Canary - 1Password – Browser could not be verified
description: 1Password stops working in Chrome Canary
date: 2018-07-09
tags:
  - chrome
  - chromecanary
  - 1password
---
# 1Password stops working in Chrome Canary

**First:**

- make sure everything is up to date (Chrome, 1Password Desktop, 1Password Mini)
- restart your browser and even perhaps your computer

To resolve this issue you have to copy

```
~/Library/Application Support/Google/Chrome/NativeMessagingHosts/2bua8c4s2c.com.agilebits.1password.json
```

to (maybe you have to create the folder as well since Canary doesn't create it by default):

```
~/Library/Application Support/Google/Chrome Canary/NativeMessagingHosts/2bua8c4s2c.com.agilebits.1password.json
```

**Reason**: Chrome Canary installs its *NativeMessaging JSON file* into a different location than Chrome.
