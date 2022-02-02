import ScreenshotTestError from './ScreenshotTestError';
import {makeScreenshotRequest} from '../api';
import {ImakeScreenshotRequestParams} from '../api/types';

export interface ImakeScreenshotParams extends ImakeScreenshotRequestParams {}

/**
 * Возвращает скриншот в base64 или ошибку.
 */
const makeScreenshot = async (params: ImakeScreenshotParams): Promise<string | null | ScreenshotTestError> => {
    const response = await makeScreenshotRequest(params);
    if (response && response.data) {
        const {base64PngData, error, isSuccess} = response.data;
        if (isSuccess && base64PngData) {
            return base64PngData;
        } else if (error) {
            return new ScreenshotTestError({message: error});
        }
    }

    return new ScreenshotTestError({message: 'Неизвестная ошибка.'});
};

export default makeScreenshot;
