import React from 'react';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {ETextSize} from '@sberbusiness/triplex/desktop/components/Typography/enums';
import {Text} from '@sberbusiness/triplex/desktop/components/Typography/Text';

export interface IFormFieldDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Состояние ошибки. */
    error?: boolean;
}

/** Отображает дополнительную информацию под полем ввода. */
export const FormFieldDescription: React.FC<IFormFieldDescriptionProps> = ({children, className, error, ...htmlDivAttributes}) => (
    <Text
        className={classnames('cssClass[formFieldDescription]', {'cssClass[error]': Boolean(error)}, className)}
        size={ETextSize.B2}
        {...htmlDivAttributes}
        tag="div"
    >
        {children}
    </Text>
);

FormFieldDescription.displayName = 'FormFieldDescription';
