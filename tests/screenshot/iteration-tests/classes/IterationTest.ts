import makeScreenshot, {ImakeScreenshotParams} from '../../common/makeScreenshot';
import config from '../../common/config';
import ScreenshotTestError from '../../common/ScreenshotTestError';
import path from 'path';
import checkDirIfExistSync from '../../common/checkDirIfExistSync';
import compareScreenshots, {IcompareScreenshots} from '../../common/compareScreenshots';
import fs from 'fs';
const fsPromises = fs.promises;

// Формат сохраненных снимков.
const SAVED_IMAGE_EXT = 'png';

/**
 * Результат теста.
 */
export enum IterationTestResult {
    PASS,
    FAIL,
}

/**
 * Конструктор IterationTest.
 */
interface IIterationTestConstructor {
    // ID или имя компонента.
    componentId: string;
    // ID состояния, в папке компонента(componentId) хранятся изображения всех его состояний.
    stateId?: string;
    // Селектор элемента, снимок которого требуется сделать.
    selector?: string;
    // Задержка перед поиском селектора. Например для компонентов с анимацией, в миллисекундах.
    selectorDelay?: number;
    // Pathname страницы компонента в Styleguidist. Например - /#!/Components/ButtonGeneralMD.
    pathname: string;
}

/**
 * Результат запуска теста.
 */
export interface IIterationTestResult {
    base64Original: string;
    base64Next: string;
    base64Diff: string;
    result: IterationTestResult;
}

/**
 * Класс, реализующий работу со скриншот тестами при разработке.
 * Делает снимок компонента, сохраняет его, при последующем запуске сравнивает новое и предыдущее изображения.
 */
class IterationTest {
    // Путь к папке, в которой хранятся изображения.
    screenshotsDirPath: string;
    nextImageBase64?: string;
    prevImageBase64?: string;
    // ID или имя компонента.
    componentId: string;
    // ID состояния, в папке компонента(componentId) хранятся изображения всех его состояний.
    stateId: string;
    // Селектор элемента, снимок которого требуется сделать.
    selector: string;
    // Задержка перед поиском селектора. Например для компонентов с анимацией, в миллисекундах.
    selectorDelay: number;
    // Pathname страницы компонента в Styleguidist. Например - /#!/Components/ButtonGeneralMD.
    pathname: string;

    constructor({componentId, stateId, selector = config.styleguidist.defaultSelector, selectorDelay = 0, pathname}: IIterationTestConstructor) {
        this.componentId = componentId;
        this.nextImageBase64 = undefined;
        this.prevImageBase64 = undefined;
        this.selector = selector;
        this.selectorDelay = selectorDelay;
        this.pathname = pathname;
        this.stateId = stateId || 'Default';
        this.screenshotsDirPath = this.getScreenshotsDirSync();
    }

    /**
     * Возвращает результат сравнения скриншотов.
     */
    public compareScreenShots = (params: IcompareScreenshots): Promise<string | null | ScreenshotTestError> => compareScreenshots(params);

    /**
     * Удалить предыдущее изображение.
     */
    // private deletePrevImage = async (): Promise<boolean> => {
    //     try {
    //         await fsPromises.unlink(`${this.screenshotsDirPath}/${this.componentId}`);
    //         return true;
    //     } catch (error) {
    //         return false;
    //     }
    // };

    /**
     * Запуск теста.
     */
    public run: () => Promise<IIterationTestResult | ScreenshotTestError> = async () => {
        // Снимок компонента.
        const nextImageBase64 = await this.makeScreenshot({
            selector: this.selector,
            selectorDelay: this.selectorDelay,
            url: `${config.styleguidist.serverURL}${this.pathname}`,
        });

        // Результат теста.
        const testResult: IIterationTestResult = {
            base64Diff: '',
            base64Original: '',
            base64Next: '',
            result: IterationTestResult.PASS,
        };

        // nextImageBase64 равен null, такого кейса быть не должно, условие - чтобы TS ниже в коде понимал, что nextImageBase64 !== null.
        if (!nextImageBase64) {
            testResult.result = IterationTestResult.FAIL;
            return testResult;
        } else if (nextImageBase64 instanceof ScreenshotTestError) {
            // Снимок компонента завершился ошибкой.
            return nextImageBase64;
        }

        // nextImageBase64! - Проверка на string реализована, TS не распознал.
        this.nextImageBase64 = nextImageBase64;
        testResult.base64Next = this.nextImageBase64;

        // Снимок предыдущего состояния компонента.
        const prevImageBase64 = await this.readPrevImageBase64();

        if (prevImageBase64) {
            testResult.base64Original = prevImageBase64;

            const compareResult = await this.compareScreenShots({
                base64ImageFirst: prevImageBase64,
                base64ImageSecond: this.nextImageBase64,
            });

            // Снимок компонента завершился ошибкой.
            if (compareResult instanceof ScreenshotTestError) {
                return compareResult;
            }

            // Изображения разные, возвращается diff.
            if (compareResult) {
                testResult.base64Diff = compareResult;
                testResult.result = IterationTestResult.FAIL;
            }

            // Изображения одинаковые.
            return testResult;
        } else {
            // Сохранение изображения.
            if (await this.writeImage(this.nextImageBase64)) {
                return testResult;
            } else {
                return new ScreenshotTestError({message: 'Не удалось сохранить изображение на диск.'});
            }
        }
    };

    /**
     * Считывает предыдущее изображение.
     */
    public readPrevImageBase64: () => Promise<string | undefined> = async () => {
        try {
            return await fsPromises.readFile(`${this.screenshotsDirPath}/${this.stateId}.${SAVED_IMAGE_EXT}`, {encoding: 'base64'});
        } catch (error) {
            return undefined;
        }
    };

    /**
     * Делает скриншот.
     */
    public makeScreenshot = (params: ImakeScreenshotParams): Promise<string | null | ScreenshotTestError> => makeScreenshot(params);

    /**
     * Возвращает путь директории к скриншотам компонента. Если директории нет - создает ее.
     */
    private getScreenshotsDirSync = (): string => {
        const screenshotsDirPath = path.resolve(__dirname, `../${config.pictureStorage.iterationTestsImagesFolder}/${this.componentId}`);
        if (!checkDirIfExistSync(screenshotsDirPath)) {
            fs.mkdirSync(screenshotsDirPath, {recursive: true});
        }
        return screenshotsDirPath;
    };

    /**
     * Сохраняет изображение.
     */
    private writeImage: (imageBase64: string) => Promise<boolean> = async (imageBase64) => {
        try {
            await fsPromises.writeFile(`${this.screenshotsDirPath}/${this.stateId}.${SAVED_IMAGE_EXT}`, imageBase64, {encoding: 'base64'});
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };
}

export default IterationTest;
