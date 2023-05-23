import * as React from 'react';
import isFunction from 'lodash.isfunction';
import isEqual from 'lodash.isequal';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {SpinnersmallAniIcon20} from '@sberbusiness/icons/SpinnersmallAniIcon20';
import {EVENT_KEY_CODES, isKey} from '@sberbusiness/triplex/desktop/utils/keyboard';
import {TooltipBody} from '@sberbusiness/triplex/desktop/components/Tooltip/TooltipBody';
import {TooltipTarget} from '@sberbusiness/triplex/desktop/components/Tooltip/TooltipTarget';
import {Tooltip} from '@sberbusiness/triplex/desktop/components/Tooltip/Tooltip';
import {ETooltipSize} from '@sberbusiness/triplex/desktop/components/Tooltip/enums';
import {TestIds} from '@sberbusiness/triplex/common/dataTestIds/dataTestIds';
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
import {Dropdown} from '@sberbusiness/triplex/desktop/components/Dropdown/Dropdown';
import {DropdownListContext} from '@sberbusiness/triplex/desktop/components/Dropdown/DropdownListContext';
import {uniqueId} from '@sberbusiness/triplex/common/utils/uniqueId';
import {debounce} from '@sberbusiness/triplex/desktop/utils/debounce';
import {SuggestDropdownItemLabel} from './Components/SuggestDropdownItemLabel';
import {EInputGroupPosition} from '@sberbusiness/triplex/desktop/components/InputGroup/InputGroup';

const mapInputGroupPositionToCSSClass = {
    [EInputGroupPosition.LEFT]: 'cssClass[left]',
    [EInputGroupPosition.INTERMEDIATE]: 'cssClass[intermediate]',
    [EInputGroupPosition.RIGHT]: 'cssClass[right]',
};

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
    activeDescendant?: string;
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
        activeDescendant: undefined,
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
    private suggestRef = React.createRef<HTMLInputElement>();
    private listRef = React.createRef<HTMLDivElement>();
    private readonly spinnerClassName = classnames('cssClass[spinnerIcon]', 'cssClass[globalSpin]');

    public componentDidUpdate(prevProps: Readonly<ISuggestCustomProps<T>>, prevState: Readonly<ISuggestCustomState>): void {
        if (prevProps.value !== this.props.value) {
            this.setState({
                query: this.props.value?.label || '',
            });
        }

        if (this.state.focused) {
            if (this.state.opened) {
                this.props.options.length == 0 && this.setOpened(false);
            } else {
                this.props.options.length != 0 && this.setOpened(true);
            }
        }

        if (this.state.opened && !prevState.opened) {
            // Таймаут тк listRef.current будет доступен только после рендера DropdownList.
            setTimeout(() => this.listRef?.current?.addEventListener('scroll', (this.onScrollList as unknown) as (e: Event) => void));
        }

        if (this.state.focused && !prevState.focused) {
            this.suggestRef.current?.click();
        }
    }

    public componentWillUnmount(): void {
        this.removeListeners();

        this.listRef?.current?.removeEventListener('scroll', (this.onScrollList as unknown) as (e: Event) => void);
    }

    public render(): React.ReactElement {
        const {notFound, error, 'data-test-id': dataTestId, groupPosition, tooltipHint, isTooltipOpened, disabled} = this.props;
        const {focused} = this.state;
        const wrapperClassName = classnames('cssClass[wrapper]', {
            'cssClass[grouped]': !!groupPosition,
            'cssClass[focused]': focused,
            'cssClass[error]': !!error,
        });

        return (
            <div className={wrapperClassName} ref={this.setWrapperRef}>
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
            groupPosition,
            onSelect,
            onFilter,
            onScrollEnd,
            tooltipHint,
            isTooltipOpened,
            'data-test-id': dataTestId,
            ...rest
        } = this.props;
        const {opened, query, focused, activeDescendant} = this.state;
        const isDropdownOpened = opened && options.length > 0;
        const suggestClassName = classnames(
            'cssClass[suggest]',
            'hoverable',
            groupPosition && mapInputGroupPositionToCSSClass[groupPosition],
            {
                'cssClass[disabled]': Boolean(disabled),
                'cssClass[loading]': Boolean(loading) && Boolean(!error) && Boolean(!disabled),
                'cssClass[opened]': opened && options && options.length > 0,
                'cssClass[error]': Boolean(error),
                disabled: Boolean(disabled),
            }
        );
        const inputClassName = classnames('cssClass[input]');
        const dropDownClassName = classnames('cssClass[suggestDropdown]', {
            'cssClass[visible]': isDropdownOpened,
        });
        const Target = this.renderTarget;

        return (
            <div className={suggestClassName}>
                <DropdownListContext.Provider value={{activeDescendant, setActiveDescendant: this.setActiveDescendant}}>
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
                        spinnerClassName: 'cssClass[globalSpin]',
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
                </DropdownListContext.Provider>
            </div>
        );
    }

    private setActiveDescendant = (id?: string) => {
        const {activeDescendant} = this.state;

        if (activeDescendant !== id) {
            this.setState({activeDescendant: id});
        }
    };

    private calculateKey = (optionLabel: string, index: number): string => {
        //вычисляем key для реакта. если в опциях есть дубли label, то для них дописываем индекс элемента
        return optionLabel + index.toString();
    };

    private renderTarget = (props: ISuggestTargetProps<T>) => {
        const {activeDescendant} = this.state;
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
                <Input
                    role="combobox"
                    aria-controls={this.instanceId}
                    aria-activedescendant={activeDescendant}
                    {...props}
                    className={classnames(className, {'cssClass[hidden]': !focused})}
                />
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
                className={className}
                data-test-id={dataTestId && `${dataTestId}${TestIds.Suggest.dropdown}`}
                opened={opened}
                targetRef={this.suggestRef}
                fixedWidth={true}
            >
                <Dropdown.List id={instanceId} dropdownOpened={opened} className="cssClass[suggestDropdownList]" listRef={listRef}>
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
                activeDescendant: undefined,
            },
            () => {
                onSelect(item);
                this.suggestRef.current?.blur();
            }
        );
    };

    /**
     * Обработчик клика снаружи.
     */
    private handleOutsideClick = (e: Event) => {
        const {value, onSelect, saveFilterOnFocus} = this.props;
        const {opened, focused} = this.state;
        if (opened || focused) {
            this.setOpened(
                false,
                {
                    focused: false,
                    query: saveFilterOnFocus && value?.label ? value.label : '',
                    activeDescendant: undefined,
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
            query: saveFilterOnFocus && value?.label ? value.label : '',
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
        this.suggestRef.current?.focus();
    };

    /**
     * Обработчик клика по инпуту.
     */
    private handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const {disabled, options} = this.props;
        if (disabled) return;

        !this.state.opened && !!options?.length && this.openSuggest();
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
                this.suggestRef.current?.blur();
            }
        );
    };

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
        if (isKey(key, 'ESCAPE') && opened) {
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
        const {dropdownRef} = this.props;
        const isOutsideSuggest = !this.isTargetInside(this.suggestRef.current, target as Node);
        const isOutsideList = !this.isTargetInside(this.listRef.current, target as Node);
        const isOutsideCustomList = !this.isTargetInside(dropdownRef?.current ?? null, target as Node);

        return (
            isOutsideList &&
            isOutsideSuggest &&
            isOutsideCustomList &&
            target !== this.suggestRef.current &&
            target !== this.listRef.current &&
            target !== this.wrapper
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
        (this.suggestRef as React.MutableRefObject<HTMLInputElement | null>).current = instance;
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

        if (Math.abs(scrolled + parentFullHeight - parentPaddings - listHeight) <= 1) {
            onScrollEnd();
        }
    };

    private onScrollList = debounce(this.scrollHandler, 100);
}
