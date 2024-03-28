import type {Config} from '@jest/types';

// Конфигурация Jest для запуска unit-тесов.
const config: Config.InitialOptions = {
    preset: 'ts-jest',
    rootDir: '../../',
    roots: ['<rootDir>/src/'],
    testEnvironment: 'allure-jest/jsdom',
    testEnvironmentOptions: {
        resultsDir: 'tests/out/unit/allure-results',
    },
    setupFilesAfterEnv: ['<rootDir>/jest/jest.setup.ts'],
    moduleNameMapper: {
        '^@sberbusiness/triplex/(.*)$': '<rootDir>/src/$1',
    },
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                tsconfig: 'tsconfig.test.json',
            },
        ],
    },
    verbose: true,
};

export default config;
