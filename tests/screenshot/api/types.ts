/**
 * Интерфейс продублирован из репозитория с бекендом снятия скриншотов.
 * @prop {number} pixelsCount Количество отличающихся пикселей.
 * @prop {string} base64PngData PNG изображение с отличающимися пикселями в формате Base64.
 */
interface IMatchScreenshotDiffData {
    pixelsCount: number;
    base64PngData: string | null;
}

/**
 * DTO с результатом выполнения функции matchScreenshot.
 * Интерфейс продублирован из репозитория с бекендом снятия скриншотов.
 *
 * @prop {boolean} isSuccess Признак успеха выполненого запроса.
 * @prop {string | null} error Сообщение ошибки.
 * @prop {IMatchScreenshotDiffData} diff Информация о результате сравнения двух изображений.
 */
export interface IMatchScreenshotResponse {
    isSuccess: boolean;
    error: string | null;
    diff: IMatchScreenshotDiffData;
}

/**
 * DTO с результатом выполнения функции takeScreenshot.
 * Интерфейс продублирован из репозитория с бекендом снятия скриншотов.
 *
 * @prop {boolean} isSuccess Признак успеха выполненого запроса.
 * @prop {string | null} error Сообщение ошибки.
 * @prop {string} base64PngData Заснятое PNG изображение.
 */
export interface ITakeScreenshotResponse {
    isSuccess: boolean;
    error: string | null;
    base64PngData: string | null;
}

/**
 * Интерфейс параметров запроса на создание скриншота.
 *
 * @param {string} selector Селектор элемента в DOM дереве.
 * @param {number} selectorDelay Время задержки между открытием страницы и поиском селектора, в миллисекундах.
 * @param {string} url Адрес страницы.
 */
export interface ImakeScreenshotRequestParams {
    selector: string;
    selectorDelay: number;
    url: string;
}

export interface IcompareScreenshotsRequest {
    base64ImageFirst: string;
    base64ImageSecond: string;
}
