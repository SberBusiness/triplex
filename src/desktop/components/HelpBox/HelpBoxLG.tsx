import {HelpBox, IHelpBoxProps} from '@sberbusiness/triplex/desktop/components/HelpBox/HelpBox';
import {ETooltipSize} from '@sberbusiness/triplex/desktop/components/Tooltip/enums';
import * as React from 'react';

/**
 * Свойства компонента HelpBox.
 */
export interface IHelpBoxLGProps extends Omit<IHelpBoxProps, 'tooltipSize'> {}

/**
 * Компонент HelpBoxLG. Иконка "?" со всплывающей подсказкой большого размера.
 */
export const HelpBoxLG: React.FC<IHelpBoxLGProps> = (props) => <HelpBox tooltipSize={ETooltipSize.LG} {...props} />;

HelpBoxLG.displayName = 'HelpBoxLG';
