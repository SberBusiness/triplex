import React from 'react';
import {LabelCodeNumber} from '@sberbusiness/triplex/components/Label/components/LabelCodeNumber';
import {LabelDescription} from '@sberbusiness/triplex/components/Label/components/LabelDescription';
import {LabelText} from '@sberbusiness/triplex/components/Label/components/LabelText';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента Label. */
export interface ILabelProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface ILabelFC extends React.FC<ILabelProps> {
    Text: typeof LabelText;
    CodeNumber: typeof LabelCodeNumber;
    Description: typeof LabelDescription;
}

/** Компонент Label. */
export const Label: ILabelFC = ({children, className, ...props}) => (
    <div className={classnames('cssClass[globalLabelWrapper]', className)} {...props} data-tx={process.env.npm_package_version}>
        {children}
    </div>
);

Label.displayName = 'Label';
Label.Text = LabelText;
Label.CodeNumber = LabelCodeNumber;
Label.Description = LabelDescription;
