import {HelpBox, IHelpBoxProps} from '@sbbol/web-library/desktop/components/HelpBox/HelpBox';
import {ETooltipSize} from '@sbbol/web-library/desktop/components/Tooltip/enums';
import * as React from 'react';

/**
 * Свойства компонента HelpBox.
 */
export interface IHelpBoxSMProps extends Omit<IHelpBoxProps, 'tooltipSize'> {}

/**
 * Компонент HelpBoxSM. Иконка "?" со всплывающей подсказкой маленького размера.
 */
export const HelpBoxSM: React.FC<IHelpBoxSMProps> = (props) => <HelpBox tooltipSize={ETooltipSize.SM} {...props} />;

HelpBoxSM.displayName = 'HelpBoxSM';
