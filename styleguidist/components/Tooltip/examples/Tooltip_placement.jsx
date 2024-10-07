import React from 'react';
import {HintSrvIcon16} from '@sberbusiness/icons/HintSrvIcon16';
import {Tooltip} from '@sberbusiness/triplex/components/Tooltip/Tooltip';
import {ETooltipSize, ETooltipPreferPlace} from '@sberbusiness/triplex/components/Tooltip/enums';
import {ButtonIcon} from '@sberbusiness/triplex/components/Button/ButtonIcon';
import {EButtonIconShape} from '@sberbusiness/triplex/components/Button/enums';
import './styles.less';

const renderTooltip = (preferPlace) => (
    <div className="tooltip-target">
        <Tooltip size={ETooltipSize.SM} toggleType="hover" preferPlace={preferPlace}>
            <Tooltip.Body>Текст подсказки.</Tooltip.Body>
            <Tooltip.Target>
                <ButtonIcon shape={EButtonIconShape.CIRCLE}>
                    <HintSrvIcon16 />
                </ButtonIcon>
            </Tooltip.Target>
        </Tooltip>
    </div>
);

<div style={{display: 'flex', textAlign: 'center'}}>
    <div style={{flex: '1 1 0'}}>
        <div>Left</div>
        {renderTooltip(ETooltipPreferPlace.LEFT)}
    </div>
    <div style={{flex: '1 1 0'}}>
        <div>Above</div>
        {renderTooltip(ETooltipPreferPlace.ABOVE)}
    </div>
    <div style={{flex: '1 1 0'}}>
        <div>Below</div>
        {renderTooltip(ETooltipPreferPlace.BELOW)}
    </div>
    <div style={{flex: '1 1 0'}}>
        <div>Right</div>
        {renderTooltip(ETooltipPreferPlace.RIGHT)}
    </div>
</div>