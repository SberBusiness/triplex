import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {TestProps} from '@sberbusiness/triplex/types/CoreTypes';
import {Dropdown} from '@sberbusiness/triplex/components/Dropdown/Dropdown';
import {DropdownList} from '@sberbusiness/triplex/components/Dropdown/desktop/DropdownList';
import {CaretdownSrvxIcon16} from '@sberbusiness/icons/CaretdownSrvxIcon16';
import {EVENT_KEY_CODES} from '@sberbusiness/triplex/utils/keyboard';
import {ITableFilterItem} from '@sberbusiness/triplex/components/Tables/TableFilter';
import {DropdownListContext} from '@sberbusiness/triplex/components/Dropdown/DropdownListContext';
import {uniqueId} from '@sberbusiness/triplex/utils/uniqueId';

/** Свойства компонента TableFilterDropdown. */
interface ITableFilterDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Фильтры дропдауна. */
    filters: ITableFilterItem[];
    /** Выбранный фильтр находится в дропдауне. */
    isActive: boolean;
    /** Текст таргет кнопки дропдауна. */
    label: string;
    /** Коллбэк выбора фильтра. */
    onFilterClick: (filter: ITableFilterItem) => void;
    /** Выбранный фильтр. */
    selected?: ITableFilterItem;
    /** Атрибуты кнопки дропдауна. */
    targetHtmlAttributes?: React.HTMLAttributes<HTMLButtonElement> & TestProps;
}

/** Состояние компонента TableFilterDropdown. */
interface ITableFilterDropdownState {
    /** Текущий активный элемент (его идентификатор). */
    activeDescendant?: string;
    /** Состояние открытости дропдауна. */
    opened: boolean;
}

/** Компонент TableFilterDropdown. */
export class TableFilterDropdown extends React.PureComponent<ITableFilterDropdownProps, ITableFilterDropdownState> {
    state = {
        activeDescendant: undefined,
        opened: false,
    };

    private readonly targetRef: React.RefObject<HTMLDivElement>;
    private readonly dropdownRef: React.RefObject<HTMLDivElement>;
    private instanceId = uniqueId();

    constructor(props: ITableFilterDropdownProps) {
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
            <div className="cssClass[tableFilterDropdown]" ref={this.targetRef}>
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

        const buttonClassName = classnames('cssClass[filterItem]', 'cssClass[dropdownTarget]', {'cssClass[active]': isActive});
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
                <span className="cssClass[filterItemInner]">
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
        const {filters, selected} = this.props;
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
                        {filters.map((filter) => {
                            const {id, label, showNotificationIcon, ...htmlDivAttributes} = filter;
                            const className = classnames('cssClass[dropdownItem]', {
                                'cssClass[withNotification]': Boolean(filter.showNotificationIcon),
                            });

                            return (
                                <DropdownList.Item
                                    {...htmlDivAttributes}
                                    className={className}
                                    id={filter.id}
                                    key={filter.id}
                                    onSelect={() => {
                                        this.handleFilterClick(filter);
                                    }}
                                    selected={filter === selected}
                                >
                                    <span className="cssClass[dropdownItemInner]">{filter.label}</span>
                                    {filter.showNotificationIcon && <span className="cssClass[notificationIcon]" />}
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

    /** Обработчик клика по фильтру. */
    private handleFilterClick = (filter: ITableFilterItem) => {
        const {onFilterClick} = this.props;
        const {opened} = this.state;

        onFilterClick(filter);
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
