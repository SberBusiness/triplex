import {FooterDescriptionContent} from '@sbbol/web-library/desktop/components/Footer/components/FooterDescriptionContent';
import {FooterDescriptionControls} from '@sbbol/web-library/desktop/components/Footer/components/FooterDescriptionControls';
import * as React from 'react';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';

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
