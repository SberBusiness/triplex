import {SpinnersmallwhiteAniIcon20} from '@sberbusiness/icons/SpinnersmallwhiteAniIcon20';
import {ButtonBase, IMobileButtonThemedProps} from '@sbbol/web-library/mobile/components/Button/ButtonBase';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import * as React from 'react';

export const ButtonGeneral: React.FC<IMobileButtonThemedProps> = ({className, ...props}) => (
    <ButtonBase
        className={classnames(className, 'cssClass[mobileButtonGeneral]')}
        spinnerIcon={<SpinnersmallwhiteAniIcon20 className="cssClass[globalMobileButtonSpinnerIcon]" />}
        {...props}
    />
);

ButtonGeneral.displayName = 'ButtonGeneral';
