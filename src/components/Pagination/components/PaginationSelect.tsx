import React, {useRef} from 'react';
import {Select, ISelectProps} from '@sberbusiness/triplex/components/Select/Select';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {uniqueId} from '@sberbusiness/triplex/utils/uniqueId';

/** Свойства компонента PaginationSelect. */
export interface IPaginationSelectProps extends ISelectProps {
    /** Текст лейбла пагинации. */
    paginationLabel: React.ReactNode;
}

/** Выбор количества элементов на странице. */
export const PaginationSelect = React.forwardRef<HTMLDivElement, IPaginationSelectProps>(({paginationLabel, className, ...rest}, ref) => {
    const instanceId = useRef(`Pagination-${uniqueId()}`);

    return (
        <div className={classnames('cssClass[paginationSelect]', className)} ref={ref}>
            <div className="cssClass[paginationSelectLabel]" id={instanceId.current}>
                {paginationLabel}
            </div>
            <div className="cssClass[paginationSelectControl]">
                <Select aria-labelledby={instanceId.current} {...rest} />
            </div>
        </div>
    );
});

PaginationSelect.displayName = 'PaginationSelect';
