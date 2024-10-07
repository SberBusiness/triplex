import React from 'react';
import {SpinnerlargeAniIcon64} from '@sberbusiness/icons/SpinnerlargeAniIcon64';
import {SpinnersmallAniIcon20} from '@sberbusiness/icons/SpinnersmallAniIcon20';
import {ESpinnerSize} from '@sberbusiness/triplex/components/Spinner/enum';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента Spinner. */
export interface ISpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Размер спиннера. */
    size?: ESpinnerSize;
}

/** Спиннер. */
export const Spinner: React.FC<ISpinnerProps> = ({children, className, size = ESpinnerSize.MD, ...htmlDivAttributes}) => {
    const isSM = size === ESpinnerSize.SM;

    return (
        <div
            className={classnames('cssClass[spinnerWrapper]', className)}
            {...htmlDivAttributes}
            data-tx={process.env.npm_package_version}
        >
            {isSM ? <SpinnersmallAniIcon20 className="cssClass[globalSpin]" /> : <SpinnerlargeAniIcon64 className="cssClass[globalSpin]" />}
            {children && <div className={classnames('cssClass[textWrapper]', {'cssClass[sm]': isSM})}>{children}</div>}
        </div>
    );
};

Spinner.displayName = 'Spinner';
