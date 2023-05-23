// Конфигурация Jest для запуска тесов в IDE. Данная конфигурация не генерирует Allure отчет.
module.exports = {
  preset: 'ts-jest',
  roots: [
    '<rootDir>/src/',
    '<rootDir>/tools/',
    '<rootDir>/tests/',
  ],
  setupFilesAfterEnv: [
    '<rootDir>/jest/jest.setup.ts',
  ],
  moduleDirectories: [
    'node_modules',
    'src'
  ],
  verbose: true,
};
