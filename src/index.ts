import {Command, flags} from '@oclif/command'
import * as inquirer from 'inquirer'
import {getCapabilityModule, getEnv, getIndent, getReactRouterLoader, getWebpackHtmlPlugin} from './utility/string'
import * as path from 'path'
import * as fs from 'fs'
import {execSync} from 'child_process'
import * as shell from 'shelljs'
import * as replace from 'replace-in-file'
import {
  ALL_CAPABILITIES,
  ALL_HTML_BACKED_CAPABILITIES, CAPABILITIES_REPLACEMENT_STRING, REACT_ROUTER_LOADER_REPLACEMENT_STRING,
  REACT_ROUTER_MODULE_REPLACEMENT_STRING,
  WEBPACK_REPLACEMENT_STRING,
} from './utility/constants'
import {
  copyFile,
  deleteFile,
  deleteFolder,
  downloadRepo,
  writeToFile,
} from './utility/fs'

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

    if (!shell.which('git')) {
      shell.echo('Missing Required Package: git')
      shell.exit(1)
    }

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
      {
        name: 'confirm',
        message: 'Confirm package creation? y/n',
        type: 'confirm',
        default: true,
      },
    ])

    if (!parameters.confirm) {
      this.error('User Cancelled Project Generation')
      this.exit(0)
    }

    // Create Directory
    if (fs.existsSync(parameters.name)) {
      this.error('The project folder specified already exists!  Exiting.')
      this.exit(1)
    } else {
      fs.mkdirSync(path.join(process.cwd(), parameters.name))
    }

    // 1. Clone the Template Repo
    this.log('[1/4] Cloning Template...')
    try {
      await downloadRepo('https://github.com/optro-cloud/trello-powerup-full-sample.git', path.join(process.cwd(), parameters.name))
      deleteFolder(path.join(process.cwd(), parameters.name, '.git'))
    } catch (error) {
      this.error('A fatal error occurred during cloning template', error)
      this.exit(1)
    }

    // 2. Delete Unused Folders
    this.log('[2/4] Deleting Unused Resources...')
    try {
      const capabilitiesToRemove = ALL_CAPABILITIES.filter(capability => !parameters.capabilities.includes(capability))
      for (const capability of capabilitiesToRemove) {
        deleteFolder(path.join(process.cwd(), parameters.name, 'src', capability))
      }
      deleteFolder(path.join(process.cwd(), parameters.name, '.github', 'ISSUE_TEMPLATE'))
      deleteFile(path.join(process.cwd(), 'webpack.config.js'))
      deleteFile(path.join(process.cwd(), 'src', 'router.tsx'))
      deleteFile(path.join(process.cwd(), 'src', 'capabilities.ts'))
    } catch (error) {
      this.error('A fatal error occurred during deleting unused resources', error)
      this.exit(2)
    }

    // 3. Configure Dynamic Files
    this.log('[3/4] Configuring Dynamic Files...')
    try {
      copyFile(path.join(__dirname, '..', 'templates', 'webpack.config.js'), path.join(process.cwd(), parameters.name, 'webpack.config.js'))
      copyFile(path.join(__dirname, '..', 'templates', 'router.tsx'), path.join(process.cwd(), parameters.name, 'src', 'router.tsx'))
      copyFile(path.join(__dirname, '..', 'templates', 'capabilities.ts'), path.join(process.cwd(), parameters.name, 'src', 'capabilities.tsx'))
      const applicableCapabilities = ALL_HTML_BACKED_CAPABILITIES.filter(c => parameters.capabilities.includes(c))
      for (const capability of applicableCapabilities.reverse()) {
        // 3.1 - Webpack Config File
        replace.replaceInFileSync({
          files: path.join(process.cwd(), parameters.name, 'webpack.config.js'),
          from: WEBPACK_REPLACEMENT_STRING,
          to: getWebpackHtmlPlugin(capability),
        })
        // 3.2 React Router File
        replace.replaceInFileSync({
          files: path.join(process.cwd(), parameters.name, 'src', 'router.tsx'),
          from: REACT_ROUTER_MODULE_REPLACEMENT_STRING,
          to: getWebpackHtmlPlugin(capability),
        })
        replace.replaceInFileSync({
          files: path.join(process.cwd(), parameters.name, 'src', 'router.tsx'),
          from: REACT_ROUTER_LOADER_REPLACEMENT_STRING,
          to: getReactRouterLoader(capability),
        })
        // 3.3 Capabilities File
        replace.replaceInFileSync({
          files: path.join(process.cwd(), parameters.name, 'src', 'capabilities.tsx'),
          from: CAPABILITIES_REPLACEMENT_STRING,
          to: getCapabilityModule(capability),
        })
      }
      // 3.4 Environmental Variables File
      writeToFile(
        path.join(process.cwd(), parameters.name, '.env'),
        getEnv('UNDEFINED', parameters.name, 'UNDEFINED', 'DISABLED')
      )
      // 3.5 Cleanup Unused Dependencies
      if (!parameters.capabilities.includes('card-back-section')) {
        replace.replaceInFileSync({
          files: path.join(process.cwd(), parameters.name, 'package.json'),
          // TODO: Replace with RegEx
          from: `${getIndent(1)}"lottie-react": "^2.1.0",\r\n`,
          to: '',
        })
      }
      if (!parameters.capabilities.includes('attachment-thumbnail')) {
        replace.replaceInFileSync({
          files: path.join(process.cwd(), parameters.name, 'package.json'),
          // TODO: Replace with RegEx
          from: `${getIndent(1)}"unique-names-generator": "^4.3.1",\r\n`,
          to: '',
        })
      }
      if (!parameters.capabilities.includes('attachment-thumbnail')) {
        replace.replaceInFileSync({
          files: path.join(process.cwd(), parameters.name, 'package.json'),
          // TODO: Replace with RegEx
          from: `${getIndent(1)}"react-color": "^2.19.3",\r\n`,
          to: '',
        })
      }
    } catch (error) {
      this.error('A fatal error occurred during configuring dynamic files', error)
      this.exit(3)
    }

    // 4. Install Dependencies
    this.log('[4/4] Installing Dependencies...')
    try {
      execSync(`yarn --cwd ${path.join(process.cwd(), parameters.name)} install --silent`, {stdio: 'inherit'})
    } catch (error) {
      this.error('A fatal error occurred during installing dependencies', error)
      this.exit(4)
    }
  }
}

export = CreateTrelloPowerup
