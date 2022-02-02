import * as React from 'react';
import {TIndentSize} from '../../common/consts/IndentConst';
import {cssClass} from '@sbbol/web-library/desktop/utils/cssClass';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';

/** Свойства компонента CheckboxXGroup. */
export interface ICheckboxXGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    indent?: TIndentSize;
}

/** Компонент 'Группа чекбоксов с направлением по оси X.' */
export class CheckboxXGroup extends React.PureComponent<ICheckboxXGroupProps> {
    public static displayName = 'CheckboxXGroup';

    public static defaultProps = {
        indent: 12,
    };

    public render(): JSX.Element {
        const {children, indent, ...htmlDivAttributes} = this.props;
        const classNames = classnames('cssClass[checkboxXGroup]', cssClass(`checkboxIndent-${indent!}`));

        return (
            <div className={classNames} role="group" {...htmlDivAttributes}>
                {children}
            </div>
        );
    }
}
