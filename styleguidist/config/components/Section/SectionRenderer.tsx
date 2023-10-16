import React from 'react';
import SectionHeading from 'react-styleguidist/lib/client/rsg-components/SectionHeading';
import Markdown from '../CustomMarkdown/CustomMarkdown';
import './styles.less';

interface SectionRendererProps {
    slug: string;
    depth: number;
    name?: string;
    description?: string;
    content?: React.ReactNode;
    components?: React.ReactNode;
    sections?: React.ReactNode;
    isolated?: boolean;
    pagePerSection?: boolean;
    [prop: string]: any;
}

const SectionRenderer: React.FC<SectionRendererProps> = (props) => {
    const {name, slug, content, components, sections, depth, description, pagePerSection} = props;

    return (
        <section className="styleguide-section">
            {name && (
                <SectionHeading depth={depth} id={slug} slotName="sectionToolbar" pagePerSection={pagePerSection} slotProps={props}>
                    {name}
                </SectionHeading>
            )}
            {description && <Markdown text={description} />}
            {content}
            {sections}
            {components}
        </section>
    );
};

export default SectionRenderer;
