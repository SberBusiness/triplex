import {DEFAULT_FORMAT_CHARACTERS, DEFAULT_PLACEHOLDER_CHAR} from '@sberbusiness/triplex/desktop/components/MaskedInputDeprecated/consts';
import {IInputMaskDeprecatedCoreConfig, TFormatCharacters} from '@sberbusiness/triplex/desktop/components/MaskedInputDeprecated/types';
import {Pattern} from './MaskedInputPattern';

/**
 * Конфигурация для обработки отдельного символа маски.
 *
 * @prop {Function} validate  Проверка на соответствие символа маске.
 * @prop {Function} transform?  Преобразование символа.
 */
export interface IFormatCharacterConfig {
    validate: (char: string) => boolean;
    transform?: (char: string) => string;
}

/**
 * Модель выделения.
 *
 * @prop {number} start  Начало выделения.
 * @prop {number} end  Окончание выделения (положение каретки).
 */
export interface IInputMaskCoreSelection {
    /** Начало выделения. */
    start: number;
    /** Окончание выделения (положение каретки). */
    end: number;
}

/**
 * Объект конфигурации для установки нового шаблона.
 *
 * @prop {IInputMaskCoreSelection} [selection]  Выделение.
 * @prop {string} [value]  Новый шаблон.
 * @prop {string} [placeholderAsMask]  Символы для заполнения пустых редактируемых позиций в маске.
 */
export interface IInputMaskCoreSetPatternOptions {
    selection?: IInputMaskCoreSelection;
    value?: string;
    placeholderAsMask?: string;
}

/** Тип последней совершённой пользователем операции. */
type TLastOp = null | 'input' | 'backspace' | 'del';

/**
 * Элемент истории изменений.
 *
 * @prop {string} value  Сохранённое значение.
 * @prop {IInputMaskCoreSelection} selection  Сохранённая позиция каретки.
 * @prop {boolean} startUndo  Признак начала отмены.
 * @prop {TLastOp} lastOp  Последняя операция.
 */
interface IInputMaskCoreHistoryItem {
    value: string;
    selection: IInputMaskCoreSelection;
    startUndo: boolean;
    lastOp: TLastOp;
}

/**
 * Поведение маскированого поля ввода.
 *
 * Поскольку оно довольно сложное - решено вынести отдельно, дабы не переплетать код с техническими хендлерами и
 * событиями.
 */
export class MaskedInputDeprecatedBehavior {
    /** Текущее выделение в контроле. */
    public selection: IInputMaskCoreSelection;
    /** Текущий шаблон для работы с текстом. */
    public pattern: Pattern;
    /** Отформатированное по маске пустое значение. */
    public emptyValue: string;
    /** Текущее отформатированное по маске значение. */
    public value: string[];
    /** Текущая отформатированная строка-заполнитель */
    public placeholder: string[];
    /** Символ-заполнитель. */
    private placeholderChar?: string;
    /** Правила обработки символов маски. */
    private formatCharacters?: TFormatCharacters;
    /** История значений. */
    private history: IInputMaskCoreHistoryItem[];
    /** Текущий индекс в истории значений. */
    private historyIndex: number;
    /** Последняя операция. */
    private lastOp: TLastOp;
    /** Последние позиции выделения. */
    private lastSelection: IInputMaskCoreSelection;
    /** Признак замены символов при вводе. */
    private readonly overtype: boolean;
    /** Функция-валидатор значения (при невалидном вводе значение поля и положение каретки не изменится). */
    private readonly validate?: (value: string) => boolean;

    constructor(config: IInputMaskDeprecatedCoreConfig) {
        this.validate = config.validate;
        this.overtype = config.overtype || false;
        this.setPlaceholderChar(config.placeholderChar);
        this.setFormatCharacters(config.formatCharacters);
        this.pattern = new Pattern(config.pattern, this.formatCharacters, this.placeholderChar, config.placeholderAsMask);
        this.value = this.pattern.formatValue((config.value || '').split(''));
        this.placeholder = this.pattern.formatPlaceholderValue(this.value);
        this.emptyValue = this.pattern.formatValue([]).join('');
        this.selection = config.selection || {start: 0, end: 0};
        this.history = [];
        this.historyIndex = -1;
        this.lastOp = null;
        this.lastSelection = config.selection || {start: 0, end: 0};
    }

    /**
     * Возвращает истину в случае если редактируемые символы в значении заполнены не все.
     */
    public isIncomplete(): boolean {
        if (this.value.length !== this.pattern.length) {
            return true;
        }
        for (let i = 0, l = this.value.length; i < l; i++) {
            if (this.pattern.isEditableIndex(i) && this.value[i] === this.pattern.getPlaceholderChar(i)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Применяет ввод символа, ориентируясь на текущее положение каретки.
     *
     * @param {string} char Вводимый символ.
     * @return {boolean} Возвращает true, если ввод символа вызвал изменения в итоговом значении либо
     * положении каретки.
     */
    public input(char: string): boolean {
        // Игнорировать ввод, если курсор стоит в конце шаблона.
        if (this.selection.start === this.selection.end && this.selection.start === this.pattern.length) {
            return false;
        }

        const selectionBefore = {start: this.selection.start, end: this.selection.end};
        const valueBefore = this.getValue();

        let i = this.selection.start;

        // Если мы вручную ввели символ шаблона, то просто сдвинемся на 1 символ вправо.
        if (this.selection.start === this.selection.end && !this.pattern.isEditableIndex(i) && this.value[i] === char) {
            this.selection.start = this.selection.end = i + 1;
            return true;
        } else if (!this.pattern.isEditableIndex(i) && this.value[i] === char) {
            this.selection.start++;
            return true;
        }

        for (let l = this.value.length; i < l; i++) {
            if (this.pattern.isEditableIndex(i)) break;
        }

        // Отменяем либо добавляем вводимый символ.
        if (!this.pattern.isValidAtIndex(char, i)) {
            return false;
        }
        // Дальше нам нужна копия значения, поскольку с ним могут происходить изменения, а в конце окажется, что оно невалидно.
        let value = this.value;

        // Если не нужно сохранять позиции символов и нет режима замены, то необходимо всё введённое сдвинуть вправо.
        value.splice(i, this.selection.end - this.selection.start + +this.overtype, char);
        value = this.pattern.formatValue(value);
        // Если есть валидатор, то проверим получающееся значение, и отменим в случае несоответствия.
        if (this.validate) {
            // Если значение неполное - очевидно, что оно не валидно, но позволить вводить нужно.
            if (!this.isIncomplete() && !this.validate(value.join(''))) {
                return false;
            }
        }
        this.value = value;

        // Перемещение курсора к следующему символу.
        this.selection.start = this.selection.end = i + 1;

        // Пропустить все последующие статические символы.
        while (this.pattern.length > this.selection.start && !this.pattern.isEditableIndex(this.selection.start)) {
            this.selection.start++;
            this.selection.end++;
        }

        // История изменений.
        if (this.historyIndex !== -1) {
            // Ввёл ещё что-то после отмены, так что удаляем последующую историю.
            this.history.splice(this.historyIndex, this.history.length - this.historyIndex);
            this.historyIndex = -1;
        }
        if (
            this.lastOp !== 'input' ||
            selectionBefore.start !== selectionBefore.end ||
            (this.lastSelection !== null && selectionBefore.start !== this.lastSelection.start)
        ) {
            this.history.push({value: valueBefore, selection: selectionBefore, lastOp: this.lastOp, startUndo: false});
        }
        this.lastOp = 'input';
        this.lastSelection = {
            end: this.selection.end,
            start: this.selection.start,
        };

        return true;
    }

    public del(): boolean {
        // Нельзя ничего удалить в конце значения или поле пустое (чтобы не удалять маску).
        if (
            (this.selection.start === this.selection.end && this.selection.start === this.value.length) ||
            this.value.length === this.emptyValue.length
        ) {
            return false;
        }
        // Запоминаем состояние для истории изменений.
        const selectionBefore = {
            end: this.selection.end,
            start: this.selection.start,
        };
        const valueBefore = this.getValue();

        // Нет выделенного диапазона, потому работаем с символом после курсора.
        if (this.selection.start === this.selection.end) {
            let i = this.selection.start;

            // Сначала пропустим все шаблонные символы справа.
            for (let l = this.value.length; i < l; i++) {
                if (this.pattern.isEditableIndex(i)) {
                    break;
                }
            }

            // Если справа нет редактируемых символов.
            if (!this.pattern.isEditableIndex(i)) {
                return false;
            }

            // Перебрасываем курсор к первому редактируемому символу.
            this.selection.start = this.selection.end = i;
            this.shift(this.selection.start);
        }
        // Если диапазон выбран - удаляем все символы и оставляем курсор в конце выделения.
        else {
            this.clearSelected(this.selection.start, this.selection.end);
        }

        // История.
        if (this.historyIndex !== -1) {
            // Значение изменено после отмены, так что удаляем последующую историю.
            this.history.splice(this.historyIndex, this.history.length - this.historyIndex);
        }
        if (
            this.lastOp !== 'del' ||
            selectionBefore.start !== selectionBefore.end ||
            (this.lastSelection !== null && selectionBefore.start !== this.lastSelection.start)
        ) {
            this.history.push({value: valueBefore, selection: selectionBefore, lastOp: this.lastOp, startUndo: false});
        }
        this.lastOp = 'del';
        this.lastSelection = {
            end: this.selection.end,
            start: this.selection.start,
        };

        return true;
    }

    /**
     * Пытаемся удалить символ относительно текущей позиции курсора(выделения) для текущего значения.
     *
     * @return {boolean} Возвращает true, если в результате значение было изменено.
     */
    public backspace(): boolean {
        // Если курсор в начале значения или поле пусто (чтобы не удалять маску), то ничего не делаем.
        if ((!this.selection.start && !this.selection.end) || this.selection.end <= this.pattern.firstEditableIndex) {
            return false;
        }

        const selectionBefore = {
            start: this.selection.start,
            end: this.selection.end,
        };
        const valueBefore = this.getValue();

        // Нет выделенного диапазона, потому работаем с символом перед курсором.
        if (this.selection.start === this.selection.end) {
            if (this.pattern.isEditableIndex(this.selection.start - 1)) {
                this.shift(this.selection.start - 1);
            }
            this.selection.start--;
            this.selection.end--;
        }
        // Если диапазон выбран - удаляем все символы и оставляем курсор в начале выделения.
        else {
            this.clearSelected(this.selection.start, this.selection.end);
        }

        // История.
        if (this.historyIndex !== -1) {
            // Значение изменено после отмены, так что удаляем последующую историю.
            this.history.splice(this.historyIndex, this.history.length - this.historyIndex);
        }
        if (
            this.lastOp !== 'backspace' ||
            selectionBefore.start !== selectionBefore.end ||
            (this.lastSelection !== null && selectionBefore.start !== this.lastSelection.start)
        ) {
            this.history.push({value: valueBefore, selection: selectionBefore, lastOp: this.lastOp, startUndo: false});
        }
        this.lastOp = 'backspace';
        this.lastSelection = {
            end: this.selection.end,
            start: this.selection.start,
        };
        return true;
    }

    /**
     * Пробуем вставить строку в поле ввода в текущую позицию курсора, либо поверх выделения.
     * Недопустимые символы приведут к отклонению вставляемого значения.
     *
     * @param {string} input Вставляемое значение.
     * @return {boolean} Возвращает true, если вставка удалась.
     */
    public paste(input: string): boolean {
        // Запоминаем исходное состояние, для отката в случае некорректного ввода.
        const initialState = {
            history: this.history.slice(),
            historyIndex: this.historyIndex,
            lastOp: this.lastOp,
            lastSelection: {
                end: this.lastSelection.end,
                start: this.lastSelection.start,
            },
            selection: {
                end: this.selection.end,
                start: this.selection.start,
            },
            value: this.value.slice(),
        };

        let count = 0;

        for (let i = 0, l = input.length; i < l && this.selection.start <= this.pattern.lastEditableIndex; i++) {
            if (this.input(input.charAt(i))) {
                count++;
            }
        }

        //Если не было вставлено ни одно значение, тогда откатываем в исходное состояние и возвращаем false
        if (this.selection.start > this.pattern.lastEditableIndex && !count) {
            this.value = initialState.value;
            this.selection = initialState.selection;
            this.lastOp = initialState.lastOp;
            this.history = initialState.history;
            this.historyIndex = initialState.historyIndex;
            this.lastSelection = initialState.lastSelection;
            return false;
        }

        return true;
    }

    /**
     * Шаг назад по истории изменений.
     *
     * @return {boolean} Удалось ли выполнить.
     */
    public undo(): boolean {
        // Если история пуста, либо мы дошли до дна стека, то мы уже не можем отменить.
        if (this.history.length === 0 || this.historyIndex === 0) {
            return false;
        }

        let historyItem: IInputMaskCoreHistoryItem;
        if (this.historyIndex === -1) {
            // Нет состояния отмены, устанавливаем инициализированное значение индекса.
            this.historyIndex = this.history.length - 1;
            historyItem = this.history[this.historyIndex];
            // Добавляем новую запись истории, если с момента последнего изменения ничего не изменилось,
            // то мы, можем вернуться к исходному состоянию, из которого мы начали отменять.
            const value = this.getValue();
            if (historyItem.selection.start !== this.selection.start || historyItem.selection.end !== this.selection.end) {
                const {start, end} = this.selection;
                this.history.push({value, selection: {start, end}, lastOp: this.lastOp, startUndo: true});
            }
        } else {
            historyItem = this.history[--this.historyIndex];
        }

        this.value = historyItem.value.split('');
        this.selection = historyItem.selection;
        this.lastOp = historyItem.lastOp;
        return true;
    }

    /**
     * Шаг вперёд по истории изменений.
     *
     * @return {boolean} Удалось ли выполнить.
     */
    public redo(): boolean {
        if (this.history.length === 0 || this.historyIndex === -1) {
            return false;
        }
        const historyItem = this.history[++this.historyIndex];
        // If this is the last history item, we're done redoing
        if (this.historyIndex === this.history.length - 1) {
            this.historyIndex = -1;
            // If the last history item was only added to start undoing, remove it
            if (historyItem.startUndo) {
                this.history.pop();
            }
        }
        this.value = historyItem.value.split('');
        this.selection = historyItem.selection;
        this.lastOp = historyItem.lastOp;
        return true;
    }

    /**
     * Установка новой маски форматирования.
     *
     * @param {string} pattern Маска.
     * @param {IInputMaskCoreSetPatternOptions} options Дополнительные параметры.
     */
    public setPattern(
        pattern: string,
        {selection = {start: 0, end: 0}, value = '', placeholderAsMask}: IInputMaskCoreSetPatternOptions
    ): void {
        this.pattern = new Pattern(pattern, this.formatCharacters, this.placeholderChar, placeholderAsMask);
        this.setValue(value);
        this.emptyValue = this.pattern.formatValue([]).join('');
        this.selection = selection;
        this.resetHistory();
    }

    /**
     * Установка нового символа - заполнителя.
     *
     * @param {string} placeholderChar Символ - заполнитель.
     */
    public setPlaceholderChar(placeholderChar: string = DEFAULT_PLACEHOLDER_CHAR): void {
        if (placeholderChar.length !== 1) {
            throw new Error('InputMaskCore: placeholderChar should be a single character.');
        }
        this.placeholderChar = placeholderChar;
    }

    /**
     * Установка настроек маски.
     *
     * @param {TFormatCharacters} formatCharacters Конфигурация для работы с маской.
     */
    public setFormatCharacters(formatCharacters: TFormatCharacters = DEFAULT_FORMAT_CHARACTERS): void {
        const merged: TFormatCharacters = {...DEFAULT_FORMAT_CHARACTERS, ...formatCharacters};
        const chars = Object.keys(merged);
        for (let i = 0, n = chars.length; i < n; i++) {
            const char = chars[i];
            if (!merged[char] || typeof merged[char].validate !== 'function') {
                delete merged[char];
            }
        }
        this.formatCharacters = merged;
    }

    /**
     * Установка нового значения.
     *
     * @param {string} value Новое значение.
     */
    public setValue(value: string): void {
        if (value == null) {
            value = '';
        }
        let newValue = this.pattern.formatValue(value.split(''));
        if (!this.isIncomplete() && this.validate && !this.validate(newValue.join(''))) {
            newValue = this.value;
        }
        this.value = newValue;
        this.placeholder = this.pattern.formatPlaceholderValue(newValue);
    }

    /**
     * Получить текущее значение после обработки фильтром.
     *
     * @returns {string} Текущее значение после обработки фильтром.
     */
    public getValue(): string {
        return this.value.join('');
    }

    public getPlaceholderValue(): string {
        return this.placeholder.join('');
    }

    /**
     * Получить текущее значение без обработки по маске.
     *
     * @returns {string} Текущее значение без обработки по маске.
     */
    public getRawValue(): string {
        return this.pattern.getRawValue(this.value);
    }

    /**
     * Возвращает первую позицию, на которую можно поставить курсор для продолжения ввода.
     */
    public getFirstFreePosition(): number {
        return this.emptyValue.length;
    }

    /**
     * Удаляем все символы и оставляем курсор в начале выделения или у первого редактируемого символа.
     */
    private clearSelected(start: number, end: number) {
        const value = this.value;

        value.splice(start, end - start);
        if (this.selection.start <= this.pattern.firstEditableIndex) {
            this.selection.start = this.pattern.firstEditableIndex;
        }
        this.selection.end = this.selection.start;
        this.value = this.pattern.formatValue(value);
    }

    /**
     * При отсутствии режима сохранения позиций символов сдвигаем правую часть влево, добавив заполнитель справа.
     *
     * @param {number} start Позиция, с которой начинать сдвиг.
     */
    private shift(start: number) {
        const value = this.value;

        value.splice(start, 1);
        this.value = this.pattern.formatValue(value);
    }

    /**
     * Сбросить историю изменений.
     */
    private resetHistory() {
        const {start, end} = this.selection;

        this.history = [];
        this.historyIndex = -1;
        this.lastOp = null;
        this.lastSelection = {start, end};
    }
}
