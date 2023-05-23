import * as React from 'react';
import {ELinkSize, ELinkType, ILinkTextProps, Link} from '../../../Link/Link';

interface IHeaderLinkProps extends Omit<ILinkTextProps, 'linkType' | 'size'> {}

/**
 * Ссылка. Может вести к началу сценария/раздела.
 */
export const HeaderLink: React.FC<IHeaderLinkProps> = ({children, ...linkProps}) => (
    <div className={'cssClass[headerLink]'}>
        <Link {...linkProps} linkType={ELinkType.TEXT} size={ELinkSize.LG}>
            {children}
        </Link>
    </div>
);

HeaderLink.displayName = 'HeaderLink';
