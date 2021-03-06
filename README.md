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
$ npx create-trello-powerup

---
Create-Trello-PowerUp
---

? [1/4] Name My Power-Up Name
? [3/4] Capabilities: Board Button, Card Back Section
? [4/4] Integrations: Optro Monetization
? Confirm package creation? y/n Yes

[1/4] Cloning Template...
[2/4] Deleting Unused Resources...
[3/4] Configuring Dynamic Files...
[4/4] Installing Dependencies...

Done!
```
