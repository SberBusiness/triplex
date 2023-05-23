import React from 'react';
import {ECardRoundingSize} from '@sberbusiness/triplex/desktop/components/Card/enums';

/** Свойства карточки. */
export interface ICardProps extends React.HTMLAttributes<HTMLDivElement> {
    roundingSize?: ECardRoundingSize;
}
