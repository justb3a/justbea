---
layout: layouts/note.njk
title: Get TTL
description: Get TTL setup for a domain
date: 2018-06-25
tags:
  - ttl
  - ns
  - nameserver
  - timetolive
  - dns
---
## Get TTL setup for a domain

### Get Nameserver

Specify the record type **NameServer (NS)** with the `-t` flag:

```
 ❯ host -t NS domain.com
```

For example:

```
❯ host -t NS stackoverflow.com

stackoverflow.com name server ns-358.awsdns-44.com.
stackoverflow.com name server ns-1033.awsdns-01.org.
stackoverflow.com name server ns-cloud-e1.googledomains.com.
stackoverflow.com name server ns-cloud-e2.googledomains.com.
```

### Dig TTL

Use the returned nameserver (which one doesn't matter) to get the TTL entry for the domain:

```
❯ dig +noall +answer domain.com @nameserver
```

For example:

```
❯ dig +noall +answer stackoverflow.com @ns-358.awsdns-44.com.

stackoverflow.com.      300     IN      A       151.101.129.69
stackoverflow.com.      300     IN      A       151.101.1.69
stackoverflow.com.      300     IN      A       151.101.193.69
stackoverflow.com.      300     IN      A       151.101.65.69
```
