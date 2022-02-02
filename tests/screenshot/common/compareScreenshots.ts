import ScreenshotTestError from './ScreenshotTestError';
import {IcompareScreenshotsRequest} from '../api/types';
import {compareScreenshotsRequest} from '../api';

export interface IcompareScreenshots extends IcompareScreenshotsRequest {}

/**
 * Возвращает результат сравнения 2х изображений. Результатом может быть:
 *  ошибка с сообщением;
 *  null - в случае, если изображения одинаковые;
 *  изображение в base64 с подсвеченными изменениями в случае, если изображения разные.
 */
const compareScreenshots = async (params: IcompareScreenshots): Promise<string | null | ScreenshotTestError> => {
    const response = await compareScreenshotsRequest(params);
    if (response && response.data) {
        const {diff, error, isSuccess} = response.data;
        if (isSuccess) {
            return diff.base64PngData;
        } else if (error) {
            return new ScreenshotTestError({
                message: error,
                base64Original: params.base64ImageFirst,
                base64Next: params.base64ImageSecond
            });
        }
    }

    return new ScreenshotTestError({message: 'Неизвестная ошибка.'});
};

export default compareScreenshots;
