module.exports = {
  'src/**/*.+(ts|tsx)': ['yarn lint:staged', 'yarn typecheck:staged', 'yarn format'],
  'src/**/*.+(json)': ['yarn format'],
  // Use functions so lint-staged does not append staged file paths as arguments.
  // yarn strings:sort and strings:check have hardcoded paths and break when
  // lint-staged appends an extra path argument.
  'src/strings/strings.*.yaml': [
    () => 'yarn strings:sort',
    () => 'yarn strings:check'
  ]
};
