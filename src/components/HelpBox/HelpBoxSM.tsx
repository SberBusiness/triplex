import {HelpBox, IHelpBoxProps} from '@sberbusiness/triplex/components/HelpBox/HelpBox';
import {ETooltipSize} from '@sberbusiness/triplex/components/Tooltip/enums';
import React from 'react';

/** Свойства компонента HelpBoxSM. */
export interface IHelpBoxSMProps extends Omit<IHelpBoxProps, 'tooltipSize'> {}

/**
 * Компонент HelpBoxSM. Иконка "?" со всплывающей подсказкой маленького размера.
 * @deprecated Используйте компонент HelpBox.
 */
export const HelpBoxSM: React.FC<IHelpBoxSMProps> = (props) => <HelpBox tooltipSize={ETooltipSize.SM} {...props} />;

HelpBoxSM.displayName = 'HelpBoxSM';
