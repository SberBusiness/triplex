import {SpinnerlargeAniIcon64} from '@sberbusiness/icons/SpinnerlargeAniIcon64';
import {SpinnersmallAniIcon20} from '@sberbusiness/icons/SpinnersmallAniIcon20';
import * as React from 'react';
import {ESpinnerSize} from '@sbbol/web-library/desktop/components/Spinner/enum';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';

export interface ISpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Размер спиннера. */
    size?: ESpinnerSize;
}

/**
 * Спиннер.
 *
 * @param {ISpinnerProps} props Параметры спиннера.
 */
export const Spinner: React.FC<ISpinnerProps> = ({children, className, size = ESpinnerSize.MD, ...htmlDivAttributes}) => {
    const isSm = size === ESpinnerSize.SM;
    const textWrapperClassNames = classnames('cssClass[textWrapper]', {'cssClass[sm]': isSm});

    return (
        <div className={classnames(className, 'cssClass[spinnerWrapper]')} {...htmlDivAttributes}>
            {isSm ? (
                <SpinnersmallAniIcon20 className="cssClass[theme__default_spin]" />
            ) : (
                <SpinnerlargeAniIcon64 className="cssClass[theme__default_spin]" />
            )}
            {children && <div className={textWrapperClassNames}>{children}</div>}
        </div>
    );
};

Spinner.displayName = 'Spinner';
