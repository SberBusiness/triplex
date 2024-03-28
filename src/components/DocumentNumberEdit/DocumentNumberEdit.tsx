import React from 'react';
import ReactDOM from 'react-dom';
import {KeyDownListener} from '@sberbusiness/triplex/components/KeyDownListener/KeyDownListener';
import {ISmallInputProps, SmallInput} from '@sberbusiness/triplex/components/SmallInput/SmallInput';
import {EVENT_KEY_CODES} from '@sberbusiness/triplex/utils/keyboard';
import {focusButton} from '@sberbusiness/triplex/components/Button/utils';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента DocumentNumberEdit. */
export interface IDocumentNumberEditProps extends Omit<ISmallInputProps, 'onChange' | 'value'> {
    /** Номер документа. */
    value?: number;
    /** Текст кнопки "Изменить". По умолчанию - "Изменить". */
    buttonLabel: string;
    /** Текст кнопки "Изменить" при отсутствии номера. По умолчанию - "Задать номер". */
    emptyNumberButtonLabel: string;
    /** Текст перед номером, при отсутствии номера. По умолчанию - "Номер документа будет присвоен автоматически". */
    emptyNumberLabel: string;
    /** Текст перед номером. По умолчанию - "Документ №". */
    numberLabel: string;
    /** Обработчик изменения номера. */
    onChange: (value?: number) => void;
}

/** Состояния компонента DocumentNumberEdit. */
interface IDocumentNumberEditState {
    /** Номер редактируется в текущий момент. */
    isEdit: boolean;
}

// Data-атрибут для поиска по DOM дереву.
const DATA_INPUT_SELECTOR_ID = 'document-number-edit-input';
// Максимальное число символов.
const INPUT_MAX_LENGTH = 6;

/** Компонент редактирования номера документа. */
export class DocumentNumberEdit extends React.Component<IDocumentNumberEditProps, IDocumentNumberEditState> {
    public static displayName = 'DocumentNumberEdit';

    public state: IDocumentNumberEditState = {
        isEdit: false,
    };

    public componentDidUpdate(prevProps: IDocumentNumberEditProps, prevState: IDocumentNumberEditState): void {
        if (this.state.isEdit && !prevState.isEdit) {
            setTimeout(this.setInputFocus, 100);
        }
    }

    public render(): React.ReactNode {
        const {
            buttonLabel,
            className,
            emptyNumberButtonLabel,
            emptyNumberLabel,
            maxLength = INPUT_MAX_LENGTH,
            numberLabel,
            onChange,
            value,
            ...smallInputProps
        } = this.props;
        const {isEdit} = this.state;
        const buttonText = value ? buttonLabel : emptyNumberButtonLabel;
        const labelText = this.renderLabel();

        return (
            <div className={classnames('cssClass[documentNumberEdit]', className)}>
                <span className="cssClass[label]">{labelText}</span>

                {isEdit ? (
                    <KeyDownListener onMatch={this.endEdit} eventKeyCode={EVENT_KEY_CODES.ENTER}>
                        <KeyDownListener onMatch={this.handleEsc} eventKeyCode={EVENT_KEY_CODES.ESCAPE}>
                            <div className="cssClass[inputEditWrapper]">
                                <SmallInput
                                    {...smallInputProps}
                                    value={value || ''}
                                    placeholder="000000"
                                    maxLength={maxLength}
                                    data-selector-id={DATA_INPUT_SELECTOR_ID}
                                    onBlur={this.handleBlur}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </KeyDownListener>
                    </KeyDownListener>
                ) : (
                    <button type="button" className="cssClass[buttonEdit]" onClick={this.startEdit} onMouseDown={focusButton}>
                        <span className="cssClass[buttonEditInner]">{buttonText}</span>
                    </button>
                )}
            </div>
        );
    }

    private endEdit = () => this.setState({isEdit: false});

    private handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const {onBlur} = this.props;
        this.endEdit();

        if (onBlur) {
            onBlur(event);
        }
    };

    private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        const {onChange} = this.props;

        if (value) {
            const nextValue = parseInt(value, 10);
            if (!isNaN(nextValue)) {
                onChange(nextValue);
            }
        } else {
            onChange();
        }
    };

    private handleEsc = (event: KeyboardEvent) => {
        // Фикс IE. Там стирается текущее значение инпута при клике на Esc.
        if (this.state.isEdit) {
            event.preventDefault();
        }
    };

    private renderLabel = (): string => {
        const {isEdit} = this.state;
        const {emptyNumberLabel, numberLabel, value} = this.props;
        let labelText = emptyNumberLabel;

        if (isEdit) {
            labelText = numberLabel;
        } else if (value) {
            labelText = `${numberLabel} ${value}`;
        }

        return labelText;
    };

    private setInputFocus = () => {
        // eslint-disable-next-line react/no-find-dom-node
        const rootNode = ReactDOM.findDOMNode(this) as HTMLDivElement;
        const input = rootNode.querySelector<HTMLInputElement>(`input[data-selector-id=${DATA_INPUT_SELECTOR_ID}]`);
        if (input) {
            input.focus();
        }
    };

    private startEdit = () => this.setState({isEdit: true});
}
