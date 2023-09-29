import * as fs from 'fs/promises';
import * as path from 'path';

async function getAllJsAndTsFiles(directoryPath: string, filesArray: string[] = []) {
  const files = await fs.readdir(directoryPath);

  for (const file of files) {
    const filePath = path.join(directoryPath, file);
    const stats = await fs.stat(filePath);

    if (stats.isDirectory()) {
      await getAllJsAndTsFiles(filePath, filesArray);
    } else if (/\.(js|ts)$/.test(filePath)) {
      filesArray.push(filePath);
    }
  }

  return filesArray;
}

export default getAllJsAndTsFiles;
