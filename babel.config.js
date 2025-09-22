module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', 'nativewind/babel'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@': './src',
            '@components': './src/components',
            '@screens': './src/screens',
            '@services': './src/services',
            '@utils': './src/utils',
            '@types': './src/types',
            '@assets': './assets'
          }
        }
      ],
      // Reanimated v4 moved the Babel plugin to react-native-worklets
      // see the runtime message from Reanimated and use the new plugin
      'react-native-worklets/plugin'
    ]
  };
};