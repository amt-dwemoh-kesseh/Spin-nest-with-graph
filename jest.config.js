module.exports = {
    setupFiles: ['<rootDir>/test/setEnvVars.js'],
    silent: false,
    moduleFileExtensions: ['js', 'ts'],
    rootDir: '.',
    testRegex: '[.](spec|test).ts$',
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    coverageDirectory: './coverage',
    testEnvironment: 'node',
    roots: ['<rootDir>/'],
    moduleNameMapper: {
      "^@app(.*)$": "<rootDir>/src/app/$1",
      "^@auth(.*)$": "<rootDir>/src/app/auth/$1"
    },
  };