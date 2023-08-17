module.exports = {
  root: true,
  overrides: [
    {
      files: ['admin/**/*', 'ee/admin/**/*'],
      extends: ['custom/front'],
    },
    {
      files: ['**/*'],
      excludedFiles: ['admin/**/*'],
      extends: ['custom/back'],
    },
  ],
};
