import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {ESpinnerSize} from '@sberbusiness/triplex/components/Spinner/enum';
import {SpinnerWidget} from '@sberbusiness/triplex/components/SpinnerWidget/SpinnerWidget';
import React from 'react';

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
