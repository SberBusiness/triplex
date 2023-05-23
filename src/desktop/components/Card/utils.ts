import {ECardRoundingSize} from '@sberbusiness/triplex/desktop/components/Card/enums';

/** Соответствие типа скругления карточки стилевому классу. */
export const mapCardRoundingSizeToCssClass = {
    [ECardRoundingSize.MD]: 'cssClass[roundingMD]',
    [ECardRoundingSize.SM]: 'cssClass[roundingSM]',
};
