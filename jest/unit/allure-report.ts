import {JasmineAllureReporter} from 'allure-jasmine';
import {Status, TestResult} from 'allure-js-commons';

const reporter = new JasmineAllureReporter({
    resultsDir: 'tests/out/unit/allure/allure-results',
    testMapper: (result: TestResult) => {
        if (result.status == Status.SKIPPED) result.fullName = `(WAS SKIPPED) ${result.fullName}`;
        return result;
    },
});

// @ts-ignore
jasmine.getEnv().addReporter(reporter);

export const allure = reporter.getInterface();
