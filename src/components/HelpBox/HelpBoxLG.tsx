import {HelpBox, IHelpBoxProps} from '@sberbusiness/triplex/components/HelpBox/HelpBox';
import {ETooltipSize} from '@sberbusiness/triplex/components/Tooltip/enums';
import React from 'react';

/**
 * Свойства компонента HelpBox.
 */
export interface IHelpBoxLGProps extends Omit<IHelpBoxProps, 'tooltipSize'> {}

/**
 * Компонент HelpBoxLG. Иконка "?" со всплывающей подсказкой большого размера.
 */
export const HelpBoxLG: React.FC<IHelpBoxLGProps> = (props) => <HelpBox tooltipSize={ETooltipSize.LG} {...props} />;

HelpBoxLG.displayName = 'HelpBoxLG';
