export const TEMPLATE_REPO = 'https://github.com/optro-cloud/trello-powerup-full-sample.git'

export const WEBPACK_REPLACEMENT_STRING = 'new MiniCssExtractPlugin(),'

export const REACT_ROUTER_MODULE_REPLACEMENT_STRING = '<Router basename={process.env.CONTEXT_PATH || undefined}>'

export const REACT_ROUTER_LOADER_REPLACEMENT_STRING = '// Lazy Loaders'

export const CAPABILITIES_REPLACEMENT_STRING = 'window.TrelloPowerUp.initialize({'

export const CAPABILITIES_IMPORT_REPLACEMENT_STRING = '// Capability Imports Here'

export const REACT_ROUTER_IMPORT_REPLACEMENT_STRING = 'import {TrelloProvider} from \'@optro/ui-react\';'

export const REACT_ROUTER_CLIENT_REPLACEMENT_STRING = 'const t = window.TrelloPowerUp.iframe();'

export const REACT_ROUTER_CLIENT_PROVIDER_REPLACEMENT_STRING = '<TrelloProvider t={t}>'

export const REACT_ROUTER_CLIENT_PROVIDER_CLOSE_REPLACEMENT_STRING = '</Suspense>'

export const CARD_BUTTON_CONDITIONAL_IMPORT_REPLACEMENT_STRING = 'import {useProvidedTrello} from \'@optro/ui-react\';'

export const CARD_BUTTON_CONDITIONAL_START_REPLACEMENT_STRING = '<div className="color-picker-container">'

export const CARD_BUTTON_CONDITIONAL_END_REPLACEMENT_STRING = '<label htmlFor="note">'

export const CARD_BUTTON_STATUS_REPLACEMENT_STRING = '<div id="container">'

export const ALL_CAPABILITIES = [
  'attachment-sections',
  'attachment-thumbnail',
  'authorization-status',
  'board-buttons',
  'card-buttons',
  'card-back-section',
  'card-badges',
  'card-detail-badges',
  'card-from-url',
  'format-url',
  'list-sorters',
  'list-actions',
  'remove-data',
  'save-attachment',
  'show-authorization',
  'show-settings',
  'on-enable',
  'on-disable',
]

export const ALL_HTML_BACKED_CAPABILITIES = [
  'attachment-sections',
  'board-buttons',
  'card-buttons',
  'card-back-section',
  'show-settings',
]

export const CAPABILITY_MODULES: any = {
  'attachment-sections': '(t: Trello.PowerUp.IFrame, options: {entries: Trello.PowerUp.Attachment[]}) => getAttachmentSection(t, options, CAPABILITY_PROPS)',
  'attachment-thumbnail': '(t: Trello.PowerUp.IFrame, options: Trello.PowerUp.AttachmentThumbnailOptions) => getAttachmentThumbnail(t, options, CAPABILITY_PROPS)',
  'authorization-status': '(t: Trello.PowerUp.IFrame, options: any) => getAuthorizationStatus(t, options, CAPABILITY_PROPS)',
  'board-buttons': '(t: Trello.PowerUp.IFrame) => getBoardButton(t, CAPABILITY_PROPS)',
  'card-buttons': '(t: Trello.PowerUp.IFrame) => getCardButton(t, CAPABILITY_PROPS)',
  'card-back-section': '(t: Trello.PowerUp.IFrame) => getCardBackSection(t, CAPABILITY_PROPS)',
  'card-badges': '(t: Trello.PowerUp.IFrame) => getCardBadge(t, CAPABILITY_PROPS)',
  'card-detail-badges': '(t: Trello.PowerUp.IFrame) => getCardDetailBadge(t, CAPABILITY_PROPS)',
  'card-from-url': '(t: Trello.PowerUp.IFrame, options: Trello.PowerUp.CardFromUrlOptions) => getCardFromUrl(t, options, CAPABILITY_PROPS)',
  'format-url': '(t: Trello.PowerUp.IFrame, options: Trello.PowerUp.FormatUrlOptions) => getFormatUrl(t, options, CAPABILITY_PROPS)',
  'list-sorters': '(t: Trello.PowerUp.IFrame) => getListSorter(t, CAPABILITY_PROPS)',
  'list-actions': '(t: Trello.PowerUp.IFrame) => getListAction(t, CAPABILITY_PROPS)',
  'remove-data': '(t: Trello.PowerUp.IFrame) => getRemoveData(t, CAPABILITY_PROPS)',
  'save-attachment': '(t: Trello.PowerUp.IFrame, options: any) => getSaveAttachment(t, options, CAPABILITY_PROPS)',
  'show-authorization': '(t: Trello.PowerUp.IFrame) => getShowAuthorization(t, CAPABILITY_PROPS)',
  'show-settings': '(t: Trello.PowerUp.IFrame) => getShowSettings(t, CAPABILITY_PROPS)',
  'on-enable': '(t: Trello.PowerUp.IFrame) => getOnEnable(t, CAPABILITY_PROPS)',
  'on-disable': '(t: Trello.PowerUp.IFrame) => getOnDisable(t, CAPABILITY_PROPS)',
}

export const INPUT_ARGUMENTS = [
  {
    name: 'powerupName',
    required: false,
    description: 'Name of your Trello Power-Up',
    default: undefined,
  },
  {
    name: 'powerupId',
    required: false,
    description: 'Trello Power-Up ID',
    default: undefined,
  },
  {
    name: 'apiKey',
    required: false,
    description: 'Optro API key',
    default: undefined,
  },
  {
    name: 'licenseType',
    required: false,
    description: 'Licensing type for your Power-Up',
    default: 'board',
    options: ['board', 'user'],
  },
]
