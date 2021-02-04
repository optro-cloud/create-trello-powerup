import * as git from 'nodegit'
import * as shell from 'shelljs'

export async function downloadRepo(url: string, destination: string) {
  await git.Clone.clone(url, destination)
}

export function deleteFile(path: string) {
  shell.rm('-f', path)
}

export function deleteFolder(path: string) {
  shell.rm('-rf', path)
}

export function copyFolder(source: string, destination: string) {
  shell.cp('-R', source, destination)
}

export function copyFile(source: string, destination: string) {
  shell.cp(source, destination)
}

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
