import {HelpBoxLG} from '@sbbol/web-library/desktop/components/HelpBox/HelpBoxLG';
import {HelpBoxSM} from '@sbbol/web-library/desktop/components/HelpBox/HelpBoxSM';
import {LabelCodeNumber} from '@sbbol/web-library/desktop/components/Label/components/LabelCodeNumber';
import {LabelDescription} from '@sbbol/web-library/desktop/components/Label/components/LabelDescription';
import {LabelText} from '@sbbol/web-library/desktop/components/Label/components/LabelText';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import * as React from 'react';

export interface ILabelProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface ILabelFC extends React.FC<ILabelProps> {
    Text: typeof LabelText;
    HelpBoxLG: typeof HelpBoxLG;
    HelpBoxSM: typeof HelpBoxSM;
    CodeNumber: typeof LabelCodeNumber;
    Description: typeof LabelDescription;
}

/**
 * Компонент Label.
 */
export const Label: ILabelFC = ({children, className}) => (
    <div className={classnames('cssClass[globalLabelWrapper]', className)}>{children}</div>
);

Label.displayName = 'Label';
Label.Text = LabelText;
Label.HelpBoxLG = HelpBoxLG;
Label.HelpBoxSM = HelpBoxSM;
Label.CodeNumber = LabelCodeNumber;
Label.Description = LabelDescription;
