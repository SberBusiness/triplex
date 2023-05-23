import {LabelCodeNumber} from '@sberbusiness/triplex/desktop/components/Label/components/LabelCodeNumber';
import {LabelDescription} from '@sberbusiness/triplex/desktop/components/Label/components/LabelDescription';
import {LabelText} from '@sberbusiness/triplex/desktop/components/Label/components/LabelText';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import * as React from 'react';

export interface ILabelProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface ILabelFC extends React.FC<ILabelProps> {
    Text: typeof LabelText;
    CodeNumber: typeof LabelCodeNumber;
    Description: typeof LabelDescription;
}

/**
 * Компонент Label.
 */
export const Label: ILabelFC = ({children, className, ...props}) => (
    <div className={classnames('cssClass[globalLabelWrapper]', className)} {...props}>
        {children}
    </div>
);

Label.displayName = 'Label';
Label.Text = LabelText;
Label.CodeNumber = LabelCodeNumber;
Label.Description = LabelDescription;
