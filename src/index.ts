import {Command, flags} from '@oclif/command'
import * as inquirer from 'inquirer'
import {
  getCapabilityImport,
  getCapabilityModule,
  getCardButtonMonetizationEndTag,
  getCardButtonMonetizationImport,
  getCardButtonMonetizationStartTag,
  getEnv, getLicenseStatusTag,
  getReactRouterLoader,
  getReactRouterMonetizationClient,
  getReactRouterMonetizationImport,
  getReactRouterMonetizationProvider,
  getReactRouterMonetizationProviderClose,
  getReactRouterRoute,
  getWebpackHtmlPlugin,
} from './utility/string'
import * as path from 'path'
import {execSync} from 'child_process'
import * as shell from 'shelljs'
import * as replace from 'replace-in-file'
import figlet from 'figlet'
import filenamify from 'filenamify'
import {blue} from 'kleur/colors'
import {
  ALL_CAPABILITIES,
  ALL_HTML_BACKED_CAPABILITIES,
  CAPABILITIES_IMPORT_REPLACEMENT_STRING,
  CAPABILITIES_REPLACEMENT_STRING,
  CARD_BUTTON_CONDITIONAL_END_REPLACEMENT_STRING,
  CARD_BUTTON_CONDITIONAL_IMPORT_REPLACEMENT_STRING,
  CARD_BUTTON_CONDITIONAL_START_REPLACEMENT_STRING,
  CARD_BUTTON_STATUS_REPLACEMENT_STRING, CONSOLE_WIDTH, INPUT_ARGUMENTS,
  REACT_ROUTER_CLIENT_PROVIDER_CLOSE_REPLACEMENT_STRING,
  REACT_ROUTER_CLIENT_PROVIDER_REPLACEMENT_STRING,
  REACT_ROUTER_CLIENT_REPLACEMENT_STRING,
  REACT_ROUTER_IMPORT_REPLACEMENT_STRING,
  REACT_ROUTER_LOADER_REPLACEMENT_STRING,
  REACT_ROUTER_MODULE_REPLACEMENT_STRING,
  TEMPLATE_REPO,
  WEBPACK_REPLACEMENT_STRING,
} from './utility/constants'
import {
  addDependency, centerConsole,
  copyFile,
  deleteDependency,
  deleteFile,
  deleteFolder,
  doesFolderExist,
  downloadRepo,
  writeToFile,
} from './utility/fs'

class CreateTrelloPowerup extends Command {
  static description = 'Easily create Trello Power-Ups from the Command Line'

  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
  }

  static args = INPUT_ARGUMENTS;

  async run() {
    // Read Arguments
    const {args, flags} = this.parse(CreateTrelloPowerup)
    this.debug(args, flags)
    // Show Introduction
    this.log(blue('-'.repeat(CONSOLE_WIDTH)))
    this.log(blue(figlet.textSync(centerConsole('Optro', CONSOLE_WIDTH - 20), {
      font: 'Small Slant',
    })))
    this.log(blue('-'.repeat(CONSOLE_WIDTH)))
    this.log('🎉 Create Trello Power-Up')
    this.log('Generate a new Trello Power-Up to your exact specifications...')
    this.log('-'.repeat(CONSOLE_WIDTH))

    if (!shell.which('git')) {
      shell.echo('Missing Required Package: git')
      shell.exit(1)
    }

    // Get Information from User
    const parameters = await inquirer.prompt([
      {
        name: 'name',
        message: '1. What is the Power-Up Name?',
        type: 'input',
        default: 'my-powerup',
        when: (_answers => !args.powerupName),
      },
      {
        name: 'capabilities',
        message: `${args.powerupName ? '1' : '2'}. What Capabilities should be enabled?`,
        type: 'checkbox',
        choices: [
          {name: 'Attachment Section', value: 'attachment-section'},
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
        name: 'confirm',
        message: `${args.powerupName ? '2' : '3'}. Confirm Power-Up generation?`,
        type: 'confirm',
        default: true,
        when: (answers => answers),
      },
    ])

    if (!parameters.confirm) {
      this.error('User Cancelled Project Generation')
      this.exit(0)
    }

    const folderName = args.powerupName ?? filenamify(parameters.name).replace(' ', '-')

    // Check if Directory Exists
    if (doesFolderExist(folderName)) {
      this.error('The project folder specified already exists!  Exiting.')
      this.exit(1)
    }

    // 1. Clone the Template Repo
    this.log('[1/4] Cloning Template...')
    try {
      await downloadRepo(TEMPLATE_REPO, path.join(process.cwd(), folderName))
      deleteFolder(path.join(process.cwd(), folderName, '.git'))
    } catch (error) {
      this.error('A fatal error occurred during cloning template', error)
      this.exit(1)
    }

    // 2. Delete Unused Folders
    this.log('[2/4] Deleting Unused Resources...')
    try {
      const capabilitiesToRemove = ALL_CAPABILITIES.filter(capability => !parameters.capabilities.includes(capability))
      for (const capability of capabilitiesToRemove) {
        deleteFolder(path.join(process.cwd(), folderName, 'src', capability))
      }
      deleteFolder(path.join(process.cwd(), folderName, '.github', 'ISSUE_TEMPLATE'))
      deleteFile(path.join(process.cwd(), 'webpack.config.ts'))
      deleteFile(path.join(process.cwd(), 'src', 'router.tsx'))
      deleteFile(path.join(process.cwd(), 'src', 'capabilities.ts'))
    } catch (error) {
      this.error('A fatal error occurred while deleting unused resources', error)
      this.exit(2)
    }

    // 3. Configure Dynamic Files
    this.log('[3/4] Configuring Dynamic Files...')
    try {
      copyFile(path.join(__dirname, '..', 'templates', 'webpack.config.ts'), path.join(process.cwd(), folderName, 'webpack.config.ts'))
      copyFile(path.join(__dirname, '..', 'templates', 'router.tsx'), path.join(process.cwd(), folderName, 'src', 'router.tsx'))
      copyFile(path.join(__dirname, '..', 'templates', 'capabilities.ts'), path.join(process.cwd(), folderName, 'src', 'capabilities.ts'))
      const applicableCapabilities = ALL_HTML_BACKED_CAPABILITIES.filter(c => parameters.capabilities.includes(c))
      for (const capability of applicableCapabilities.reverse()) {
        // 3.1 - Webpack Config File
        replace.replaceInFileSync({
          files: path.join(process.cwd(), folderName, 'webpack.config.ts'),
          from: WEBPACK_REPLACEMENT_STRING,
          to: getWebpackHtmlPlugin(capability),
        })
        // 3.2 React Router File
        replace.replaceInFileSync({
          files: path.join(process.cwd(), folderName, 'src', 'router.tsx'),
          from: REACT_ROUTER_MODULE_REPLACEMENT_STRING,
          to: getReactRouterRoute(capability),
        })
        replace.replaceInFileSync({
          files: path.join(process.cwd(), folderName, 'src', 'router.tsx'),
          from: REACT_ROUTER_LOADER_REPLACEMENT_STRING,
          to: getReactRouterLoader(capability),
        })
      }
      for (const capability of parameters.capabilities) {
        // 3.3 Capabilities File
        replace.replaceInFileSync({
          files: path.join(process.cwd(), folderName, 'src', 'capabilities.ts'),
          from: CAPABILITIES_IMPORT_REPLACEMENT_STRING,
          to: getCapabilityImport(capability),
        })
        replace.replaceInFileSync({
          files: path.join(process.cwd(), folderName, 'src', 'capabilities.ts'),
          from: CAPABILITIES_REPLACEMENT_STRING,
          to: getCapabilityModule(capability),
        })
      }
      // 3.4 Environmental Variables File
      const powerupId = args.powerupId ? args.powerupId : 'UNSPECIFIED'
      const apiKey = args.apiKey ? args.apiKey : 'UNSPECIFIED'
      const licenseType = args.licenseType ? args.licenseType : 'UNSPECIFIED'
      writeToFile(
        path.join(process.cwd(), folderName, '.env'),
        getEnv(
          powerupId,
          folderName,
          apiKey,
          licenseType,
        ),
      )
      // 3.6 Monetization
      // 3.6.1 Add Dependency for the Optro API Client
      addDependency(path.join(process.cwd(), folderName, 'package.json'), '@optro/api-client', '^1.0.3')
      // 3.6.2 Add License Provider to Router
      replace.replaceInFileSync({
        files: path.join(process.cwd(), folderName, 'src', 'router.tsx'),
        from: REACT_ROUTER_IMPORT_REPLACEMENT_STRING,
        to: getReactRouterMonetizationImport(),
      })
      replace.replaceInFileSync({
        files: path.join(process.cwd(), folderName, 'src', 'router.tsx'),
        from: REACT_ROUTER_CLIENT_REPLACEMENT_STRING,
        to: getReactRouterMonetizationClient(),
      })
      replace.replaceInFileSync({
        files: path.join(process.cwd(), folderName, 'src', 'router.tsx'),
        from: REACT_ROUTER_CLIENT_PROVIDER_REPLACEMENT_STRING,
        to: getReactRouterMonetizationProvider(),
      })
      replace.replaceInFileSync({
        files: path.join(process.cwd(), folderName, 'src', 'router.tsx'),
        from: REACT_ROUTER_CLIENT_PROVIDER_CLOSE_REPLACEMENT_STRING,
        to: getReactRouterMonetizationProviderClose(),
      })
      // 3.6.2 Add Example Licensed Feature (Colorized Cards)
      if (parameters.capabilities.includes('card-buttons')) {
        // 3.6.3 Add import for LicenseConditional to the Card Button component
        replace.replaceInFileSync({
          files: path.join(process.cwd(), folderName, 'src', 'card-button', 'CardButton.tsx'),
          from: CARD_BUTTON_CONDITIONAL_IMPORT_REPLACEMENT_STRING,
          to: getCardButtonMonetizationImport(),
        })
        // 3.6.4 Add LicenseConditional to the Render Code
        replace.replaceInFileSync({
          files: path.join(process.cwd(), folderName, 'src', 'card-button', 'CardButton.tsx'),
          from: CARD_BUTTON_CONDITIONAL_START_REPLACEMENT_STRING,
          to: getCardButtonMonetizationStartTag(),
        })
        replace.replaceInFileSync({
          files: path.join(process.cwd(), folderName, 'src', 'card-button', 'CardButton.tsx'),
          from: CARD_BUTTON_CONDITIONAL_END_REPLACEMENT_STRING,
          to: getCardButtonMonetizationEndTag(),
        })
        // 3.6.5 Add License Status Display
        replace.replaceInFileSync({
          files: path.join(process.cwd(), folderName, 'src', 'card-button', 'CardButton.tsx'),
          from: CARD_BUTTON_STATUS_REPLACEMENT_STRING,
          to: getLicenseStatusTag(),
        })
      }

      // 3.5 Cleanup Unused Dependencies
      if (!parameters.capabilities.includes('card-back-section')) {
        deleteDependency(path.join(process.cwd(), folderName, 'package.json'), 'lottie-react')
      }
      if (!parameters.capabilities.includes('attachment-thumbnail')) {
        deleteDependency(path.join(process.cwd(), folderName, 'package.json'), 'unique-names-generator')
      }
      if (!parameters.capabilities.includes('card-buttons')) {
        deleteDependency(path.join(process.cwd(), folderName, 'package.json'), 'react-color')
      }
    } catch (error) {
      this.error('A fatal error occurred during configuring dynamic files', error)
      this.exit(3)
    }

    // 4. Install Dependencies
    this.log('[4/4] Installing Dependencies...')
    try {
      execSync(`yarn --cwd "${path.join(process.cwd(), folderName)}" install --silent`, {stdio: 'inherit'})
    } catch (error) {
      this.error('A fatal error occurred during installing dependencies', error)
      this.exit(4)
    }

    this.log('Finished building Project!')

    const doneParameters = await inquirer.prompt([
      {
        name: 'start',
        message: 'Would you like to start the Power-Up in Development Mode?',
        type: 'confirm',
        default: true,
      },
    ])

    if (doneParameters.start) {
      execSync(`yarn --cwd "${path.join(process.cwd(), folderName)}" watch`, {stdio: 'inherit'})
    }
  }
}

export = CreateTrelloPowerup
