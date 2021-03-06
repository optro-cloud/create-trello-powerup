import git from 'nodegit'
import * as shell from 'shelljs'
import * as fs from 'fs'

export async function downloadRepo(url: string, destination: string) {
  try {
    await git.Clone.clone(url, destination)
  } catch (e) {
    console.log(e)
  }
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

export function writeToFile(path: string, contents: string) {
  fs.writeFileSync(path, contents)
}
