module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.ts', '.tsx', '.js', '.json'],
          alias: {
            '@components': './src/components',
            '@services': './src/services',
            '@hooks': './src/hooks',
            '@screens': './src/screens',
            '@utils': './src/utils'
          }
        }
      ]
    ]
  };
};
