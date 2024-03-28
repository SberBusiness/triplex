import React from 'react';
import {FooterDescriptionContent} from '@sberbusiness/triplex/components/Footer/components/FooterDescriptionContent';
import {FooterDescriptionControls} from '@sberbusiness/triplex/components/Footer/components/FooterDescriptionControls';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента FooterDescription. */
interface IFooterDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Футер, основная часть. */
export class FooterDescription extends React.PureComponent<IFooterDescriptionProps> {
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
