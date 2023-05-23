import * as React from 'react';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {AccordionFormItemTitle} from '@sberbusiness/triplex/desktop/components/AccordionForm/AccordionFormItemTitle';
import {AccordionFormItemContent} from '@sberbusiness/triplex/desktop/components/AccordionForm/AccordionFormItemContent';
import {AccordionFormItemFooter} from '@sberbusiness/triplex/desktop/components/AccordionForm/AccordionFormItemFooter';
import {Step} from '@sberbusiness/triplex/desktop/components/Step/Step';
import {EStepPosition, EStepStatus} from '@sberbusiness/triplex/desktop/components/Step/enums';
import {ButtonIcon} from '@sberbusiness/triplex/desktop/components/Button/ButtonIcon';
import {CaretdownSrvxIcon16} from '@sberbusiness/icons/CaretdownSrvxIcon16';
import {ClearSrvIcon16} from '@sberbusiness/icons/ClearSrvIcon16';
import {uniqueId} from '@sberbusiness/triplex/common/utils/uniqueId';
import {ExpandAnimation} from '@sberbusiness/triplex/common/components/ExpandAnimation/ExpandAnimation';
import {focusButton} from '@sberbusiness/triplex/desktop/components/Button/utils';

/**
 * Свойства компонента элемента аккордеона.
 *
 * @prop {string} [id] Идентификатор вкладки (если не передать извне, то используется индекс. Также используется как ключ при рендере списка вкладок).
 * @prop {number} [num] Цифра в кружке.
 * @prop {boolean} [opened] Раскрыт ли элемент.
 * @prop {EStepStatus} [status] Статус шага.
 * @prop {string} [stepHint] Подсказка к шагу.
 * @prop {boolean} [disabled] Заблокирован ли элемент.
 * @prop {Function} [onToggle] Вызывается при клике по вкладке.
 *
 * Дальше аттрибуты передаются родителем, снаружи передавать не нужно.
 * @prop {EStepStatus} [prevStatus] Статус предыдущей вкладки.
 * @prop {EStepStatus} [nextStatus] Статус следующей вкладки.
 */
export interface IAccordionItemProps extends Omit<React.HTMLAttributes<HTMLLIElement>, 'title'> {
    title: React.ReactNode;
    id?: string;
    num?: number;
    opened?: boolean;
    status?: EStepStatus;
    stepHint?: string;
    disabled?: boolean;
    onToggle?: (newOpened: boolean, id: string) => void;
    onRemove?: (id: string) => void;
    prevStatus?: EStepStatus;
    nextStatus?: EStepStatus;
}

/**
 * Сосотояние компонента элемента аккордеона.
 *
 * @prop {boolean} opened Компонент развёрнут.
 * @prop {boolean} focused Компонент в данный момент в фокусе.
 * @prop {boolean} focusedByMouse Фокус компонента вызван мышью.
 * @prop {boolean} headerFocused Фокус в данный момент именнно на заголовке компонента.
 */
export interface IAccordionItemState {
    isOpen: boolean;
    focused: boolean;
    focusedByMouse: boolean;
    headerFocused: boolean;
}

/**
 * Мапа статуса шага в класс CSS.
 */
const mapStepStatusToCssClass = {
    [EStepStatus.WAIT]: 'cssClass[wait]',
    [EStepStatus.WARNING]: 'cssClass[warning]',
    [EStepStatus.ERROR]: 'cssClass[error]',
    [EStepStatus.SUCCESS]: 'cssClass[success]',
    [EStepStatus.DISABLED]: 'cssClass[disabled]',
};

/**
 * Компонент элемента аккордеона.
 *
 * Необходимо пояснение:
 * Для корректной отработки анимации закрытия приходится не удалять контент до тех пор, пока анимация не закончится.
 * Если контент удалить сразу, то вкладка аккордеона схлопнется мгновенно и никакой анимации не будет.
 *
 * При открытии такого не нужно, поскольку контент появляется сразу же и тянет контейнер до нужного размера,
 * в результате чего тот анимированно раскрывается.
 */
export class AccordionFormItem extends React.Component<IAccordionItemProps, IAccordionItemState> {
    public static displayName = 'AccordionFormItem';
    public static Title = AccordionFormItemTitle;
    public static Content = AccordionFormItemContent;
    public static Footer = AccordionFormItemFooter;

    state: IAccordionItemState = {
        isOpen: this.props.opened || false,
        focused: false,
        focusedByMouse: false,
        headerFocused: false,
    };
    private instanceId = uniqueId();
    private headerInstanceId = `${this.instanceId}header`;
    private bodyInstanceId = `${this.instanceId}body`;
    private mousePressed = false;
    private needBlur = false;

    componentDidMount(): void {
        this.handlePropsUpdated();
    }

    public componentDidUpdate(): void {
        this.handlePropsUpdated();
    }

    /**
     * Обработчик изменения свойств объекта.
     */
    private handlePropsUpdated = (): void => {
        const {opened} = this.props;
        // Если управление снаружи, и внутреннее состояние не соответсвует флагу, то просто меняем внутреннее сосотояние.
        if (opened !== undefined && this.state.isOpen !== opened) {
            this.setState({isOpen: opened});
        }
    };

    /**
     * Обработчик клика по заголовку.
     */
    private handleHeaderClick = (): void => {
        const {onToggle, opened, id, disabled} = this.props;
        if (disabled) {
            return;
        }
        const newOpened = !this.state.isOpen;
        onToggle?.(newOpened, id!);

        // Если в пропсах не передавали состояния, значит мы полностью базируемся на внутреннем.
        if (opened === undefined) {
            this.setState({isOpen: newOpened});
        }
    };

    /**
     * Обработчик клика по кнопке удаления.
     */
    private handleRemoveClick = (): void => {
        const {onRemove, id, disabled} = this.props;
        if (disabled) {
            return;
        }
        onRemove?.(id!);
    };

    private handleFocus = (): void => {
        if (this.mousePressed) {
            this.needBlur = false;
        }
        this.setState({focused: true});
    };

    private handleBlur = (event: React.FocusEvent<HTMLLIElement>): void => {
        if (this.mousePressed) {
            this.needBlur = true;
        } else {
            if (event.target !== document.activeElement) {
                this.setState({focused: false, focusedByMouse: false, headerFocused: false});
            }
        }
    };

    private handleMouseDown = (): void => {
        this.mousePressed = true;
        this.setState({focusedByMouse: true});
    };

    private handleMouseUp = (): void => {
        this.mousePressed = false;
        if (this.needBlur) {
            this.needBlur = false;
            this.setState({focused: false, focusedByMouse: false, headerFocused: false});
        } else {
            this.setState({focusedByMouse: true});
        }
    };

    private handleHeaderFocus = (): void => {
        this.setState({headerFocused: true});
    };

    private handleHeaderBlur = (): void => {
        this.setState({headerFocused: false});
    };

    render(): JSX.Element {
        const {children, title, className, num, status, opened, stepHint, disabled, onRemove, prevStatus, nextStatus, ...rest} = this.props;
        const {isOpen, focused, focusedByMouse, headerFocused} = this.state;

        return (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <li
                {...rest}
                className={classnames(className, 'cssClass[item]', {
                    'cssClass[opened]': isOpen,
                    'cssClass[disabled]': !!disabled,
                    'cssClass[focused]': focused && !disabled,
                    'cssClass[focusedByMouse]': focusedByMouse,
                })}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
            >
                <h5 className={classnames({'cssClass[headerFocused]': headerFocused})}>
                    <button
                        id={this.headerInstanceId}
                        aria-controls={this.bodyInstanceId}
                        aria-expanded={isOpen}
                        type="button"
                        className={classnames('cssClass[header]', 'hoverable')}
                        onClick={this.handleHeaderClick}
                        onFocus={this.handleHeaderFocus}
                        onMouseUp={focusButton}
                        onBlur={this.handleHeaderBlur}
                        disabled={disabled}
                    >
                        {prevStatus && (
                            <div className={classnames('cssClass[prevLine]', mapStepStatusToCssClass[status!])} aria-hidden="true" />
                        )}
                        {nextStatus && (
                            <div className={classnames('cssClass[nextLine]', mapStepStatusToCssClass[nextStatus])} aria-hidden="true" />
                        )}
                        {/* span (position: relative) - это фикс, чтобы в IE11 кнопка не утопала при нажатии мышью. */}
                        <span className="cssClass[buttonContent]">
                            {(prevStatus || nextStatus) && (
                                <div className="cssClass[step]">
                                    <Step step={num!} status={status!} position={EStepPosition.XFirst}>
                                        {disabled ? undefined : stepHint}
                                    </Step>
                                </div>
                            )}
                            {title}
                            <CaretdownSrvxIcon16 className="cssClass[caret]" aria-hidden="true" />
                        </span>
                    </button>
                    {!disabled && onRemove && (
                        <div className="cssClass[remove]">
                            <ButtonIcon onClick={this.handleRemoveClick} title="Удалить">
                                <ClearSrvIcon16 />
                            </ButtonIcon>
                        </div>
                    )}
                </h5>
                <ExpandAnimation
                    expanded={isOpen}
                    role="region"
                    id={this.bodyInstanceId}
                    aria-labelledby={this.headerInstanceId}
                    className={classnames('cssClass[body]', {'cssClass[bodyWithoutStatus]': !status})}
                >
                    {children}
                </ExpandAnimation>
            </li>
        );
    }
}
