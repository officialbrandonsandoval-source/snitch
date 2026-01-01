module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|ts|tsx)$': 'babel-jest',
  },
  testMatch: [
    '**/__tests__/**/*.test.(js|ts|tsx)',
    '**/?(*.)+(spec|test).(js|ts|tsx)'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: [],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-native-community|@testing-library|expo|@expo|react-navigation|@react-navigation)/)'
  ],
};
