import camelCase from 'camelcase'
import {
  CAPABILITIES_IMPORT_REPLACEMENT_STRING,
  CAPABILITIES_REPLACEMENT_STRING,
  CAPABILITY_MODULES,
  REACT_ROUTER_LOADER_REPLACEMENT_STRING,
  REACT_ROUTER_MODULE_REPLACEMENT_STRING,
  WEBPACK_REPLACEMENT_STRING,
} from './constants'

function getCapabilityFolderName(capability: string) {
  return capability.endsWith('s') && capability !== 'show-settings' ? capability.slice(0, -1) : capability
}

export function getIndent(i: number) {
  return ' '.repeat(i * 4)
}

export function getPascalCase(capability: string) {
  return camelCase(capability, {pascalCase: true})
}

export function getWebpackHtmlPlugin(capability: string) {
  return `${WEBPACK_REPLACEMENT_STRING}
${getIndent(2)}new HtmlWebpackPlugin({\r
${getIndent(3)}chunks: ['${capability}'],\r
${getIndent(3)}template: 'templates/react.hbs',\r
${getIndent(3)}filename: '${getCapabilityFolderName(capability)}.html',\r
${getIndent(3)}templateParameters: {\r
${getIndent(4)}powerup_name: process.env.POWERUP_NAME,\r
${getIndent(4)}powerup_app_key: process.env.POWERUP_APP_KEY\r
${getIndent(3)}}\r
${getIndent(2)}}),`
}

export function getReactRouterRoute(capability: string) {
  const name = getCapabilityFolderName(capability);
  return `${REACT_ROUTER_MODULE_REPLACEMENT_STRING}
${getIndent(4)}<Route path={\`/${name}.html\`}>
${getIndent(5)}<${getPascalCase(name)} />
${getIndent(4)}</Route>`
}

export function getReactRouterLoader(capability: string) {
  const folder = getCapabilityFolderName(capability)
  return `${REACT_ROUTER_LOADER_REPLACEMENT_STRING}
const ${getPascalCase(folder)} = React.lazy(() => import('./${folder}/${getPascalCase(folder)}'))`
}

export function getCapabilityImport(capability: string) {
  const folder = getCapabilityFolderName(capability)
  return `${CAPABILITIES_IMPORT_REPLACEMENT_STRING}
import {get${getPascalCase(folder)}} from './${folder}/capability'`
}

export function getCapabilityModule(capability: string) {
  return `${CAPABILITIES_REPLACEMENT_STRING}
    '${capability}': ${CAPABILITY_MODULES[capability]},`
}

export function getEnv(id: string, name: string, optroApiKey: string, licenseType: string) {
  return `NODE_ENV=development
PORT=3000
POWERUP_NAME=${name}
POWERUP_ID=${id}
POWERUP_APP_KEY=UNSPECIFIED
POWERUP_URL=https://optro-cloud.github.io/trello-powerup-full-sample
CONTEXT_PATH=/
OPTRO_API_KEY=${optroApiKey}
OPTRO_LICENSE_TYPE=${licenseType}`
}
