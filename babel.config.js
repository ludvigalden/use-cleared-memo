module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
    'minify',
  ],
  plugins: ['@babel/plugin-transform-runtime'],
};
