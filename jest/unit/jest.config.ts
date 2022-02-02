import type {Config} from '@jest/types';

// Конфигурация Jest для запуска unit тесов.
const config: Config.InitialOptions = {
  preset: 'ts-jest',
  rootDir: '../../',
  roots: [
    '<rootDir>/src/',
    '<rootDir>/tools/',
  ],
  setupFilesAfterEnv: [
    '<rootDir>/jest/jest.setup.ts',
    '<rootDir>/jest/unit/allure-report.ts',
  ],
  moduleDirectories: [
    'node_modules',
    'src'
  ],
  moduleNameMapper: {
    "@jest/(.*)": "<rootDir>/jest/$1.ts"
  },
  verbose: true,
};

export default config;