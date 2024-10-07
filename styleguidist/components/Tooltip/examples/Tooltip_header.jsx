import React from 'react';
import {HintSrvIcon16} from '@sberbusiness/icons/HintSrvIcon16';
import {Tooltip} from '@sberbusiness/triplex/components/Tooltip/Tooltip';
import {ETooltipSize} from '@sberbusiness/triplex/components/Tooltip/enums';
import {ButtonIcon} from '@sberbusiness/triplex/components/Button/ButtonIcon';
import {EButtonIconShape} from '@sberbusiness/triplex/components/Button/enums';
import './styles.less';

<div className="tooltip-target">
    <Tooltip size={ETooltipSize.SM} toggleType="hover">
        <Tooltip.MobileHeader>Заголовок</Tooltip.MobileHeader>
        <Tooltip.Body>Текст подсказки.</Tooltip.Body>
        <Tooltip.Target>
            <ButtonIcon shape={EButtonIconShape.CIRCLE}>
                <HintSrvIcon16 />
            </ButtonIcon>
        </Tooltip.Target>
    </Tooltip>
</div>
