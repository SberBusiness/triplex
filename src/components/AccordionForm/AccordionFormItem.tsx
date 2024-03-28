import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {AccordionFormItemTitle} from '@sberbusiness/triplex/components/AccordionForm/AccordionFormItemTitle';
import {AccordionFormItemContent} from '@sberbusiness/triplex/components/AccordionForm/AccordionFormItemContent';
import {AccordionFormItemFooter} from '@sberbusiness/triplex/components/AccordionForm/AccordionFormItemFooter';
import {Step} from '@sberbusiness/triplex/components/Step/Step';
import {EStepPosition, EStepStatus} from '@sberbusiness/triplex/components/Step/enums';
import {ButtonIcon} from '@sberbusiness/triplex/components/Button/ButtonIcon';
import {CaretdownSrvxIcon16} from '@sberbusiness/icons/CaretdownSrvxIcon16';
import {ClearSrvIcon16} from '@sberbusiness/icons/ClearSrvIcon16';
import {uniqueId} from '@sberbusiness/triplex/utils/uniqueId';
import {ExpandAnimation} from '@sberbusiness/triplex/components/ExpandAnimation/ExpandAnimation';
import {focusButton} from '@sberbusiness/triplex/components/Button/utils';

/** Свойства компонента элемента аккордеона. */
export interface IAccordionItemProps extends Omit<React.HTMLAttributes<HTMLLIElement>, 'title'> {
    /** Нода с названием заголовка. */
    title: React.ReactNode;
    /** Идентификатор вкладки (если не передать извне, то используется индекс. Также используется как ключ при рендере списка вкладок). */
    id?: string;
    /** Цифра в кружке. */
    num?: number;
    /** Раскрыт ли элемент. */
    opened?: boolean;
    /** Статус шага. */
    status?: EStepStatus;
    /** Уровень заголовка секции. */
    headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
    /** Подсказка к шагу. */
    stepHint?: string;
    /** Заблокирован ли элемент. */
    disabled?: boolean;
    /** Вызывается при клике по вкладке. */
    onToggle?: (newOpened: boolean, id: string) => void;
    /** Вызывается при удалении вкладки. */
    onRemove?: (id: string) => void;
    /** Статус предыдущей вкладки. */
    prevStatus?: EStepStatus;
    /** Статус следующей вкладки. */
    nextStatus?: EStepStatus;
    /** Ссылка на контейнер элемента аккордеона. */
    forwardedRef?: React.RefObject<HTMLLIElement>;
}

/** Состояния компонента элемента аккордеона. */
export interface IAccordionItemState {
    /** Компонент развёрнут. */
    isOpen: boolean;
    /** Компонент в данный момент в фокусе. */
    focused: boolean;
    /** Фокус компонента вызван мышью. */
    focusedByMouse: boolean;
    /** Фокус в данный момент именно на заголовке компонента. */
    headerFocused: boolean;
}

/** Мапа статуса шага в класс CSS. */
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

    public static defaultProps = {
        headingLevel: 5,
    };

    public state: IAccordionItemState = {
        focused: false,
        focusedByMouse: false,
        headerFocused: false,
        isOpen: this.props.opened || false,
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
        const {
            children,
            title,
            className,
            num,
            status,
            headingLevel,
            opened,
            stepHint,
            disabled,
            onRemove,
            prevStatus,
            nextStatus,
            forwardedRef,
            ...rest
        } = this.props;
        const {isOpen, focused, focusedByMouse, headerFocused} = this.state;
        const Heading = `h${headingLevel!}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

        return (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <li
                {...rest}
                className={classnames(className, 'cssClass[item]', {
                    'cssClass[disabled]': !!disabled,
                    'cssClass[focused]': focused && !disabled,
                    'cssClass[focusedByMouse]': focusedByMouse,
                    'cssClass[opened]': isOpen,
                })}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                ref={forwardedRef}
            >
                <Heading className={classnames({'cssClass[headerFocused]': headerFocused})}>
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
                </Heading>

                {!disabled && onRemove && (
                    <div className="cssClass[remove]">
                        <ButtonIcon onClick={this.handleRemoveClick} title="Удалить">
                            <ClearSrvIcon16 />
                        </ButtonIcon>
                    </div>
                )}

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
