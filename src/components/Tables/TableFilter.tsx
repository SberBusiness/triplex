import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import isEqual from 'lodash.isequal';
import {TestProps} from '@sberbusiness/triplex/types/CoreTypes';
import {TableFilterDropdown} from '@sberbusiness/triplex/components/Tables/TableFilter/components/TableFilterDropdown';
import React from 'react';

/** Свойства фильтра. */
export interface ITableFilterItem extends React.HTMLAttributes<HTMLButtonElement | HTMLDivElement>, TestProps {
    /** Идентификатор фильтра. */
    id: string;
    /** Отображаемое значение. */
    label: string;
    /** Флаг отображения значка новых уведомлений. */
    showNotificationIcon?: boolean;
}

/** Свойства компонента TableFilter. */
interface ITableFilterProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Атрибуты кнопки дропдауна. */
    dropdownTargetHtmlAttributes?: React.HTMLAttributes<HTMLButtonElement> & TestProps;
    /** Коллекция фильтров. */
    filters: ITableFilterItem[];
    /** Состояние загрузки. */
    isLoading?: boolean;
    /** Максимальное число отображаемых фильтров. */
    maxVisible?: number;
    /** Коллбек смены фильтра. */
    onFilterChange: (filterId: string) => void;
    /** Идентификатор выбранного фильтра. */
    selectedFilterId: string;
}

/** Состояние компонента TableFilter. */
interface ITableFilterState {
    /** Фильтры, отображаемые в дропдауне. */
    dropdownFilters: ITableFilterItem[];
    /** Видимые фильтры. */
    inlineFilters: ITableFilterItem[];
}

/** Компонент TableFilter. */
export class TableFilter extends React.PureComponent<ITableFilterProps, ITableFilterState> {
    public static displayName = 'TableFilter';

    constructor(props: ITableFilterProps) {
        super(props);

        this.state = this.calculateState();
    }

    public componentDidUpdate(prevProps: ITableFilterProps): void {
        const isUpdateRequired = !isEqual(this.props.filters, prevProps.filters) || this.props.maxVisible !== prevProps.maxVisible;
        if (isUpdateRequired) {
            this.setState(this.calculateState());
        }
    }

    public render(): JSX.Element {
        const {
            children,
            className,
            filters,
            isLoading,
            maxVisible,
            onFilterChange,
            selectedFilterId,
            dropdownTargetHtmlAttributes,
            ...htmlDivAttributes
        } = this.props;

        return (
            <div className={classnames(className, 'cssClass[tableFilterWrapper]')} {...htmlDivAttributes}>
                {Boolean(filters.length) && <div className="cssClass[tableFilter]">{this.renderFilters()}</div>}
            </div>
        );
    }

    private calculateState = (): ITableFilterState => {
        const {filters, maxVisible} = this.props;

        const dropdownFilters: ITableFilterItem[] = [];
        const inlineFilters: ITableFilterItem[] = [];

        filters.forEach((item: ITableFilterItem, i: number) => {
            const fromDropdown = maxVisible && i + 1 >= maxVisible && filters.length > maxVisible;
            const target = fromDropdown ? dropdownFilters : inlineFilters;

            target.push(item);
        });

        return {
            dropdownFilters,
            inlineFilters,
        };
    };

    private renderFilters = () => {
        const {dropdownTargetHtmlAttributes, selectedFilterId, onFilterChange} = this.props;
        const {dropdownFilters, inlineFilters} = this.state;

        const itemsToRender: JSX.Element[] = inlineFilters.map((item) => {
            const {id, label, showNotificationIcon, ...htmlButtonAttributes} = item;
            const isActive = id === selectedFilterId;
            const filterClassName = classnames('cssClass[filterItem]', {'cssClass[active]': isActive});
            return (
                <button
                    {...htmlButtonAttributes}
                    key={id}
                    className={filterClassName}
                    aria-pressed={isActive}
                    onClick={() => onFilterChange(item.id)}
                    type="button"
                >
                    <span className="cssClass[filterItemInner]">{label}</span>
                    {showNotificationIcon && <span className="cssClass[notificationIcon]" />}
                </button>
            );
        });

        if (dropdownFilters.length > 0) {
            const selectedFilter = dropdownFilters.find((item) => item.id === selectedFilterId);
            const dropdownLabel = selectedFilter ? selectedFilter.label : dropdownFilters[0].label;

            itemsToRender.push(
                <TableFilterDropdown
                    key="TableFilterDropdown"
                    filters={dropdownFilters}
                    isActive={selectedFilter !== undefined}
                    label={dropdownLabel}
                    onFilterClick={(item) => onFilterChange(item.id)}
                    selected={selectedFilter}
                    targetHtmlAttributes={dropdownTargetHtmlAttributes}
                />
            );
        }

        return itemsToRender;
    };
}
