import React from 'react';
import {HintSrvIcon16} from '@sberbusiness/icons/HintSrvIcon16';
import {Tooltip} from '@sberbusiness/triplex/components/Tooltip/Tooltip';
import {ETooltipSize} from '@sberbusiness/triplex/components/Tooltip/enums';
import {Gap} from '@sberbusiness/triplex/components/Gap/Gap';
import {ButtonIcon} from '@sberbusiness/triplex/components/Button/ButtonIcon';
import {EButtonIconShape} from '@sberbusiness/triplex/components/Button/enums';
import './styles.less';

<div className="tooltip-target">
    <Tooltip size={ETooltipSize.SM} toggleType="hover">
        <Tooltip.Body>
            Текст подсказки.
            <Gap size={16} />
            <Tooltip.Link href="#" onClick={(event) => event.preventDefault()}>
                Текст ссылки
            </Tooltip.Link>
        </Tooltip.Body>
        <Tooltip.Target>
            <ButtonIcon shape={EButtonIconShape.CIRCLE}>
                <HintSrvIcon16 />
            </ButtonIcon>
        </Tooltip.Target>
    </Tooltip>
</div>
