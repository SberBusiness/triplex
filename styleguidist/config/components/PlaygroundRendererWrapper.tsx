import * as React from 'react';
import PlaygroundRenderer from 'react-styleguidist/lib/client/rsg-components/Playground/PlaygroundRenderer';

const PlaygroundRendererWrapper: React.FC<any> = (props) => (
    <PlaygroundRenderer {...props} toolbar={<span className="toolbar-wrapper">{props.toolbar}</span>} />
);

export default PlaygroundRendererWrapper;
