import * as React from 'react';
import SectionHeadingRenderer from 'react-styleguidist/lib/client/rsg-components/SectionHeading/SectionHeadingRenderer';

const SectionHeadingRendererWrapper: React.FC<any> = (props) => (
    <SectionHeadingRenderer {...props} toolbar={<span className="toolbar-wrapper">{props.toolbar}</span>} />
);

export default SectionHeadingRendererWrapper;
