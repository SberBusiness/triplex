import {PaginatorleftNavIcon32} from '@sberbusiness/icons/PaginatorleftNavIcon32';
import {PaginatorrightNavIcon32} from '@sberbusiness/icons/PaginatorrightNavIcon32';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {ButtonIcon, IButtonIconProps} from '@sberbusiness/triplex/components/Button/ButtonIcon';
import {EButtonIconShape} from '@sberbusiness/triplex/components/Button/enums';
import React from 'react';
import {getDataHTMLAttributes, TDataHTMLAttributes} from '@sberbusiness/triplex/utils/HTML/DataAttributes';
import {TestIds} from '@sberbusiness/triplex/dataTestIds/dataTestIds';
import {Select, ISelectOption} from '@sberbusiness/triplex/components/Select/Select';
import {uniqueId} from '@sberbusiness/triplex/utils/uniqueId';

/** Свойства компонента TableBasicPagination. */
interface ITableBasicPaginationProps {
    /** Опции отображения количества строк в таблице. */
    rowNumberOptions: number[];
    /** Количество записей на страницу. */
    rowNumber?: number;
    /** Функция при выборе опции количества строк в таблице. */
    onSelectRowNumber: (option: number) => void;
    /** Номер текущей страницы в таблице. */
    currentPageNumber: number;
    /** Текст лейбла пагинации. */
    paginationLabel: string;
    /** Имеется ли предыдущая страница. */
    hasPrevPage: boolean;
    /** Имеется ли следующая страница. */
    hasNextPage: boolean;
    /** Функция при смене страницы на предыдущую. */
    onClickPrevPage: () => void;
    /** Функция при смене страницы на следующую. */
    onClickNextPage: () => void;
    children?: never;
    /** Состояние загрузки. */
    isLoading?: boolean;
    /** Data-атрибуты. */
    dataAttributes?: TDataHTMLAttributes;
    /** Свойства кнопки "Предыдущая страница". */
    buttonPrevProps?: Partial<IButtonIconProps>;
    /** Свойства кнопки "Следующая страница". */
    buttonNextProps?: Partial<IButtonIconProps>;
}

/** Компонент пагинации для таблицы. */
export class PaginationBasic extends React.PureComponent<ITableBasicPaginationProps> {
    public static displayName = 'PaginationBasic';

    // Уникальный id, для передачи aria-атрибутов accessibility.
    private instanceId = `PaginationBasic-${uniqueId()}`;

    public render(): JSX.Element {
        const {rowNumberOptions, rowNumber, currentPageNumber, hasNextPage, hasPrevPage, isLoading, paginationLabel, dataAttributes} =
            this.props;
        const dataTestId = dataAttributes ? dataAttributes['test-id'] : undefined;

        const options: ISelectOption[] = rowNumberOptions.map((o) => ({label: o, value: String(o)}));
        const filteredOptions = options.filter((x) => x.value === String(rowNumber));
        const selectedOption = filteredOptions.length ? filteredOptions[0] : options[0];

        return (
            <div className="cssClass[paginationWrapper]" {...(Boolean(dataAttributes) && getDataHTMLAttributes(dataAttributes!))}>
                <div className="cssClass[paginationSelectBlock]">
                    <div className="cssClass[paginationSelectText]" id={this.instanceId}>
                        {paginationLabel}
                    </div>
                    <div className="cssClass[paginationSelect]">
                        <Select
                            options={options}
                            value={selectedOption}
                            onChange={this.onSelectRowNumber}
                            disabled={isLoading}
                            aria-labelledby={this.instanceId}
                            data-test-id={dataTestId && `${dataTestId}${TestIds.Tables.PaginationBasic.select}`}
                        />
                    </div>
                </div>

                <span
                    className={classnames('cssClass[paginationIteratorBlock]', {
                        'cssClass[hidden]': !hasNextPage && !hasPrevPage,
                    })}
                >
                    {this.renderPrevButton(dataTestId)}
                    <span
                        className="cssClass[pageNumber]"
                        data-test-id={dataTestId && `${dataTestId}${TestIds.Tables.PaginationBasic.pageNumber}`}
                        aria-live="polite"
                    >
                        {currentPageNumber}
                    </span>
                    {this.renderNextButton(dataTestId)}
                </span>
            </div>
        );
    }

    private renderPrevButton = (dataTestId: string | undefined) => {
        const {buttonPrevProps, hasPrevPage, onClickPrevPage} = this.props;
        const dti = dataTestId && `${dataTestId}${TestIds.Tables.PaginationBasic.prevPage}`;

        return this.renderButtonIcon(<PaginatorleftNavIcon32 />, hasPrevPage, {...buttonPrevProps, onClick: onClickPrevPage}, dti);
    };

    private renderNextButton = (dataTestId: string | undefined) => {
        const {buttonNextProps, hasNextPage, onClickNextPage} = this.props;
        const dti = dataTestId && `${dataTestId}${TestIds.Tables.PaginationBasic.nextPage}`;

        return this.renderButtonIcon(<PaginatorrightNavIcon32 />, hasNextPage, {...buttonNextProps, onClick: onClickNextPage}, dti);
    };

    private renderButtonIcon = (icon: JSX.Element, isActive: boolean, buttonProps: Partial<IButtonIconProps>, dti?: string) => {
        const {isLoading} = this.props;
        const disabled = isLoading || !isActive;

        return (
            <span
                className={classnames({
                    'cssClass[disabled]': disabled,
                    'cssClass[paginationIteratorButton]': true,
                })}
            >
                <ButtonIcon disabled={disabled} data-test-id={dti} {...buttonProps} shape={EButtonIconShape.CIRCLE}>
                    {icon}
                </ButtonIcon>
            </span>
        );
    };

    private onSelectRowNumber = (option: ISelectOption) => {
        const {onSelectRowNumber} = this.props;
        return onSelectRowNumber(Number(option.value));
    };
}
