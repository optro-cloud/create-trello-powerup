import * as camelCase from 'camelcase'
import {
  CAPABILITIES_REPLACEMENT_STRING,
  CAPABILITY_MODULES,
  REACT_ROUTER_LOADER_REPLACEMENT_STRING,
  REACT_ROUTER_MODULE_REPLACEMENT_STRING,
  WEBPACK_REPLACEMENT_STRING,
} from './constants'

export function getIndent(i: number) {
  return ' '.repeat(i * 4)
}

export function getPascalCase(capability: string) {
  return camelCase(capability, {pascalCase: true})
}

export function getWebpackHtmlPlugin(capability: string) {
  return `${WEBPACK_REPLACEMENT_STRING}
${getIndent(2)}new HtmlWebpackPlugin({\r
${getIndent(3)}chunks: ["${capability}"],\r
${getIndent(3)}template: "templates/react.hbs",\r
${getIndent(3)}filename: "${capability}.html",\r
${getIndent(3)}templateParameters: {\r
${getIndent(4)}powerup_name: process.env.POWERUP_NAME,\r
${getIndent(4)}powerup_app_key: process.env.POWERUP_APP_KEY\r
${getIndent(3)}}\r
${getIndent(2)}}),`
}

export function getReactRouterRoute(capability: string) {
  return `${REACT_ROUTER_MODULE_REPLACEMENT_STRING}
${getIndent(4)}<Route path={\`/${capability}\`}>
${getIndent(5)}<${getPascalCase(capability)} />
${getIndent(4)}</Route>`
}

export function getReactRouterLoader(capability: string) {
  return `${REACT_ROUTER_LOADER_REPLACEMENT_STRING}
const ${getPascalCase(capability)} = React.lazy(() => import("./${capability}/${getPascalCase(capability)}"));`
}

export function getCapabilityModule(capability: string) {
  return `${CAPABILITIES_REPLACEMENT_STRING}
"${capability}": ${CAPABILITY_MODULES[capability]},`
}

export function getEnv(id: string, name: string, appKey: string, optroApiKey: string) {
  return `NODE_ENV=production
PORT=3000
POWERUP_NAME=${name}
POWERUP_ID=${id}
POWERUP_APP_KEY=${appKey}
POWERUP_URL=https://optro-cloud.github.io/trello-powerup-full-sample
CONTEXT_PATH=/trello-powerup-full-sample
OPTRO_API_KEY=${optroApiKey}`
}
