import * as React from 'react';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import {CaretdownSrvxIcon16} from '@sberbusiness/icons/CaretdownSrvxIcon16';
import {SpinnersmallAniIcon20} from '@sberbusiness/icons/SpinnersmallAniIcon20';
import {EVENT_KEY_CODES} from '../../../utils/keyboard';
import {TestProps} from '@sbbol/web-library/desktop/common/types/CoreTypes';
import {TestIds} from '@sbbol/web-library/common/dataTestIds/dataTestIds';

/**
 * Свойства SelectExtendedTarget.
 *
 * @prop {boolean} [disabled] Элемент неактивен.
 * @prop {boolean} [error] Элемент с ошибкой.
 * @prop {React.ReactNode} [label] Текст, или компонент отображающий выбранное значение.
 * @prop {boolean} [loading] Элемент в состоянии загрузки.
 * @prop {boolean} [opened] Флаг открытости выпадающего списка.
 * @prop {boolean} [placeholder] Текст, или компонент отображающий выбранное placeholder.
 * @prop {Function} setOpened Функция открытия/закрытия выпадающего списка.
 */
export interface ISelectExtendedTargetProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'placeholder'>, TestProps {
    disabled?: boolean;
    error?: boolean;
    label?: React.ReactNode;
    loading?: boolean;
    opened: boolean;
    placeholder?: React.ReactNode;
    setOpened: (opened: boolean) => void;
}

/**
 * Компонент SelectTarget.
 * Видимая часть Select, при нажатии на которую открывается выпадающий список.
 */
export class SelectExtendedTarget extends React.Component<ISelectExtendedTargetProps> {
    private containerNode: HTMLDivElement | undefined;

    public componentDidUpdate(prevProps: ISelectExtendedTargetProps): void {
        const {opened: prevOpened} = prevProps;
        const {opened} = this.props;

        if (opened && !prevOpened) {
            this.containerNode?.focus();
        }
    }

    private getTabIndex = (): number => {
        const {disabled, tabIndex} = this.props;
        return disabled ? -1 : tabIndex || 0;
    };

    public render(): JSX.Element {
        const {className, disabled, error, label, loading, opened, placeholder} = this.props;
        const dataTestId = this.props['data-test-id'];

        return (
            <div
                className={classnames('cssClass[selectExtendedTarget]', className, {
                    'cssClass[disabled]': Boolean(disabled),
                    'cssClass[error]': Boolean(error),
                    'cssClass[loading]': Boolean(loading),
                    'cssClass[placeholder]': Boolean(placeholder) && !label,
                    'cssClass[selectOpened]': Boolean(opened),
                })}
                ref={this.setContainerNode}
                tabIndex={this.getTabIndex()}
                title={this.getTitleAttr()}
                aria-expanded={Boolean(opened)}
                aria-haspopup="listbox"
                role="button"
                {...this.getHtmlDivAttributes()}
                onClick={this.handleClick}
                onKeyDown={this.handleKeyDown}
            >
                <div
                    className="cssClass[label]"
                    data-test-id={
                        dataTestId && `${dataTestId}${label ? TestIds.SelectButton.selected_text : TestIds.SelectViewWrapper.placeholder}`
                    }
                >
                    {label || placeholder}
                </div>

                {loading ? (
                    <SpinnersmallAniIcon20 className={classnames('cssClass[spinnerIcon]', 'cssClass[theme__default_spin]')} />
                ) : (
                    <CaretdownSrvxIcon16
                        className={classnames('cssClass[caretIcon]', 'hoverable', {
                            disabled: Boolean(disabled),
                        })}
                    />
                )}
            </div>
        );
    }

    private getHtmlDivAttributes = () => {
        const {
            children,
            className,
            disabled,
            error,
            label,
            loading,
            opened,
            placeholder,
            setOpened,
            tabIndex,
            ...htmlDivAttributes
        } = this.props;

        return htmlDivAttributes;
    };

    /**
     * Возвращает HTML-атрибут title.
     */
    private getTitleAttr = (): string | undefined => {
        const {label, placeholder} = this.props;

        if (!label && placeholder && typeof placeholder === 'string') {
            return placeholder;
        }

        if (typeof label === 'string') {
            return label;
        }
    };

    private handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const {onClick, opened, setOpened} = this.props;

        setOpened(!opened);

        if (onClick) {
            onClick(event);
        }
    };

    private handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        const {onKeyDown, opened, setOpened} = this.props;

        if (!opened) {
            // При нажатии Enter, Space, ArrowUp или ArrowDown открывается выпадающий список.
            if (
                [EVENT_KEY_CODES.SPACE, EVENT_KEY_CODES.ENTER, EVENT_KEY_CODES.ARROW_DOWN, EVENT_KEY_CODES.ARROW_UP].includes(event.keyCode)
            ) {
                event.preventDefault();
                setOpened(!opened);
            }
        }

        if (onKeyDown) {
            onKeyDown(event);
        }
    };

    private setContainerNode = (node: HTMLDivElement) => (this.containerNode = node);
}
