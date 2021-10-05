@optro/create-trello-powerup
=====================
## Create Trello Power-Ups from your Command Line!

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@optro/create-trello-powerup.svg)](https://npmjs.org/package/@optro/create-trello-powerup)
[![Downloads/week](https://img.shields.io/npm/dw/@optro/create-trello-powerup.svg)](https://npmjs.org/package/@optro/create-trello-powerup)
[![License](https://img.shields.io/npm/l/@optro/create-trello-powerup.svg)](https://github.com/optro-cloud/create-trello-powerup/blob/master/package.json)
[![Lint](https://github.com/optro-cloud/create-trello-powerup/actions/workflows/lint.yml/badge.svg)](https://github.com/optro-cloud/create-trello-powerup/actions/workflows/lint.yml)

This package enables you to easily create Trello Power-Ups from the Command Line.

Start building your Power-Up by running `npx @optro/create-trello-powerup`.

Used this package before? Run `npx @optro/create-trello-powerup@latest` to use the latest version.

## Features

This command line tool enables you to create Trello Power-Ups easily and can generate a new project with everything you need to get going.

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
**For an in-depth walkthrough you can follow our [online guide](https://docs.appfox.io/optro-vendor/Start-the-Power-Up-Generator.153059402.html).**


The CLI can be started with a single command provided you have Node.js and Git installed.

Once you have started the command, the on-screen instructions will guide you through the creation of a new Power-Up by asking questions to determine the capabilities that you would like to be enabled.

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

## Monetization

Power-Up monetization is powered by [Optro Vendor](https://vendor.optro.cloud/), and can be activated during generation of your Power-Up or added to an [already existing Power-Up](https://docs.appfox.io/optro-vendor/Use-the-Trello-API-with-React.153059747.html).

The [Optro Vendor](https://vendor.optro.cloud/) platform allows you to publish your Power-Up to the [Optro Market](https://www.optro.cloud)
which allows you to choose to accept subscription payments for the Power-Ups that you've written, using the Optro Vendor solution.

**We recommend [registration on Optro Vendor](https://vendor.optro.cloud/apply) prior to generation of a Monetized Power-Up to reduce the amount of configuration necessary after the fact.**

Using the Optro vendor platform you'll be able to [create](https://docs.appfox.io/optro-vendor/Create-your-Power-Up-Listing.153059666.html) and [publish](https://docs.appfox.io/optro-vendor/Manage-your-Power-Up-Listings.153059673.html) a listing for your product which will be made visible on the Marketplace once your Power-Up is made available for purchase.

