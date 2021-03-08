import git from 'nodegit'
import * as shell from 'shelljs'
import * as fs from 'fs'

export async function downloadRepo(url: string, destination: string): Promise<void> {
  await git.Clone.clone(url, destination)
}

export function deleteFile(path: string): void {
  shell.rm('-f', path)
}

export function deleteFolder(path: string): void {
  shell.rm('-rf', path)
}

export function copyFolder(source: string, destination: string): void {
  shell.cp('-R', source, destination)
}

export function copyFile(source: string, destination: string): void {
  shell.cp(source, destination)
}

export function writeToFile(path: string, contents: string): void {
  fs.writeFileSync(path, contents)
}

export function doesFolderExist(folderName: string): boolean {
  return fs.existsSync(folderName)
}

export function readJsonFile(filePath: string): any {
  const rawFile: string = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(rawFile)
}

export function writeJsonFile(filePath: string, jsonContents: any): void {
  const prettyString: string = JSON.stringify(jsonContents, undefined, 4)
  fs.writeFileSync(filePath, prettyString)
}

export function deleteDependency(filePath: string, packageName: string) {
  const packageJson: any = readJsonFile(filePath)
  if (packageJson.dependencies[packageName]) {
    delete packageJson.dependencies[packageName]
  } else if (packageJson.devDependencies[packageName]) {
    delete packageJson.devDependencies[packageName]
  }
  writeJsonFile(filePath, packageJson)
}
