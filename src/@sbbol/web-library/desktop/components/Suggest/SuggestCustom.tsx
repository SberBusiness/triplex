import * as React from 'react';
import isFunction from 'lodash.isfunction';
import {isEqual} from '@sbbol/web-library/desktop/utils/isEqual';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import {SpinnersmallAniIcon20} from '@sberbusiness/icons/SpinnersmallAniIcon20';
import {EVENT_KEY_CODES, isKey} from '@sbbol/web-library/desktop/utils/keyboard';
import {TooltipBody} from '@sbbol/web-library/desktop/components/Tooltip/TooltipBody';
import {TooltipTarget} from '@sbbol/web-library/desktop/components/Tooltip/TooltipTarget';
import {Tooltip} from '@sbbol/web-library/desktop/components/Tooltip/Tooltip';
import {ETooltipSize} from '@sbbol/web-library/desktop/components/Tooltip/enums';
import {TestIds} from '@sbbol/web-library/common/dataTestIds/dataTestIds';
import {
    ISuggestTargetProps,
    ISuggestOption,
    ISuggestCustomProps,
    ISuggestDropdownProps,
    ISuggestDropdownItemProps,
    ISuggestDropdownItemLabelProps,
    TSetRef,
} from './types';
import {TargetLabel} from './Components/TargetLabel';
import {TargetInput} from './Components/TargetInput';
import {Dropdown} from '../Dropdown/Dropdown';
import {uniqueId} from '../../../common/utils/uniqueId';
import {debounce} from '@sbbol/web-library/desktop/utils/debounce';
import {SuggestDropdownItemLabel} from './Components/SuggestDropdownItemLabel';

/**
 * Внутреннее состояние компонента.
 * @prop {boolean} opened Состояние выпадающего списка - открыт/закрыт.
 * @prop {boolean} focused Состояние поля ввода - в фокусе/не в фокусе.
 * @prop {string} query Поисковая строка.
 */
interface ISuggestCustomState {
    opened: boolean;
    focused: boolean;
    query: string;
}
const KEY_CODES_SELECTABLE = [EVENT_KEY_CODES.ENTER];

/**
 * Выпадающий список с возможностью поиска по введённому значению, позволяет задать кастомные компоненты для отображения всех элементов управления.
 */
export class SuggestCustom<T extends ISuggestOption = ISuggestOption> extends React.Component<ISuggestCustomProps<T>, ISuggestCustomState> {
    public state = {
        opened: false,
        focused: false,
        query: this.props.value?.label || '',
    };
    public static defaultProps = {
        saveFilterOnFocus: false,
        disabled: false,
        loading: false,
        tabIndex: 0,
        value: null,
    };
    private instanceId = uniqueId();

    private static readonly displayName: string = 'Suggest';
    private wrapper: HTMLElement | null = null;
    private suggestRef: HTMLInputElement | null = null;
    private listRef = React.createRef<HTMLDivElement>();
    private readonly spinnerClassName = classnames('cssClass[spinnerIcon]', 'theme__default_spin');

    public componentDidUpdate(prevProps: Readonly<ISuggestCustomProps<T>>, prevState: Readonly<ISuggestCustomState>): void {
        if (prevProps.value !== this.props.value) {
            this.setState({
                query: this.props.value?.label || '',
            });
        }
        if (this.shouldBeOpenedOnUpdate(prevProps, this.props)) {
            this.setOpened(true);
        }

        if (this.state.opened && !prevState.opened) {
            this.listRef?.current?.addEventListener('scroll', (this.onScrollList as unknown) as (e: Event) => void);
        }

        if (this.state.focused && !prevState.focused) {
            this.suggestRef?.click();
        }
    }

    public componentWillUnmount(): void {
        this.removeListeners();

        this.listRef?.current?.removeEventListener('scroll', (this.onScrollList as unknown) as (e: Event) => void);
    }

    public render(): React.ReactElement {
        const {notFound, 'data-test-id': dataTestId, tooltipHint, isTooltipOpened, disabled} = this.props;
        const {focused} = this.state;
        return (
            <div className="cssClass[wrapper]" ref={this.setWrapperRef}>
                <Tooltip
                    size={ETooltipSize.SM}
                    isOpen={!!((isTooltipOpened && focused) || (notFound && focused)) && !disabled}
                    /* eslint-disable-next-line @typescript-eslint/no-empty-function */
                    toggle={() => {}}
                >
                    <TooltipBody data-test-id={dataTestId && `${dataTestId}${TestIds.Suggest.tooltip}`}>{tooltipHint}</TooltipBody>
                    <TooltipTarget>{this.renderSuggest()}</TooltipTarget>
                </Tooltip>
            </div>
        );
    }

    private renderSuggest(): React.ReactElement {
        const {
            loading,
            error,
            disabled,
            options,
            tabIndex,
            value,
            showListSpinner,
            renderDropdown,
            renderDropdownItem,
            renderDropdownItemLabel,
            // omit
            saveFilterOnFocus,
            notFound,
            onSelect,
            onFilter,
            onScrollEnd,
            tooltipHint,
            isTooltipOpened,
            'data-test-id': dataTestId,
            ...rest
        } = this.props;
        const {opened, query, focused} = this.state;
        const isDropdownOpened = opened && options.length > 0;
        const suggestClassName = classnames('cssClass[suggest]', 'hoverable', {
            'cssClass[loading]': Boolean(loading) && Boolean(!error) && Boolean(!disabled),
            'cssClass[opened]': opened && options && options.length > 0,
            'cssClass[disabled]': Boolean(disabled),
            disabled: Boolean(disabled),
        });
        const inputClassName = classnames('cssClass[input]', {
            'cssClass[error]': Boolean(error) && !disabled,
        });
        const dropDownClassName = classnames('cssClass[suggestDropdown]', {
            'cssClass[visible]': isDropdownOpened,
        });
        const Target = this.renderTarget;

        return (
            <div className={suggestClassName}>
                <Target
                    {...rest}
                    className={inputClassName}
                    optionsLength={options.length}
                    setRef={this.setSuggestRef}
                    onFocus={this.handleFocus}
                    onClick={this.handleClick}
                    onChange={this.handleChange}
                    disabled={disabled}
                    query={query}
                    dataTestId={dataTestId}
                    loading={loading}
                    tabIndex={tabIndex}
                    value={value}
                    focused={focused}
                    opened={opened}
                />
                {this.renderDropdown({
                    opened: isDropdownOpened,
                    showListSpinner: showListSpinner,
                    className: dropDownClassName,
                    spinnerClassName: classnames('theme__default_spin'),
                    dataTestId,
                    instanceId: this.instanceId,
                    renderCustom: renderDropdown,
                    renderDropdownItem,
                    renderDropdownItemLabel,
                    selected: value,
                    options,
                    onSelect: this.handleSelect,
                    listRef: this.listRef,
                })}
            </div>
        );
    }

    private calculateKey = (optionLabel: string, index: number): string => {
        //вычисляем key для реакта. если в опциях есть дубли label, то для них дописываем индекс элемента
        return optionLabel + index.toString();
    };

    private renderTarget = (props: ISuggestTargetProps<T>) => {
        const {loading, optionsLength, renderTargetLabel, renderTargetInput, className, focused, opened} = props;
        const Label = renderTargetLabel ?? TargetLabel;
        const Input = renderTargetInput ?? TargetInput;
        const isSpinnerShown = loading && optionsLength === 0;
        return (
            <>
                <Label
                    {...props}
                    className={classnames(className, 'cssClass[pseudoLabel]', {
                        'cssClass[hidden]': focused || opened,
                        'cssClass[placeholder]': !props.value,
                    })}
                />
                <Input {...props} className={classnames(className, {'cssClass[hidden]': !focused})} />
                {isSpinnerShown && <SpinnersmallAniIcon20 className={this.spinnerClassName} />}
            </>
        );
    };

    private renderDropdown = (props: ISuggestDropdownProps<T>) => {
        if (isFunction(props.renderCustom)) {
            return props.renderCustom(props);
        }

        const {
            opened,
            showListSpinner,
            className,
            spinnerClassName,
            dataTestId,
            instanceId,
            renderDropdownItem,
            renderDropdownItemLabel,
            selected,
            options,
            onSelect,
            listRef,
        } = props;

        return (
            <Dropdown
                opened={opened}
                id={instanceId}
                className={className}
                data-test-id={dataTestId && `${dataTestId}${TestIds.Suggest.dropdown}`}
            >
                <Dropdown.List dropdownOpened={opened} className="cssClass[suggestDropdownList]" listRef={listRef}>
                    {options?.map((option, index) => {
                        const key = this.calculateKey(option.label || dataTestId || SuggestCustom.displayName, index);

                        return this.renderDropdownItem({
                            option,
                            selected: isEqual(selected, option),
                            key,
                            dataTestId,
                            renderCustom: renderDropdownItem,
                            renderDropdownItemLabel,
                            onSelect,
                            className: 'cssClass[suggestDropdownListItem]',
                        });
                    })}

                    {showListSpinner && (
                        <div className="cssClass[suggestListSpinnerWrapper]">
                            <SpinnersmallAniIcon20 className={spinnerClassName} />
                        </div>
                    )}
                </Dropdown.List>
            </Dropdown>
        );
    };

    private renderDropdownItem = (props: ISuggestDropdownItemProps<T>) => {
        if (props.renderCustom) {
            return props.renderCustom(props);
        }

        const {active, selected, key, option, onSelect, dataTestId, renderCustom, renderDropdownItemLabel, ...rest} = props;
        /* eslint-disable @typescript-eslint/ban-ts-comment */
        return (
            <Dropdown.List.Item
                active={active}
                selected={selected}
                key={key}
                onSelect={() => onSelect(option)}
                keyCodesForSelection={KEY_CODES_SELECTABLE}
                id={option.label}
                title={option.label}
                data-test-id={dataTestId && `${dataTestId}${TestIds.Suggest.dropdown}${TestIds.Dropdown.listItem}`}
                {...rest}
            >
                {this.renderDropdownItemLabel({option, renderCustom: renderDropdownItemLabel})}
            </Dropdown.List.Item>
        );
        /* eslint-enable @typescript-eslint/ban-ts-comment */
    };

    private renderDropdownItemLabel = (props: ISuggestDropdownItemLabelProps<T>) => {
        if (props.renderCustom) {
            return props.renderCustom(props);
        }

        return <SuggestDropdownItemLabel option={props.option} />;
    };

    /**
     * Обработчик выбора элемента из списка.
     * @param {T extends ISuggestOption} item Элемент списка.
     */
    private handleSelect = (item: T) => {
        const {onSelect} = this.props;

        this.setOpened(
            false,
            {
                focused: false,
                query: item?.label || '',
            },
            () => {
                onSelect(item);
                this.suggestRef?.blur();
            }
        );
    };

    /**
     * Обработчик клика снаружи.
     */
    private handleOutsideClick = (e: Event) => {
        const {value, onSelect} = this.props;
        const {opened} = this.state;
        if (opened) {
            this.setOpened(
                false,
                {
                    focused: false,
                    query: '',
                },
                () => {
                    onSelect(value, e);
                }
            );
        }
    };

    /**
     * Обработчик открытия выпадающего списка.
     */
    private openSuggest = () => {
        const {saveFilterOnFocus, value} = this.props;
        this.setOpened(true, {
            focused: true,
            query: saveFilterOnFocus && value ? value.label : '',
        });
    };

    private setOpened = (opened: boolean, stateDiff?: Partial<ISuggestCustomState>, cb?: () => void) => {
        this.setState(
            (prevState) => ({
                ...prevState,
                ...stateDiff,
                opened,
            }),
            () => {
                if (opened) {
                    this.removeInputOnlyListener();
                } else if (this.state.focused) {
                    this.addInputOnlyListener();
                }

                cb?.();
            }
        );
    };

    /**
     * Обработчик фокуса.
     */
    private handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        const {onFocus, saveFilterOnFocus} = this.props;
        const {query} = this.state;
        onFocus && onFocus(e);
        !this.state.opened &&
            this.setState({
                focused: true,
                query: saveFilterOnFocus ? query : '',
            });
        this.addListeners();
        this.suggestRef?.focus();
    };

    /**
     * Обработчик клика по инпуту.
     */
    private handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const {disabled} = this.props;
        if (disabled) return;

        !this.state.opened && this.openSuggest();
    };

    /**
     * Обработчик изменения значения.
     * @param {ChangeEvent} e Событие.
     */
    private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        this.setState(
            {
                query: value,
            },
            () => {
                this.props.onFilter(value);
            }
        );
    };

    /**
     * Обработчик нажатия на таб (снятие фокуса).
     */
    private handleTab = (e: Event) => {
        this.setState(
            {
                focused: false,
            },
            () => {
                this.handleOutsideClick(e);
                this.removeListeners();
            }
        );
    };

    /**
     * Обработчик безусловного снятия фокуса.
     */
    private forceBlur = (e: Event) => {
        const {value, onSelect} = this.props;
        this.setState(
            {
                focused: false,
                query: value?.label || '',
            },
            () => {
                onSelect(value, e);
                this.suggestRef?.blur();
            }
        );
    };

    private shouldBeOpenedOnUpdate(prevProps: Readonly<ISuggestCustomProps<T>>, currentProps: Readonly<ISuggestCustomProps<T>>): boolean {
        const {focused} = this.state;
        const {options: prevOptions} = prevProps;
        const {options: currentOptions} = currentProps;
        return !isEqual(prevOptions, currentOptions) && !!currentOptions?.length && focused;
    }

    /**
     * Добавление слушателя нажатий клавиш для инпута в эксклюзивном режиме.
     */
    private addInputOnlyListener = () => {
        document.addEventListener('keydown', this.keyDownInputOnlyListener);
    };

    /**
     * Удаление слушателя нажатий клавиш для инпута в эксклюзивном режиме.
     */
    private removeInputOnlyListener = () => {
        document.removeEventListener('keydown', this.keyDownInputOnlyListener);
    };

    /**
     * Добавление слушателей нажатий клавиш и слушателя клика снаружи компонента.
     */
    private addListeners = () => {
        const {disabled} = this.props;
        if (!disabled) {
            document.addEventListener('keydown', this.keyDownListener);
            !this.state.opened && this.addInputOnlyListener();
            document.addEventListener('mousedown', this.clickOutsideListener);
        }
    };

    /**
     * Удаление слушателей нажатий клавиш и слушателя клика снаружи компонента.
     */
    private removeListeners = () => {
        document.removeEventListener('keydown', this.keyDownListener);
        this.removeInputOnlyListener();
        document.removeEventListener('mousedown', this.clickOutsideListener);
    };

    /**
     * Слушатели нажатий клавиш, работающие только на инпуте, когда выпадающий список закрыт.
     * @param {KeyboardEvent} e Событие.
     */
    private keyDownInputOnlyListener = (e: KeyboardEvent): void => {
        const key = e.code || e.keyCode;
        if (!this.state.opened) {
            if (isKey(key, 'ENTER') || isKey(key, 'ARROW_UP') || isKey(key, 'ARROW_DOWN')) {
                return this.openSuggest();
            }
        }
    };

    /**
     * Слушатели нажатий клавиш.
     * @param {KeyboardEvent} e Событие.
     */
    private keyDownListener = (e: KeyboardEvent) => {
        const {opened} = this.state;
        const {onKeyDown} = this.props;
        const key = e.code || e.keyCode;

        if (isKey(key, 'TAB')) {
            return this.handleTab(e);
        }
        if (isKey(key, 'ESC') && opened) {
            this.handleOutsideClick(e);
            this.removeListeners();
            this.forceBlur(e);
        }

        onKeyDown && onKeyDown((e as unknown) as React.KeyboardEvent<HTMLInputElement>);
    };

    /**
     * Слушатель клика снаружи.
     * @param {MouseEvent} e Событие мыши.
     */
    private clickOutsideListener = (e: MouseEvent): void => {
        if (this.isOutsideClick(e)) {
            this.handleOutsideClick(e);
            this.removeListeners();
        }
    };

    /**
     * Предикат для определения клика снаружи.
     * @param {MouseEvent} event Событие мыши.
     */
    private isOutsideClick = (event: MouseEvent) => {
        const {target} = event;
        const isOutsideSuggest = !this.isTargetInside(this.suggestRef, target as Node);
        const isOutsideList = !this.isTargetInside(this.listRef.current, target as Node);
        return (
            isOutsideList && isOutsideSuggest && target !== this.suggestRef && target !== this.listRef.current && target !== this.wrapper
        );
    };

    /**
     * Проверка таргета на принадлежность поддереву ref.
     * @param {(T extends HTMLElement) | null} ref Ссылка на поддерево.
     * @param {Node} target Целевой узел.
     */
    private isTargetInside = (ref: HTMLElement | null, target: Node) => {
        return ref ? ref.contains(target) : false;
    };

    /**
     * Установка рефа на обёртку.
     * @param {HTMLButtonElement} instance Инстанс HTML элемента.
     */
    private setWrapperRef: TSetRef<HTMLElement | null> = (instance) => {
        this.wrapper = instance;
        if (this.props.setRef) {
            this.props.setRef(instance);
        }
    };

    /**
     * Установка рефа на инпут.
     * @param {HTMLInputElement} instance Инстанс HTML элемента.
     */
    private setSuggestRef: TSetRef<HTMLInputElement | null> = (instance) => {
        this.suggestRef = instance;
    };

    private scrollHandler = (e: React.UIEvent<HTMLDivElement> & {target: HTMLDivElement & EventTarget}) => {
        const {onScrollEnd} = this.props;

        // бессмысленно собирать данные об окончании скрола, если не передан обработчик.
        if (!onScrollEnd) return;

        const {
            target: list,
            target: {parentElement: parent},
        } = e;

        const listHeight = list.scrollHeight;
        const scrolled = list.scrollTop;
        const parentFullHeight = parent!.scrollHeight;
        const styles = window.getComputedStyle(parent!);
        const parentPaddingTop = styles.getPropertyValue('padding-top');
        const parentPaddingBottom = styles.getPropertyValue('padding-bottom');
        const parentPaddings = Number.parseInt(parentPaddingBottom) + Number.parseInt(parentPaddingTop);

        if (scrolled + parentFullHeight - parentPaddings === listHeight) {
            onScrollEnd();
        }
    };

    private onScrollList = debounce(this.scrollHandler, 100);
}
