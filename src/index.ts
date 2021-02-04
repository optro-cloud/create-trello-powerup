import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import * as inquirer from 'inquirer'
import {ALL_CAPABILITIES, copyFile, deleteFile, deleteFolder, downloadRepo} from './utilities'
import * as path from 'path'
import * as fs from 'fs'
import {exec} from 'child_process'

class CreateTrelloPowerup extends Command {
  static description = 'Easily create Trello Power-Ups from the Command Line'

  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
  }

  static args = [];

  async run() {
    // Read Arguments
    const {args, flags} = this.parse(CreateTrelloPowerup)

    // Show Introduction
    this.log('---')
    this.log('Create-Trello-PowerUp')
    this.log('Easily create new Trello Power-Ups with sample code and capabilities...')
    this.log('---')

    // Get Information from User
    const parameters = await inquirer.prompt([
      {
        name: 'name',
        message: '[1/4] Name',
        type: 'input',
        default: 'my-powerup',
      },
      {
        name: 'language',
        message: '[2/4] Language:',
        type: 'list',
        choices: [
          {name: 'TypeScript', value: 'typescript'},
          {name: 'JavaScript', value: 'javascript'},
        ],
      },
      {
        name: 'capabilities',
        message: '[3/4] Capabilities:',
        type: 'checkbox',
        choices: [
          {name: 'Attachment Section', value: 'attachment-sections'},
          {name: 'Attachment Thumbnail', value: 'attachment-thumbnail'},
          {name: 'Authorization Status', value: 'authorization-status'},
          {name: 'Board Button', value: 'board-buttons', checked: true},
          {name: 'Card Back Section', value: 'card-back-section', checked: true},
          {name: 'Card Badges', value: 'card-badges', checked: true},
          {name: 'Card Button', value: 'card-buttons', checked: true},
          {name: 'Card Detail Badge', value: 'card-detail-badges', checked: true},
          {name: 'Card From URL', value: 'card-from-url'},
          {name: 'Format URL', value: 'format-url'},
          {name: 'List Action', value: 'list-actions', checked: true},
          {name: 'List Sorter', value: 'list-sorters', checked: true},
          {name: 'On Enable', value: 'on-enable', checked: true},
          {name: 'On Disable', value: 'on-disable', checked: true},
          {name: 'Remove Data', value: 'remove-data'},
          {name: 'Save Attachment', value: 'save-attachment'},
          {name: 'Show Authorization', value: 'show-authorization'},
          {name: 'Show Settings', value: 'show-settings', checked: true},
        ],
      },
      {
        name: 'integrations',
        message: '[4/4] Integrations:',
        type: 'checkbox',
        choices: [
          {name: 'Optro Monetization', value: 'optro', checked: true},
          {name: 'Google Analytics', value: 'ga'},
        ],
      },
    ])

    this.log('---')
    this.log('Selection Complete: Starting Generation...')
    this.log('---')

    // Create Directory
    this.log('Creating Project Folder...')
    if (fs.existsSync(name)) {
      this.error('The project folder specified already exists!  Exiting.')
      this.exit(1)
    } else {
      fs.mkdirSync(path.join(process.cwd(), name))
    }
    this.log('Done')

    // 1. Clone the Template Repo
    this.log('[1/5] Cloning Template...')
    try {
      await downloadRepo('https://github.com/optro-cloud/trello-powerup-full-sample.git', path.join(process.cwd(), name))
      deleteFolder(path.join(process.cwd(), name, '.github', 'ISSUE_TEMPLATE'))
    } catch (error) {
      this.error('A fatal error occurred during cloning template', error)
      this.exit(1)
    }
    this.log('Done')

    // 2. Delete Unused Folders
    this.log('[2/5] Deleting Unused Folders...')
    try {
      const capabilitiesToRemove = ALL_CAPABILITIES.filter(capability => !parameters.capabilities.includes(capability))
      for (const capability of capabilitiesToRemove) {
        deleteFolder(path.join(process.cwd(), name, 'src', capability))
      }
    } catch (error) {
      this.error('A fatal error occurred during deleting unused folders', error)
      this.exit(2)
    }
    this.log('Done')

    // 4. Configure Dynamic Files
    this.log('[3/5] Configuring Dynamic Files...')
    try {
      // 4.1 TODO: Webpack Config File
      deleteFile(path.join(process.cwd(), 'webpack.config.js'))
      copyFile(path.join(__dirname, '..', 'templates', 'webpack.config.js'), path.join(process.cwd(), name, 'webpack.config.js'))
      // TODO: REWRITE FILES WITH THE RIGHT LINES DEPENDING ON OPTIONS
      // Do we need the templates folder from which to create a new file, or just remove the irrelevant patterns?
      // Best Idea: Use shell.sed to perform stream editing?
      // Worst Idea: Delete certain lines (these would all be wrong after a previous change was made
      // 4.2 TODO: React Router File
      deleteFile(path.join(process.cwd(), 'src', 'router.tsx'))
      // 4.3 TODO: Capabilities File
      deleteFile(path.join(process.cwd(), 'src', 'capabilities.ts'))
      // 4.4 TODO: Environmental Variables File (for dev)
      // (path.join(process.cwd(), '.env')
      // 4.5 TODO: Readme File with custom parameters etc.
    } catch (error) {
      this.error('A fatal error occurred during configuring dynamic files', error)
      this.exit(3)
    }
    this.log('Done')

    // 4. Install Dependencies
    this.log('[4/5] Installing Dependencies')
    try {
      // TODO: This doesn't block at the moment
      exec('yarn install', (error, stdOut, stdErr) => {
        if (error) {
          this.error(`error: ${error.message}`)
          return
        }
        if (stdErr) {
          this.log(`stderr: ${stdErr}`)
          return
        }
        this.log(`stdout: ${stdOut}`)
      })
    } catch (error) {
      this.error('A fatal error occurred during installing dependencies', error)
      this.exit(4)
    }
    this.log('Done')

    // 5. Cleanup
    this.log('[5/5] Performing Cleanup')
    try {
      // TODO: Cleanup, like delete the .git folder
    } catch (error) {
      this.error('A fatal error occurred during cleanup', error)
      this.exit(5)
    }

    this.log('Done')
  }
}

export = CreateTrelloPowerup
