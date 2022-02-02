import * as React from 'react';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';

interface IHeaderTitleContentTextProps extends React.HTMLAttributes<HTMLHeadingElement> {}

/**
 * Основной заголовок.
 */
export class HeaderTitleContentText extends React.PureComponent<IHeaderTitleContentTextProps> {
    public static displayName = 'HeaderTitleContentText';

    public render(): React.ReactNode {
        const {children, className, ...HTMLHeadingAttributes} = this.props;

        return (
            <h1 className={classnames(className, 'cssClass[headerTitleContentText]')} {...HTMLHeadingAttributes}>
                {children}
            </h1>
        );
    }
}
