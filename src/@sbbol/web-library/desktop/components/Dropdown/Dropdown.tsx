import * as React from 'react';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import {DropdownList} from './components/DropdownList';

/**
 * Свойства компонента Dropdown.
 *
 * @prop {boolean} opened Флаг открытости.
 */
export interface IDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
    opened: boolean;
}

/**
 * Компонент Dropdown.
 */
export class Dropdown extends React.Component<IDropdownProps> {
    public static List = DropdownList;

    public render(): JSX.Element {
        const {children, className, opened, ...htmlDivAttributes} = this.props;

        return (
            <div className={classnames('cssClass[dropdown]', {'cssClass[opened]': opened}, className)} {...htmlDivAttributes}>
                {children}
            </div>
        );
    }
}
