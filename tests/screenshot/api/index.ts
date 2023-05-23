import {AxiosResponse} from 'axios';
import {IcompareScreenshotsRequest, ImakeScreenshotRequestParams, IMatchScreenshotResponse, ITakeScreenshotResponse} from './types';
import config from '../common/config';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: config.screenshotServerURL,
});

const apiRoutes = {
    compareScreenshots: '/screenshot/match',
    makeScreenshot: '/screenshot/take',
};

/**
 * Запрос создания скриншота.
 */
export const makeScreenshotRequest = (data: ImakeScreenshotRequestParams): Promise<AxiosResponse<ITakeScreenshotResponse>> =>
    axiosInstance.post(apiRoutes.makeScreenshot, data);
/**
 * Запрос сравнения скриншотов.
 */
export const compareScreenshotsRequest = (data: IcompareScreenshotsRequest): Promise<AxiosResponse<IMatchScreenshotResponse>> =>
    axiosInstance.post(apiRoutes.compareScreenshots, data);
