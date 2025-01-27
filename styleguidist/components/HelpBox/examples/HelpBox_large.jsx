import React from 'react';
import {HelpBox} from '@sberbusiness/triplex/components/HelpBox/HelpBox';
import {ETooltipSize} from '@sberbusiness/triplex/components/Tooltip/enums';
import {Gap} from '@sberbusiness/triplex/components/Gap/Gap';
import {TooltipLink} from '@sberbusiness/triplex/components/Tooltip/components/common/TooltipLink';

<HelpBox tooltipSize={ETooltipSize.LG}>
    Текст подсказки.
    <Gap size={16} />
    <TooltipLink href="#" onClick={(event) => event.preventDefault()}>
        Подробнее
    </TooltipLink>
</HelpBox>