import React from 'react';
import {ECardRoundingSize} from '@sbbol/web-library/desktop/components/Card/enums';

/** Свойства карточки. */
export interface ICardProps extends React.HTMLAttributes<HTMLDivElement> {
    roundingSize?: ECardRoundingSize;
}
