module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': ['babel-jest', { configFile: '<rootDir>/test/babel.config.json' }],
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '/.next/',
  ],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: ['/node_modules/', '/.next/', '/e2e/'],
};
