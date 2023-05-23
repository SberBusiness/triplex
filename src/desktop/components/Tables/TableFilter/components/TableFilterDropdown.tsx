import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {TestProps} from '@sberbusiness/triplex/desktop/common/types/CoreTypes';
import {Dropdown} from '@sberbusiness/triplex/desktop/components/Dropdown/Dropdown';
import {CaretdownSrvxIcon16} from '@sberbusiness/icons/CaretdownSrvxIcon16';
import {EVENT_KEY_CODES} from '@sberbusiness/triplex/desktop/utils/keyboard';
import {ITableFilterItem} from '@sberbusiness/triplex/desktop/components/Tables/TableFilter';
import * as React from 'react';

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
    selected: ITableFilterItem;
    /** Атрибуты кнопки дропдауна. */
    targetHtmlAttributes?: React.HTMLAttributes<HTMLButtonElement> & TestProps;
}

/** Состояние компонента TableFilterDropdown. */
interface ITableFilterDropdownState {
    /** Состояние открытости дропдауна. */
    opened: boolean;
}

/** Компонент TableFilterDropdown. */
export class TableFilterDropdown extends React.PureComponent<ITableFilterDropdownProps, ITableFilterDropdownState> {
    state = {
        opened: false,
    };

    private readonly targetRef: React.RefObject<HTMLDivElement>;
    private readonly dropdownRef: React.RefObject<HTMLDivElement>;

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

    /** Рендер кнопки, раскрывающей список. */
    private renderTarget = () => {
        const {isActive, label, targetHtmlAttributes} = this.props;
        const {opened} = this.state;

        const buttonClassName = classnames('cssClass[filterItem]', 'cssClass[dropdownTarget]', {'cssClass[active]': isActive});
        const caretClassName = classnames('cssClass[dropdownTargetCaret]', {'cssClass[opened]': opened});

        return (
            <button
                {...targetHtmlAttributes}
                className={buttonClassName}
                onClick={this.handleTargetClick}
                onKeyDown={this.handleTargetKeyDown}
                type="button"
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
        const {opened} = this.state;

        return (
            <Dropdown className="cssClass[dropdown]" opened={opened} targetRef={this.targetRef} forwardedRef={this.dropdownRef}>
                <Dropdown.List dropdownOpened={opened}>
                    {filters.map((filter) => {
                        const {id, label, showNotificationIcon, ...htmlDivAttributes} = filter;
                        const className = classnames('cssClass[dropdownItem]', {
                            'cssClass[withNotification]': Boolean(filter.showNotificationIcon),
                        });

                        return (
                            <Dropdown.List.Item
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
                            </Dropdown.List.Item>
                        );
                    })}
                </Dropdown.List>
            </Dropdown>
        );
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
