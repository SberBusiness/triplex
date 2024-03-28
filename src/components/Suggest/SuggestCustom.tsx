import React from 'react';
import isFunction from 'lodash.isfunction';
import isEqual from 'lodash.isequal';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {SpinnersmallAniIcon20} from '@sberbusiness/icons/SpinnersmallAniIcon20';
import {EVENT_KEY_CODES, isKey} from '@sberbusiness/triplex/utils/keyboard';
import {TooltipBody} from '@sberbusiness/triplex/components/Tooltip/TooltipBody';
import {TooltipTarget} from '@sberbusiness/triplex/components/Tooltip/TooltipTarget';
import {Tooltip} from '@sberbusiness/triplex/components/Tooltip/Tooltip';
import {ETooltipSize} from '@sberbusiness/triplex/components/Tooltip/enums';
import {TestIds} from '@sberbusiness/triplex/dataTestIds/dataTestIds';
import {
    ISuggestTargetProps,
    ISuggestOption,
    ISuggestCustomProps,
    ISuggestDropdownProps,
    ISuggestDropdownItemProps,
    ISuggestDropdownItemLabelProps,
    TSetRef,
} from './types';
import {TargetLabel} from './desktop/TargetLabel';
import {TargetInput} from './desktop/TargetInput';
import {Dropdown} from '@sberbusiness/triplex/components/Dropdown/Dropdown';
import {DropdownList} from '@sberbusiness/triplex/components/Dropdown/desktop/DropdownList';
import {DropdownListContext} from '@sberbusiness/triplex/components/Dropdown/DropdownListContext';
import {uniqueId} from '@sberbusiness/triplex/utils/uniqueId';
import {debounce} from '@sberbusiness/triplex/utils/debounce';
import {SuggestDropdownItemLabel} from './desktop/SuggestDropdownItemLabel';
import {EInputGroupPosition} from '@sberbusiness/triplex/components/InputGroup/InputGroup';

const mapInputGroupPositionToCSSClass = {
    [EInputGroupPosition.LEFT]: 'cssClass[left]',
    [EInputGroupPosition.INTERMEDIATE]: 'cssClass[intermediate]',
    [EInputGroupPosition.RIGHT]: 'cssClass[right]',
};

/** Состояния компонента SuggestCustom. */
interface ISuggestCustomState {
    /** Состояние выпадающего списка - открыт/закрыт. */
    opened: boolean;
    /** Состояние поля ввода - в фокусе/не в фокусе. */
    focused: boolean;
    /** Поисковая строка. */
    query: string;
    /** Идентификатор текущего активного элемента. */
    activeDescendant?: string;
}

const KEY_CODES_SELECTABLE = [EVENT_KEY_CODES.ENTER];

/**
 * Выпадающий список с возможностью поиска по введённому значению, позволяет задать кастомные компоненты для отображения всех элементов
 * управления.
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
        value: undefined,
    };

    private instanceId = uniqueId();

    private static readonly displayName: string = 'SuggestCustom';
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
            setTimeout(() => this.listRef?.current?.addEventListener('scroll', this.onScrollList as unknown as (e: Event) => void));
        }

        if (this.state.focused && !prevState.focused) {
            this.suggestRef.current?.click();
        }
    }

    public componentWillUnmount(): void {
        this.removeListeners();

        this.listRef?.current?.removeEventListener('scroll', this.onScrollList as unknown as (e: Event) => void);
    }

    public render(): React.ReactElement {
        const {notFound, 'data-test-id': dataTestId, tooltipHint, isTooltipOpened, disabled} = this.props;
        const {focused} = this.state;

        return (
            <Tooltip
                size={ETooltipSize.SM}
                isOpen={!!((isTooltipOpened && focused) || (notFound && focused)) && !disabled}
                toggle={() => {}}
            >
                <TooltipBody data-test-id={dataTestId && `${dataTestId}${TestIds.Suggest.tooltip}`}>{tooltipHint}</TooltipBody>
                <TooltipTarget>{this.renderSuggest()}</TooltipTarget>
            </Tooltip>
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
            {
                'cssClass[disabled]': Boolean(disabled),
                'cssClass[loading]': Boolean(loading) && Boolean(!error) && Boolean(!disabled),
                'cssClass[opened]': opened && options && options.length > 0,
                'cssClass[error]': Boolean(error),
                'cssClass[grouped]': Boolean(groupPosition),
            },
            groupPosition && mapInputGroupPositionToCSSClass[groupPosition]
        );
        const dropDownClassName = classnames('cssClass[suggestDropdown]', {
            'cssClass[visible]': isDropdownOpened,
        });
        const Target = this.renderTarget;

        return (
            <div className={suggestClassName}>
                <DropdownListContext.Provider value={{activeDescendant, setActiveDescendant: this.setActiveDescendant}}>
                    <Target
                        {...rest}
                        className="cssClass[suggestDesktopTarget]"
                        optionsLength={options.length}
                        setRef={this.setSuggestRef}
                        onFocus={this.handleFocus}
                        onClick={this.handleClick}
                        onChange={this.handleChange}
                        disabled={disabled}
                        error={error}
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
                        renderDropdownItem: this.renderDropdownItem,
                        renderDropdownItemLabel,
                        selected: value,
                        options,
                        onSelect: this.handleSelect,
                        listRef: this.listRef,
                        suggestRef: this.suggestRef,
                        setOpened: this.setOpened,
                        suggestDropdownListClassName: 'cssClass[suggestDropdownList]',
                        suggestDropdownItemClassName: 'cssClass[suggestDropdownListItem]',
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
            suggestRef,
            setOpened,
            suggestDropdownListClassName,
            suggestDropdownItemClassName,
        } = props;

        return (
            <Dropdown
                setOpened={setOpened}
                className={className}
                data-test-id={dataTestId && `${dataTestId}${TestIds.Suggest.dropdown}`}
                opened={opened}
                targetRef={suggestRef}
                fixedWidth
            >
                <DropdownList id={instanceId} dropdownOpened={opened} className={suggestDropdownListClassName} listRef={listRef}>
                    {options?.map((option, index) => {
                        const key = this.calculateKey(option.label || dataTestId || SuggestCustom.displayName, index);

                        return renderDropdownItem({
                            option,
                            selected: isEqual(selected, option),
                            key,
                            dataTestId,
                            renderCustom: this.props.renderDropdownItem,
                            renderDropdownItemLabel,
                            onSelect,
                            className: suggestDropdownItemClassName,
                        });
                    })}

                    {showListSpinner && (
                        <div className="cssClass[suggestListSpinnerWrapper]">
                            <SpinnersmallAniIcon20 className={spinnerClassName} />
                        </div>
                    )}
                </DropdownList>
            </Dropdown>
        );
    };

    private renderDropdownItem = (props: ISuggestDropdownItemProps<T>) => {
        if (props.renderCustom) {
            return props.renderCustom(props);
        }

        const {active, selected, key, option, onSelect, dataTestId, renderCustom, renderDropdownItemLabel, ...rest} = props;

        return (
            <DropdownList.Item
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
            </DropdownList.Item>
        );
        /* eslint-enable @typescript-eslint/ban-ts-comment */
    };

    private renderDropdownItemLabel = (props: ISuggestDropdownItemLabelProps<T>) => {
        if (props.renderCustom) {
            return props.renderCustom(props);
        }

        return <SuggestDropdownItemLabel option={props.option} />;
    };

    /** Обработчик выбора элемента из списка. */
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

    /** Обработчик клика снаружи. */
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

    /** Обработчик открытия выпадающего списка. */
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

    /** Обработчик получения фокуса. */
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

    /** Обработчик клика. */
    private handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const {disabled, options} = this.props;
        if (disabled) return;

        !this.state.opened && !!options?.length && this.openSuggest();
    };

    /** Обработчик изменения значения. */
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

    /** Обработчик нажатия на таб (снятие фокуса). */
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

    /** Обработчик безусловного снятия фокуса. */
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

    /** Добавление слушателя нажатий клавиш для инпута в эксклюзивном режиме. */
    private addInputOnlyListener = () => {
        document.addEventListener('keydown', this.keyDownInputOnlyListener);
    };

    /** Удаление слушателя нажатий клавиш для инпута в эксклюзивном режиме. */
    private removeInputOnlyListener = () => {
        document.removeEventListener('keydown', this.keyDownInputOnlyListener);
    };

    /** Добавление слушателей нажатий клавиш и слушателя клика снаружи компонента. */
    private addListeners = () => {
        const {disabled} = this.props;
        if (!disabled) {
            document.addEventListener('keydown', this.keyDownListener);
            !this.state.opened && this.addInputOnlyListener();
            document.addEventListener('mousedown', this.clickOutsideListener);
        }
    };

    /** Удаление слушателей нажатий клавиш и слушателя клика снаружи компонента. */
    private removeListeners = () => {
        document.removeEventListener('keydown', this.keyDownListener);
        this.removeInputOnlyListener();
        document.removeEventListener('mousedown', this.clickOutsideListener);
    };

    /** Слушатели нажатий клавиш, работающие только на инпуте, когда выпадающий список закрыт. */
    private keyDownInputOnlyListener = (e: KeyboardEvent): void => {
        const key = e.code || e.keyCode;
        if (!this.state.opened) {
            if (isKey(key, 'ENTER') || isKey(key, 'ARROW_UP') || isKey(key, 'ARROW_DOWN')) {
                return this.openSuggest();
            }
        }
    };

    /** Слушатели нажатий клавиш. */
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

        onKeyDown && onKeyDown(e as unknown as React.KeyboardEvent<HTMLInputElement>);
    };

    /** Слушатель клика снаружи. */
    private clickOutsideListener = (e: MouseEvent): void => {
        if (this.isOutsideClick(e)) {
            this.handleOutsideClick(e);
            this.removeListeners();
        }
    };

    /** Предикат для определения клика снаружи. */
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

    /** Проверка таргета на принадлежность поддереву ref. */
    private isTargetInside = (ref: HTMLElement | null, target: Node) => {
        return ref ? ref.contains(target) : false;
    };

    /** Установка рефа на инпут. */
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
