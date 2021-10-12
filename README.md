@optro/create-trello-powerup
=====================
## Create Trello Power-Ups from your Command Line

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@optro/create-trello-powerup.svg)](https://npmjs.org/package/@optro/create-trello-powerup)
[![Downloads/week](https://img.shields.io/npm/dw/@optro/create-trello-powerup.svg)](https://npmjs.org/package/@optro/create-trello-powerup)
[![License](https://img.shields.io/npm/l/@optro/create-trello-powerup.svg)](https://github.com/optro-cloud/create-trello-powerup/blob/master/package.json)
[![Lint](https://github.com/optro-cloud/create-trello-powerup/actions/workflows/lint.yml/badge.svg)](https://github.com/optro-cloud/create-trello-powerup/actions/workflows/lint.yml)

This package enables you to easily create Trello Power-Ups from the Command Line (CLI).

Start building your Power-Up by running `npx @optro/create-trello-powerup`.

Used this package before? Run `npx @optro/create-trello-powerup@latest` to use the latest version.

## Features

This Power-Up Generator enables you to build Trello Power-Ups with ease and will quickly generate a project with everything you need, including:

- A Power-Up written with TypeScript, with a React front-end
- Integrated Monetization with [Optro](https://www.optro.cloud/) via [Optro Vendor](https://vendor.optro.cloud/)
- Single command development mode for fast local development with ngrok using `yarn watch`
- Automatic refresh of the React front-end following local changes
- Build a static website from the source with `yarn build`
- Run a simple node.js server for hosting `yarn build && yarn start`
- A Dockerfile for running with Docker

Check the [Readme](https://github.com/optro-cloud/trello-powerup-full-sample) of the generated project for help getting started with the project.

## Requirements

You need to have the following dependencies installed on your system prior to using the CLI:

- Node.js ≥12
- Git

## Usage

For an in-depth walkthrough you can follow our [step-by-step guide](https://vendor.optro.cloud/build-trello-powerup).

The Power-Up Generator can be started with a single command provided you have Node.js and Git installed.

Once you have started The Generator, the on-screen instructions will guide you through the creation of a Power-Up to determine which capabilities you would like enabled.

```sh-session
$ npx @optro/create-trello-powerup
                           
┌───────────────────────────┐                         
│ Create Trello Power-Up � │                          
└───────────────────────────┘                         
                                                      
Generate a new Trello Power-Up in minutes.            
                                                      
Find more information in our step-by-step guide:      
» https://vendor.optro.cloud/build-powerup-guide      
                                                      
                                                      
? 1. What is the Power-Up Name? (my-powerup) 
> My Example Power-Up

? 2. What Capabilities should be enabled? (Press <space> to select, <a> to toggle all, <i> to invert selection)
>( ) Attachment Section
 ( ) Attachment Thumbnail
 ( ) Authorization Status
 (*) Board Button
 (*) Card Back Section
 (*) Card Badges
 - Card Button (Mandatory)
(Move up and down to reveal more choices)

? 3. Confirm Power-Up generation? (Y/n)

[1/4] Cloning Template...
Cloning into 'C:\Development\my-example-power-up'...
[2/4] Deleting Unused Resources...
[3/4] Configuring Dynamic Files...
[4/4] Installing Dependencies...

┌─────────────────────────────┐
│ Finished building Power-Up! │
└─────────────────────────────┘

? Start the Power-Up in Development Mode (yarn watch)? (Y/n)
```

## How does it work?

This package uses `git` to clone the template project [@optro-cloud/trello-powerup-full-sample](https://github.com/optro-cloud/trello-powerup-full-sample) and then rewrites the required files according to the specification provided. Check out the template repository for more information, or for an exhaustive example.

## Would you like to make money from your Power-Up?
Power-Up monetization is powered by [Optro Vendor](https://vendor.optro.cloud/), and can be activated during generation of your Power-Up or added to an [existing Power-Up](https://docs.appfox.io/optro-vendor/Use-the-Trello-API-with-React.153059747.html).

It’s easy to add monetization to your Power-Ups by using Optro. The Power-Up Generator will automatically add the elements needed for monetization but it’s also easy to add them to an already existing Power-Ups. 

Once added, you can use The [Optro Vendor](https://vendor.optro.cloud/) platform allows you to publish your Power-Up to on the [Optro Market](https://www.optro.cloud/). You will have full control over the creation and publication of your Power-Up listings on Optro and you can take advantage of the Power-Up editor to show off all your Power-Ups best attributes.

Trello users will then be able to purchase paid subscriptions for the Power-Ups you have built, all using the Optro solution.

