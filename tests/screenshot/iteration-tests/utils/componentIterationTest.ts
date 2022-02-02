import {allure} from '../../../../jest/screenshot/allure-report';
import {TComponentIterationTest, TTestsSource} from '../types/test-types';
import IterationTest, {IterationTestResult} from '../classes/IterationTest';
import ScreenshotTestError from '../../common/ScreenshotTestError';
import {attachScreensFromTestResult, attachScreensFromScreenshotTestError} from './allure';

export const componentIterationTest: TComponentIterationTest = (componentName, cases, componentPath) => {
    describe(componentName, () => {
        beforeEach(() => allure.feature(componentName));
        describe.each<TTestsSource>(cases.map(
            ([stateTitle, options, selectorDelay]) => (
                [stateTitle, componentPath || `/#!/Components/${encodeURIComponent(componentName)}`, options, selectorDelay])
            )
        )('%s', (stateTitle, pathname, options, selectorDelay) => {
            test(stateTitle, async (done) => {
                const test = new IterationTest({
                    componentId: componentName,
                    stateId: stateTitle.replace(/ /g, '_'),
                    pathname: `${pathname}?options=${JSON.stringify(options)}`,
                    selectorDelay,
                });
                const result = await test.run();

                if (result instanceof ScreenshotTestError) {
                    attachScreensFromScreenshotTestError(allure, result);
                    done(result.message);
                    return;
                } else {
                    attachScreensFromTestResult(allure, result);
                    result.result === IterationTestResult.FAIL ? done('Изображения отличаются.') : done();
                }
            })
        });
    });
};

export const xcomponentIterationTest: TComponentIterationTest = (componentName, cases, componentPath) => {
    xdescribe(componentName ,() => {
        test('pass');
    })
};
