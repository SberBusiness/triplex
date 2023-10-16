import React, {useState} from 'react';
import Markdown from 'react-styleguidist/lib/client/rsg-components/Markdown/Markdown';
import StyleguidistAccordion, {IStyleguidistAccordionProvideProps} from '../../../common/components/StyleguidistAccordion/StyleguidistAccordion';
import TabButton from 'react-styleguidist/lib/client/rsg-components/TabButton';
import './styles.less';

/** Свойства CustomMarkdown. */
interface ICustomMarkdownProps {
    /** Текст Markdown. */
    text: string;
}

/** Возвращает heading Markdown разметки, в случае если он содержит в названии '.tsx'. */
const getTitle = (text: string): string | undefined => {
    const regex = /###(.*)\n\n```html/gm;
    const title = text.split(regex)[1];

    if (title && title.indexOf('collapsed') !== -1) {
        return title;
    }
};

const CustomMarkdown: React.FC<ICustomMarkdownProps> = ({text, ...props}) => {
    const title = getTitle(text);

    const [openedMarkdown, setOpenedMarkdown] = useState(false);

    const renderMarkdown = () => <Markdown text={text} {...props} />;

    const renderTitle = ({opened, setOpened}: IStyleguidistAccordionProvideProps) => (
        <div className={`custom-markdown-title ${opened ? 'opened' : ''}`}>
            <TabButton className="styleguide-static-code-tab-button gtm-view-static-code" {...props} onClick={() => setOpened(!opened)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" focusable="false">
                    <path d="M14 16L18 10L14 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M6 4L2 10L6 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            </TabButton>
        </div>
    );

    return (
        <div className={title ? 'custom-markdown' : ''}>
            {title ? (
                <StyleguidistAccordion opened={openedMarkdown} setOpened={setOpenedMarkdown} title={renderTitle}>
                    {renderMarkdown}
                </StyleguidistAccordion>
            ) : (
                renderMarkdown()
            )}
        </div>
    );
};

export default CustomMarkdown;
