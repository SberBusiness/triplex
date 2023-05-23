import React, { useState } from 'react';
import Link from 'react-styleguidist/lib/client/rsg-components/Link';
import {CaretdownSrvxIcon16} from '@sberbusiness/icons/CaretdownSrvxIcon16';
import * as Rsg from 'react-styleguidist/lib/typings';
import StyleguidistAccordion, { IStyleguidistAccordionProvideProps } from '../../../common/components/StyleguidistAccordion/StyleguidistAccordion';
import {StyleguidistSettingsContext} from '../../../common/components/StyleguidistSettings/StyleguidistSettings';
import './styles.less';

interface ICustomComponentsListSectionRendererProps extends Rsg.TOCItem {}

/**
 * Компонент основного меню.
 */
const CustomComponentsListSectionRenderer: React.FC<ICustomComponentsListSectionRendererProps> = ({
    heading,
    visibleName,
    href,
    content,
    shouldOpenInNewTab,
    selected,
    initialOpen,
    forcedOpen,
}) => {
    const [open, setOpen] = React.useState(!!initialOpen);
    const {collapsedMenu} = React.useContext(StyleguidistSettingsContext);
    const linkClassName = selected ? 'link-selected' : '';

    const handleClickLink = () => {
        // @ts-ignore
        dataLayer.push({
            'event': 'menu_link_click',
            'main_menu_link_href': href,
            'main_menu_link_title': visibleName,
        });
    }

    const renderTitle = ({opened, setOpened}: IStyleguidistAccordionProvideProps) => (
        <div className={`heading ${opened || forcedOpen ? 'opened' : ''}`}>
            {collapsedMenu.enabled && <span onClick={() => setOpened(!open)}><CaretdownSrvxIcon16 className={`icon-caret ${forcedOpen ? 'disabled' : ''}`} /></span>}
            <Link
                className={linkClassName}
                href={href}
                onClick={() => {
                    handleClickLink();
                    setOpened(!open);
                }}
                target={shouldOpenInNewTab ? '_blank' : undefined}
            >
                {visibleName}
            </Link>
        </div>
    );

    const renderContent = () => content;

    return (
        <li key={href} className="components-list-renderer-item">
            {content ? (
                <StyleguidistAccordion
                    opened={!collapsedMenu.enabled || open || forcedOpen}
                    setOpened={setOpen}
                    title={renderTitle}
                >
                    {renderContent}
                </StyleguidistAccordion>
            ) : (
                <Link
                    className={linkClassName}
                    href={href}
                    target={shouldOpenInNewTab ? '_blank' : undefined}
                    onClick={handleClickLink}
                >
                    {visibleName}
                </Link>
            )}
        </li>
    )
};

interface ICustomComponentsListRenderer {
    items: Rsg.TOCItem[];
}

/**
 * Компонент основного меню.
 */
export const CustomComponentsListRenderer: React.FunctionComponent<ICustomComponentsListRenderer> = ({items}) => (
    <ul className="components-list-renderer">
        {items.map((item) => (
            <CustomComponentsListSectionRenderer key={item.slug} {...item} />
        ))}
    </ul>
);

export default CustomComponentsListRenderer;
