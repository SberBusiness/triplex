import {SpinnersmallAniIcon20} from '@sberbusiness/icons/SpinnersmallAniIcon20';
import {ButtonBase, IMobileButtonThemedProps} from '@sbbol/web-library/mobile/components/Button/ButtonBase';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import * as React from 'react';

export const ButtonSecondary: React.FC<IMobileButtonThemedProps> = ({className, ...props}) => (
    <ButtonBase
        className={classnames(className, 'cssClass[mobileButtonSecondary]')}
        spinnerIcon={<SpinnersmallAniIcon20 className="cssClass[globalMobileButtonSpinnerIcon]" />}
        {...props}
    />
);

ButtonSecondary.displayName = 'ButtonSecondary';
