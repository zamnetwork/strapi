import path from 'path';
import { program } from 'commander';
import transform from '../lib/transforms/v4-to-v5-changes';
import runJscodeshift from '../lib/utils/run-jscodeshift';

program
  .option('-v, --version <string>', 'upgrade to version')
  .option('-f, --file <string>')
  .parse();

console.log(`starting upgrade process to ${program.opts().version}`);

if (program.opts().version === '5') {
  console.log('Running v4 to v5 changes');

  const filesToTransform = [path.resolve(program.opts().file)];

  filesToTransform.forEach((file) => {
    runJscodeshift(file, 'v4-to-v5-changes', {});
  });
}
