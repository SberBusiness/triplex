import {IRadioXGroupProps} from '@sbbol/web-library/desktop/components/Radio/types';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import {cssClass} from '@sbbol/web-library/desktop/utils/cssClass';
import * as React from 'react';

/**
 * Компонент RadioXGroup. Группа радио-кнопок с направлением по оси X.
 */
export class RadioXGroup extends React.PureComponent<IRadioXGroupProps> {
    public static displayName = 'RadioXGroup';

    public static defaultProps = {
        indent: 12,
    };

    public render(): JSX.Element {
        const {children, indent, ...htmlDivAttributes} = this.props;
        const classNames = classnames('cssClass[radioXGroup]', cssClass(`radioIndent-${indent!}`));

        return (
            <div className={classNames} role="radiogroup" {...htmlDivAttributes}>
                {children}
            </div>
        );
    }
}
