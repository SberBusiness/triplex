import {FooterDescriptionContent} from '@sberbusiness/triplex/components/Footer/components/FooterDescriptionContent';
import {FooterDescriptionControls} from '@sberbusiness/triplex/components/Footer/components/FooterDescriptionControls';
import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/**
 * Футер, основная часть.
 */
export class FooterDescription extends React.PureComponent<React.HTMLAttributes<HTMLDivElement>> {
    public static displayName = 'FooterDescription';

    public static Content = FooterDescriptionContent;
    public static Controls = FooterDescriptionControls;

    public render(): JSX.Element {
        const {children, className, ...htmlDivAttributes} = this.props;

        return (
            <div className={classnames(className, 'cssClass[footerDescription]')} {...htmlDivAttributes}>
                {children}
            </div>
        );
    }
}
