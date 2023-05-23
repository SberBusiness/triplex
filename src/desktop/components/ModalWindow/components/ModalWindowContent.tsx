import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {ESpinnerSize} from '@sberbusiness/triplex/desktop/components/Spinner/enum';
import {SpinnerWidget} from '@sberbusiness/triplex/desktop/components/SpinnerWidget/SpinnerWidget';
import * as React from 'react';

interface IModalWindowContentProps {
    /** Состояние загрузки.*/
    isLoading?: boolean;
    /** Текст под спиннером.*/
    loadingTitle?: React.ReactNode;
}

/** Компонент контента модального окна. */
export const ModalWindowContent: React.FC<IModalWindowContentProps> = ({isLoading, loadingTitle, children}) => {
    const className = classnames('cssClass[modalWindowContent]', {'cssClass[isLoading]': !!isLoading});

    return (
        <div className={className}>
            {children}
            {isLoading && (
                <>
                    <SpinnerWidget className="cssClass[spinner]">{loadingTitle}</SpinnerWidget>
                    <SpinnerWidget className="cssClass[spinnerSm]" size={ESpinnerSize.SM}>
                        {loadingTitle}
                    </SpinnerWidget>
                </>
            )}
        </div>
    );
};
