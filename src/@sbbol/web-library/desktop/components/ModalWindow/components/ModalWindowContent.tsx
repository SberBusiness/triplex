import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import {SpinnerWidget} from '@sbbol/web-library/desktop/components/SpinnerWidget/SpinnerWidget';
import * as React from 'react';

interface IModalWindowContentProps {
    /** Состояние загрузки.*/
    isLoading?: boolean;
}

/** Компонент контента модального окна. */
export const ModalWindowContent: React.FC<IModalWindowContentProps> = ({isLoading, children}) => {
    const className = classnames({'cssClass[modalWindowContent]': true, 'cssClass[isLoading]': !!isLoading});

    return (
        <div className={className}>
            {children}
            {isLoading && <SpinnerWidget key="spinner" />}
        </div>
    );
};
