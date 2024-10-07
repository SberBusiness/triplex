import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {TestProps} from '@sberbusiness/triplex/types/CoreTypes';
import {Dropdown} from '@sberbusiness/triplex/components/Dropdown/Dropdown';
import {DropdownList} from '@sberbusiness/triplex/components/Dropdown/desktop/DropdownList';
import {CaretdownSrvxIcon16} from '@sberbusiness/icons/CaretdownSrvxIcon16';
import {EVENT_KEY_CODES} from '@sberbusiness/triplex/utils/keyboard';
import {DropdownListContext} from '@sberbusiness/triplex/components/Dropdown/DropdownListContext';
import {uniqueId} from '@sberbusiness/triplex/utils/uniqueId';
import {ITabsLineItemProps} from '@sberbusiness/triplex/components/TabsLine/components/TabsLineItem';

/** Свойства компонента TabsLineDropdown. */
interface ITabsLineDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Табы дропдауна. */
    tabs: ITabsLineItemProps[];
    /** Выбранный таб находится в дропдауне. */
    isActive: boolean;
    /** Текст таргет кнопки дропдауна. */
    label: string;
    /** Коллбэк выбора таба. */
    onClickTab: (tab: ITabsLineItemProps) => void;
    /** Выбранный таб. */
    selected?: ITabsLineItemProps;
    /** Атрибуты кнопки дропдауна. */
    targetHtmlAttributes?: React.HTMLAttributes<HTMLButtonElement> & TestProps;
}

/** Состояние компонента TabsLineDropdown. */
interface ITabsLineDropdownState {
    /** Текущий активный элемент (его идентификатор). */
    activeDescendant?: string;
    /** Состояние открытости дропдауна. */
    opened: boolean;
}

/** Компонент TabsLineDropdown. */
export class TabsLineDropdown extends React.PureComponent<ITabsLineDropdownProps, ITabsLineDropdownState> {
    state = {
        activeDescendant: undefined,
        opened: false,
    };

    private readonly targetRef: React.RefObject<HTMLDivElement>;
    private readonly dropdownRef: React.RefObject<HTMLDivElement>;
    private instanceId = uniqueId();

    constructor(props: ITabsLineDropdownProps) {
        super(props);

        this.targetRef = React.createRef();
        this.dropdownRef = React.createRef();
    }

    public componentDidMount(): void {
        document.addEventListener('mouseup', this.handleClickOutside);
    }

    public componentWillUnmount(): void {
        document.removeEventListener('mouseup', this.handleClickOutside);
    }

    public render(): JSX.Element {
        return (
            <div className="cssClass[tabsLineDropdown]" ref={this.targetRef}>
                {this.renderTarget()}
                {this.renderDropdown()}
            </div>
        );
    }

    /** Установка значения activeDescendant. */
    private setActiveDescendant = (activeDescendant?: string) => {
        this.setState({activeDescendant});
    };

    /** Рендер кнопки, раскрывающей список. */
    private renderTarget = () => {
        const {isActive, label, targetHtmlAttributes} = this.props;
        const {activeDescendant, opened} = this.state;

        const buttonClassName = classnames('cssClass[tab]', 'cssClass[dropdownTarget]', {'cssClass[active]': isActive});
        const caretClassName = classnames('cssClass[dropdownTargetCaret]', {'cssClass[opened]': opened});

        return (
            <button
                {...targetHtmlAttributes}
                className={buttonClassName}
                onClick={this.handleTargetClick}
                onKeyDown={this.handleTargetKeyDown}
                type="button"
                aria-haspopup="menu"
                aria-expanded={opened}
                aria-controls={this.instanceId}
                aria-activedescendant={activeDescendant}
            >
                <span className="cssClass[tabInner]">
                    <span className="cssClass[dropdownTargetInner]">
                        {label}
                        <CaretdownSrvxIcon16 className={caretClassName} />
                    </span>
                </span>
            </button>
        );
    };

    /** Рендер дропдаун списка. */
    private renderDropdown = () => {
        const {selected, tabs} = this.props;
        const {activeDescendant, opened} = this.state;

        return (
            <Dropdown
                className="cssClass[dropdown]"
                opened={opened}
                setOpened={this.setOpenedDropdown}
                targetRef={this.targetRef}
                ref={this.dropdownRef}
            >
                <DropdownListContext.Provider value={{activeDescendant, setActiveDescendant: this.setActiveDescendant}}>
                    <DropdownList dropdownOpened={opened} id={this.instanceId}>
                        {tabs.map((tab) => {
                            const {id, label, showNotificationIcon, ...htmlDivAttributes} = tab;
                            const className = classnames('cssClass[dropdownItem]', {
                                'cssClass[withNotification]': Boolean(tab.showNotificationIcon),
                            });

                            return (
                                <DropdownList.Item
                                    {...htmlDivAttributes}
                                    className={className}
                                    id={tab.id}
                                    key={tab.id}
                                    onSelect={() => {
                                        this.handleClickTab(tab);
                                    }}
                                    selected={tab === selected}
                                >
                                    <span className="cssClass[dropdownItemInner]">{tab.label}</span>
                                    {tab.showNotificationIcon && <span className="cssClass[notificationIcon]" />}
                                </DropdownList.Item>
                            );
                        })}
                    </DropdownList>
                </DropdownListContext.Provider>
            </Dropdown>
        );
    };

    /** Открывает/закрывает Dropdown. */
    private setOpenedDropdown = (opened: boolean) => {
        this.setState({opened});
    };

    /** Обработчик кнопки, раскрывающей список. */
    private handleTargetClick = () => {
        const {opened} = this.state;
        this.setState({opened: !opened});
    };

    /** Обработчик клика по табу. */
    private handleClickTab = (tab: ITabsLineItemProps) => {
        const {onClickTab} = this.props;
        const {opened} = this.state;

        onClickTab(tab);
        this.setState({opened: !opened});
    };

    /** Обработчик нажатия клавиш по кнопке, раскрывающей список. */
    private handleTargetKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        const {opened} = this.state;

        if (!opened) {
            // При нажатии Enter, Space, ArrowUp или ArrowDown открывается выпадающий список.
            if (
                [EVENT_KEY_CODES.SPACE, EVENT_KEY_CODES.ENTER, EVENT_KEY_CODES.ARROW_DOWN, EVENT_KEY_CODES.ARROW_UP].includes(event.keyCode)
            ) {
                event.preventDefault();
                this.setState({opened: true});
            }
        }

        if (opened) {
            // При нажатии Tab или Esc закрывается выпадающий список.
            if ([EVENT_KEY_CODES.TAB, EVENT_KEY_CODES.ESCAPE].includes(event.keyCode)) {
                this.setState({opened: false});
            }
        }
    };

    /** Обработчик клика вне дропдауна. */
    private handleClickOutside = (event: Event) => {
        const {opened} = this.state;

        if (opened) {
            if (!this.targetRef.current?.contains(event.target as Node) && !this.dropdownRef.current?.contains(event.target as Node)) {
                this.setState({opened: false});
            }
        }
    };
}
