import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента FooterDescriptionContent. */
interface IFooterDescriptionContentProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Футер, контент основной части. */
export class FooterDescriptionContent extends React.PureComponent<IFooterDescriptionContentProps> {
    public static displayName = 'FooterDescriptionContent';

    public render(): JSX.Element {
        const {children, className, ...htmlDivAttributes} = this.props;
        return (
            <div className={classnames(className, 'cssClass[footerDescriptionContent]')} {...htmlDivAttributes}>
                {children}
            </div>
        );
    }
}
