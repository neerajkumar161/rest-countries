import { readFile, writeFile } from 'node:fs/promises'

/**
 * Read the file
 * */
export const readFileFromDB = async (path: string) => {
  try {
    return await readFile(path, { encoding: 'utf-8' })
  } catch (error) {
    return undefined
  }
}

export const writeFileToDB = async (path: string, data: string | NodeJS.ArrayBufferView) => {
  await writeFile(path, data, { encoding: 'utf-8' })
  return true
}
