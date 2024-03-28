import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

// Позиция поля в группе.
export enum EInputGroupPosition {
    LEFT = 'left',
    INTERMEDIATE = 'intermediate',
    RIGHT = 'right',
}

/** Свойства компонента InputGroup. */
export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Группа полей для ввода информации. */
export const InputGroup: React.FC<InputGroupProps> = ({children, className, ...rest}) => {
    const count = React.Children.count(children);

    if (count < 2) {
        return <>{children}</>;
    }

    const elements = React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
            if (index === 0) {
                return React.cloneElement(child as React.ReactElement, {groupPosition: EInputGroupPosition.LEFT});
            } else if (index + 1 === count) {
                return React.cloneElement(child as React.ReactElement, {groupPosition: EInputGroupPosition.RIGHT});
            } else {
                return React.cloneElement(child as React.ReactElement, {groupPosition: EInputGroupPosition.INTERMEDIATE});
            }
        }
        return child;
    });

    return (
        <div className={classnames('cssClass[inputGroup]', className)} {...rest}>
            {elements}
        </div>
    );
};
