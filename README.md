@optro/create-trello-powerup
=====================
## Create Trello Power-Ups from your Command Line!

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@optro/create-trello-powerup.svg)](https://npmjs.org/package/@optro/create-trello-powerup)
[![Downloads/week](https://img.shields.io/npm/dw/@optro/create-trello-powerup.svg)](https://npmjs.org/package/@optro/create-trello-powerup)
[![License](https://img.shields.io/npm/l/@optro/create-trello-powerup.svg)](https://github.com/optro-cloud/create-trello-powerup/blob/master/package.json)

This package enables you to easily create Trello Power-Ups from the Command Line.

Try it today with `npx @optro/create-trello-powerup`

## Features

This command line tool enables you to create Trello Power-Ups easily and can generate a new project with everything you need to get going.

- A Power-Up written with TypeScript, with a React front-end
- Single command development mode for fast local development with ngrok using `yarn watch`
- Automatic refresh of the React front-end following local changes
- Build a static website from the source with `yarn build`
- Run a simple node.js server for hosting `yarn build && yarn start`
- A Dockerfile for running with Docker

Check the [Readme](https://github.com/optro-cloud/trello-powerup-full-sample) of the generated project for help getting started with the project.

## Requirements

You need to have the following 2 dependencies installed on your system prior to running `npx @optro/create-trello-powerup`:

- Node.js ≥12
- Git

## Usage

The CLI can be started with a single command provided you have Node.js and Git installed.

Once you have started the command, the on-screen instructions will guide you through the creation of a new Power-Up by asking questions to determine the capabilities that you would like to be enabled.

```sh-session
$ npx @optro/create-trello-powerup

---
Create-Trello-PowerUp
Easily create new Trello Power-Ups with sample code and capabilities...
---

? [1/2] Name?
> My Example Power-Up

? [2/2] Capabilities: (Press <space> to select, <a> to toggle all, <i> to invert selection)
> ( ) Attachment Section
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

## How does it work?

This package uses `git` to clone the template project [@optro-cloud/trello-powerup-full-sample](https://github.com/optro-cloud/trello-powerup-full-sample) and then rewrites the required files according to the specification provided. Check out the template repository for more information, or for an exhaustive example.

## Coming Soon...

The current release of the generator is the first main release of the tool and it will be improved over time.

In the next release, we will be enabling Monetization Support using the [Optro Platform](https://www.optro.cloud).

This will enable an additional option during project generation to enable monetization support, which allows you to choose to accept subscription payments using Per-User or Per-Board Licensing for the Power-Ups that you've written, using the Optro Vendor solution.
