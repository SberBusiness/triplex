import {HeaderTitleContentControls} from '@sbbol/web-library/desktop/components/Header/components/HeaderTitle/HeaderTitleContentControls';
import {HeaderTitleContentText} from '@sbbol/web-library/desktop/components/Header/components/HeaderTitle/HeaderTitleContentText';
import * as React from 'react';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';

interface IHeaderTitleContentProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Часть HeaderTitle с заголовокм и кнопками действий.
 */
export class HeaderTitleContent extends React.PureComponent<IHeaderTitleContentProps> {
    public static displayName = 'HeaderTitleContent';

    public static Text = HeaderTitleContentText;
    public static Controls = HeaderTitleContentControls;

    public render(): React.ReactNode {
        const {children, className, ...htmlDivAttributes} = this.props;

        return (
            <div className={classnames(className, 'cssClass[headerTitleContent]')} {...htmlDivAttributes}>
                {children}
            </div>
        );
    }
}
