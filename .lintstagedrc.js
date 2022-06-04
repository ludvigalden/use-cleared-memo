module.exports = {
  '*.ts|tsx': ['eslint --cache --fix', () => 'yarn build'],
  '*.js|jsx': 'eslint --cache --fix',
};
