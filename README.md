Create Trello Power-Up CLI
=====================

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/create-trello-powerup.svg)](https://npmjs.org/package/create-trello-powerup)
[![Downloads/week](https://img.shields.io/npm/dw/create-trello-powerup.svg)](https://npmjs.org/package/create-trello-powerup)
[![License](https://img.shields.io/npm/l/create-trello-powerup.svg)](https://github.com/optro-cloud/create-trello-powerup/blob/master/package.json)

This package enables you to easily create Trello Power-Ups from the Command Line.

* [Usage](#usage)

# Usage

The CLI can be started with a single command provided you have Node.js installed.

It guides you through the creation of a new Power-Up by asking questions to determine the capabilities that are enabled.

```sh-session
$ npx @optro/create-trello-powerup

---
Create-Trello-PowerUp
Easily create new Trello Power-Ups with sample code and capabilities...
---

? [1/2] Name?
> My Example Power-Up

? [2/2] Capabilities: (Press <space> to select, <a> to toggle all, <i> to invert selection)
>( ) Attachment Section
 ( ) Attachment Thumbnail
 ( ) Authorization Status
 (*) Board Button
 (*) Card Back Section
 (*) Card Badges
 (*) Card Button
(Move up and down to reveal more choices)

? [3/3] Confirm package creation? y/n (Y/n)

[1/4] Cloning Template...
[2/4] Deleting Unused Resources...
[3/4] Configuring Dynamic Files...
[4/4] Installing Dependencies...

Done!
```
