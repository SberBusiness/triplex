import {HeaderTitleContent} from '@sbbol/web-library/desktop/components/Header/components/HeaderTitle/HeaderTitleContent';
import {HeaderTitleLink} from '@sbbol/web-library/desktop/components/Header/components/HeaderTitle/HeaderTitleLink';
import {HeaderTitleSubhead} from '@sbbol/web-library/desktop/components/Header/components/HeaderTitle/HeaderTitleSubhead';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import * as React from 'react';

interface IHeaderTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Первый уровень Header. Содержит ссылку назад, заголовок, кнопки действий и подзаголовок.
 */
export class HeaderTitle extends React.Component<IHeaderTitleProps> {
    public static displayName = 'HeaderTitle';

    public static Link = HeaderTitleLink;
    public static Content = HeaderTitleContent;
    public static Subhead = HeaderTitleSubhead;

    public render(): React.ReactNode {
        const {children, className, ...htmlDivAttributes} = this.props;
        return (
            <div className={classnames(className, 'cssClass[globalHeaderTitle]')} {...htmlDivAttributes}>
                {children}
            </div>
        );
    }
}
