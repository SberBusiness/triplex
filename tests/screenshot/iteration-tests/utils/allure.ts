import {Allure, ContentType} from 'allure-js-commons';
import {IIterationTestResult} from '../classes/IterationTest';
import ScreenshotTestError from '../../common/ScreenshotTestError';

/**
 * На основе результатов теста прикрепляет скриншоты к Allure report.
 */
export const attachScreensFromTestResult = (allure: Allure, testResult: IIterationTestResult): void => {
    if (testResult.base64Next) {
        allure.createAttachment('Screenshot next', () => Buffer.from(testResult.base64Next, 'base64'), ContentType.PNG)?.();
    }

    if (testResult.base64Original) {
        allure.createAttachment('Screenshot original', () => Buffer.from(testResult.base64Original, 'base64'), ContentType.PNG)?.();
    }

    if (testResult.base64Diff) {
        allure.createAttachment('Screenshot diff', () => Buffer.from(testResult.base64Diff, 'base64'), ContentType.PNG)?.();
    }
};

/**
 * На основе ошибки теста прикрепляет скриншоты к Allure report.
 */
export const attachScreensFromScreenshotTestError = (allure: Allure, screenshotTestError: ScreenshotTestError): void => {
    if (screenshotTestError.base64Next) {
        allure.createAttachment('Screenshot next', () => Buffer.from(screenshotTestError.base64Next!, 'base64'), ContentType.PNG)?.();
    }

    if (screenshotTestError.base64Original) {
        allure.createAttachment('Screenshot original', () => Buffer.from(screenshotTestError.base64Original!, 'base64'), ContentType.PNG)?.();
    }
};