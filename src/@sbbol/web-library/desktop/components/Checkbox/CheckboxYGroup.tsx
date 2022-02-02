import * as React from 'react';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';

/** Свойства компонента CheckboxYGroup. */
export interface ICheckboxYGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Компонент 'Группа чекбоксов с направлением по оси Y.' */
export class CheckboxYGroup extends React.PureComponent<ICheckboxYGroupProps> {
    public static displayName = 'CheckboxYGroup';

    public render(): JSX.Element {
        const {children, ...htmlDivAttributes} = this.props;
        const classNames = classnames('cssClass[checkboxYGroup]');

        return (
            <div className={classNames} role="group" {...htmlDivAttributes}>
                {children}
            </div>
        );
    }
}
