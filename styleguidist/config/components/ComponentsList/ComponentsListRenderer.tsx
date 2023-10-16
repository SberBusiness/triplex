import React, {useState} from 'react';
import cx from 'clsx';
import Rsg from 'react-styleguidist/lib/typings';
import Link from 'react-styleguidist/lib/client/rsg-components/Link';
import {CaretdownSrvxIcon16} from '@sberbusiness/icons/CaretdownSrvxIcon16';
import './styles.less';

interface IComponentsListRendererProps {
    items: Rsg.TOCItem[];
}

const ComponentsListSectionRenderer: React.FunctionComponent<Rsg.TOCItem> = ({
    heading,
    visibleName,
    href,
    content,
    shouldOpenInNewTab,
    selected,
    initialOpen,
    forcedOpen,
}) => {
    const [open, setOpen] = useState(Boolean(initialOpen));

    return (
        <li className={cx('styleguide-components-list-section', {selected})} key={href}>
            <div className={cx('styleguide-components-list-section-heading', {selected, open})} onClick={() => setOpen(!open)}>
                <Link href={href} target={shouldOpenInNewTab ? '_blank' : undefined} data-testid="rsg-toc-link">
                    {visibleName}
                </Link>
                {content && <CaretdownSrvxIcon16 className="styleguide-components-list-section-heading-icon" />}
            </div>
            {open || forcedOpen ? content : null}
        </li>
    );
};

const ComponentsListRenderer: React.FC<IComponentsListRendererProps> = ({items}) => (
    <ul className="styleguide-components-list">
        {items.map((item) => (
            <ComponentsListSectionRenderer key={item.slug} {...item} />
        ))}
    </ul>
);

export default ComponentsListRenderer;
