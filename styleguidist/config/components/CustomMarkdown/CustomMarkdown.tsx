import React, { useState } from 'react';
import Markdown from 'react-styleguidist/lib/client/rsg-components/Markdown/Markdown';
import StyleguidistAccordion, { IStyleguidistAccordionProvideProps } from '../../../common/components/StyleguidistAccordion/StyleguidistAccordion';
import MarkdownHeading from 'react-styleguidist/lib/client/rsg-components/Markdown/MarkdownHeading';
import TabButton from 'react-styleguidist/lib/client/rsg-components/TabButton';
import './styles.less';


/**
 * Свойства CustomMarkdown.
 *
 * @props {string} text Текст Markdown.
 */
interface ICustomMarkdownProps {
    text: string;
}

/**
 * Возвращает heading Markdown разметки, в случае если он содержит в названии '.tsx'.
 */
const getTitle = (text: string): string | undefined => {
    const regex = /###(.*)\n\n```html/gm;
    const title =  text.split(regex)[1];

    if (title && title.indexOf('collapsed') !== -1) {
        return title;
    }
}

const CustomMarkdown: React.FC<ICustomMarkdownProps> = ({text, ...props}) => {
    const title = getTitle(text);

    const [openedMarkdown, setOpenedMarkdown] = useState(false);

    const renderMarkdown = () => <Markdown text={text} {...props} />

    const renderTitle = ({opened, setOpened}: IStyleguidistAccordionProvideProps) => (
        <div className={`custom-markdown-title ${opened ? 'opened' : ''}`}>
            <MarkdownHeading level={3}>
                <TabButton className="gtm-view-static-code" active={opened} onClick={() => setOpened(!opened)} name={title || ''}>View static code</TabButton>
            </MarkdownHeading>
        </div>
    );

    return (
        <div className={title ? 'custom-markdown' : ''}>
            {title ? (
                <StyleguidistAccordion opened={openedMarkdown} setOpened={setOpenedMarkdown} title={renderTitle}>{renderMarkdown}</StyleguidistAccordion>
            ) : renderMarkdown()}
        </div>
    );
};

export default CustomMarkdown;
