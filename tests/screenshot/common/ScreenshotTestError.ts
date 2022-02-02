interface IScreenshotTestErrorError {
    message: string;
    base64Original?: string;
    base64Next?: string;
}

/**
 * Класс, для вывода ошибок в процессе скриншотного тестирования.
 */
class ScreenshotTestError implements IScreenshotTestErrorError {
    message: string;
    base64Original?: string;
    base64Next?: string;

    constructor(props: Pick<IScreenshotTestErrorError, 'message' | 'base64Original' | 'base64Next'>) {
        this.message = props.message;
        this.base64Original = props.base64Original;
        this.base64Next = props.base64Next;
    }
}

export default ScreenshotTestError;
