import * as React from 'react';
import {ELinkSize, ELinkType, ILinkTextProps, Link} from '../../../Link/Link';

interface IHeaderTitleLinkProps extends Omit<ILinkTextProps, 'linkType' | 'size'> {}

/**
 * Ссылка. Может вести к началу сценария/раздела.
 */
export class HeaderTitleLink extends React.PureComponent<IHeaderTitleLinkProps> {
    public static displayName = 'HeaderTitleLink';

    public render(): React.ReactNode {
        const {children, ...linkProps} = this.props;

        return (
            <div className="cssClass[headerTopLinkWrapper]">
                <Link {...linkProps} linkType={ELinkType.TEXT} size={ELinkSize.LG}>
                    {children}
                </Link>
            </div>
        );
    }
}
