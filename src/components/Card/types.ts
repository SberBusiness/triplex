import React from 'react';
import {ECardRoundingSize} from '@sberbusiness/triplex/components/Card/enums';

/** Свойства карточки. */
export interface ICardProps extends React.HTMLAttributes<HTMLDivElement> {
    roundingSize?: ECardRoundingSize;
}
