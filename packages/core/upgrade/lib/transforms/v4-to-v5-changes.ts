import type { Transform } from 'jscodeshift';

// const transform:Transform = (file, api) => {
//   const j = api.jscodeshift;

//   return j(file.source)
//     .find(j.Identifier)
//     .forEach((path) => {
//       if (path.node.name === 'find') {
//         j(path).replaceWith(j.identifier('findOne'));
//       }
//     })
//     .toSource();
// }

const transform: Transform = (file, api) => {
  const j = api.jscodeshift;

  // Find the Program node
  const program = j(file.source);

  // Create the import statement node
  const importStatement = j.importDeclaration(
    [j.importSpecifier(j.identifier('newThing'))],
    j.literal('new-package')
  );

  // Add the import statement to the Program body
  program.find(j.Program).get('body').unshift(importStatement);

  return program.toSource();
};

export default transform;
