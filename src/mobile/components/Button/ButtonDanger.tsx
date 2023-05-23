import {SpinnersmallwhiteAniIcon20} from '@sberbusiness/icons/SpinnersmallwhiteAniIcon20';
import {ButtonBase, IMobileButtonThemedProps} from '@sberbusiness/triplex/mobile/components/Button/ButtonBase';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import * as React from 'react';

export const ButtonDanger: React.FC<IMobileButtonThemedProps> = ({className, ...props}) => (
    <ButtonBase
        className={classnames(className, 'cssClass[mobileButtonDanger]')}
        spinnerIcon={<SpinnersmallwhiteAniIcon20 className="cssClass[globalMobileButtonSpinnerIcon]" />}
        {...props}
    />
);

ButtonDanger.displayName = 'ButtonDanger';
