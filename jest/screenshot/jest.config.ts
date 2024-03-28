import type {Config} from '@jest/types';

// Конфигурация Jest для запуска скриншот тесов.
const config: Config.InitialOptions = {
    preset: 'ts-jest',
    rootDir: '../../tests/screenshot/',
    setupFilesAfterEnv: ['../../jest/jest.setup.ts'],
    testEnvironment: 'allure-jest/node',
    testEnvironmentOptions: {
        resultsDir: 'tests/out/screenshot/allure-results',
    },
    verbose: true,
    testTimeout: 60000,
    // Для обновления скриншотов одного компонента, можно указать только его имя, чтобы не прогонять все тесты.
    // testRegex: 'DatePicker.test.ts',
};

export default config;
