import {IRadioYGroupProps} from '@sbbol/web-library/desktop/components/Radio/types';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import * as React from 'react';

/**
 * Компонент RadioYGroup. Группа радио-кнопок с направлением по оси Y.
 */
export class RadioYGroup extends React.PureComponent<IRadioYGroupProps> {
    public static displayName = 'RadioYGroup';

    public render(): JSX.Element {
        const {children, ...htmlDivAttributes} = this.props;
        const classNames = classnames('cssClass[radioYGroup]');

        return (
            <div className={classNames} role="radiogroup" {...htmlDivAttributes}>
                {children}
            </div>
        );
    }
}
