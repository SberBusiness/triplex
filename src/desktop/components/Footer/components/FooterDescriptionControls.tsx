import * as React from 'react';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';

/**
 * Свойства компонента.
 */
interface IFooterDescriptionControlsProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Футер, кнопки действий основной части.
 */
export class FooterDescriptionControls extends React.PureComponent<IFooterDescriptionControlsProps> {
    public static displayName = 'FooterDescriptionControls';

    public render(): JSX.Element {
        const {children, className, ...htmlDivAttributes} = this.props;

        return (
            <div className={classnames(className, 'cssClass[footerDescriptionControls]')} {...htmlDivAttributes}>
                {children}
            </div>
        );
    }
}
