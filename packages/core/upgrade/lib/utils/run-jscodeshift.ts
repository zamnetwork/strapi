import { join } from 'path';
import execa from 'execa';

const jscodeshiftExecutable = require.resolve('.bin/jscodeshift');

export default async (path: string, transform: string, options: object) => {
  try {
    console.log(join(__dirname, '..', 'transforms', `${transform}.js`));
    return await execa(
      jscodeshiftExecutable,
      ['-t', join(__dirname, '..', 'transforms', `${transform}.js`), path],
      options
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
