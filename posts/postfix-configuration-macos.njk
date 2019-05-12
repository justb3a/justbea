---
title: Postfix Configuration macOS
description: little step-by-step guide to send emails from macOS on my local machine
date: 2018-06-18
tags:
  - postfix
  - macos
  - sendmail
layout: layouts/post.njk
---
# Postfix Configuration macOS

This is a little step-by-step guide which worked for me to send emails from macOS on my local machine.

## Step 1 – sasl_passwd file

Create a SASL (a Simple Authentication and Security Layer) password file:

```
> sudo vi /etc/postfix/sasl_passwd
```

The file contains only a single line consisting of the following data:

```
[mailserver]:[port] [username@domain.com]:[password]
```

You have to replace **[mailserver]**, **[username@domain.com]** as well as **[password]** with the actual data. You might be able to skip the **:[port]** part.
For example:

```
smtp.provider.de johndoe@somewhere.de:qwertzuiop
```

## Step 2 – postfix lookup

Create a postfix lookup for the SASL password file, this is done by executing the following command:

```
> sudo postmap /etc/postfix/sasl_passwd
```

You could test this configuration by running:

```
> postmap -q [mailserver] hash:/etc/postfix/sasl_passwd
```

This should return your configuration data, continuing the example from above:

```
> postmap -q smtp.provider.de hash:/etc/postfix/sasl_passwd
johndoe@somewhere.de:qwertzuiop
```

## Step 3 – main configuration

Now you have to adapt the postfix main configuration file  `main.cf`. I recommend backing it up before you start editing it.

```
> sudo vi /etc/postfix/main.cf
```

Some of these settings might be set already, just enter the missing parts at the bottom of the file:

```
mail_owner = _postfix
setgid_group = _postdrop

# specifix configuration
myhostname = <domain.de>
relayhost = <mailserver>:<port>
smtpd_sender_restrictions = permit_inet_interfaces

# enable SASL
smtp_sasl_auth_enable = yes
smtp_sasl_password_maps = hash:/etc/postfix/sasl_passwd
smtp_sasl_security_options =

# enable TLS
smtp_use_tls=yes
smtp_tls_security_level=encrypt
smtp_sasl_mechanism_filter = AUTH LOGIN

# what domains to receive mail for
mydestination =
```

## Step 4 – (re)start postfix

Now you've to (re)start postfix in order to read in the current configuration:

```
> sudo postfix start
(or rather) sudo postfix reload
```

## Step 5 – Testing

It's time to test the configuration by sending a test mail. You could do so by executing:

```
> date | mail -s testmail recipient@domain.de
> php -r "if (mail('recipient@domain.de', 'postfix test', date('D M d H:i:s T Y'))) { echo 'success'; }"
```

## Step 6 – Mail Queue

From time to time it's quite useful to have a look at the mail queue:

```
> mailq
```

You could reset the mail queue manually by running:

```
> sudo postsuper -d ALL
```

## Step 7 – Logging

`/var/log/mail.log` does not work since macOS Sierra. Apple uses a new log system and does not use the log files / asl any longer.
Now the logs are stored in memory or in a log db.

@see: [Server 5.2 missing SMTP Logs](https://discussions.apple.com/thread/7688551)

You can use the following command:

```
> log stream --predicate  '(process == "smtpd") || (process == "smtp")' --info  | grep "to=<"
```

You can also redirect the output directly into a file:

```
> log stream --predicate  '(process == "smtpd") || (process == "smtp")' --info > ~/mail.log
```
