export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!.*)', // Игнорируем всё в node_modules
  ],
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)', // Ищет тесты в папке __tests__
    '**/?(*.)+(spec|test).[jt]s?(x)', // Ищет файлы с суффиксами .spec или .test
  ],
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__ mocks __/fileMock.js',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^antd/es/(.*)$': 'antd/lib/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};
