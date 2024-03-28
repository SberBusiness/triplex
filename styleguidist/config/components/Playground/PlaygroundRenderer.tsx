import React from 'react';
import cx from 'clsx';
import {useToken} from '@sberbusiness/triplex/components/ThemeProvider/useToken';
import {ETriplexTheme} from '@sberbusiness/triplex/components/ThemeProvider/ETriplexTheme';
import './styles.less';

interface PlaygroundRendererProps {
    exampleIndex: number;
    name?: string;
    padded: boolean;
    preview: React.ReactNode;
    previewProps: any;
    tabButtons: React.ReactNode;
    tabBody: React.ReactNode;
    toolbar: React.ReactNode;
}

const PlaygroundRenderer: React.FC<PlaygroundRendererProps> = ({
    exampleIndex,
    name,
    padded,
    preview,
    previewProps,
    tabButtons,
    tabBody,
    toolbar,
}) => {
    const {className, ...restProps} = previewProps;
    const {theme} = useToken();

    return (
        <div className="styleguide-playground">
            <div className={cx('styleguide-playground-preview', `${theme}-mode`, className, {padded})} {...restProps}>
                {preview}
            </div>
            <div className="styleguide-playground-controls">
                <div className="styleguide-playground-tabs">{tabButtons}</div>
                <div className="styleguide-playground-toolbar">{toolbar}</div>
            </div>
            <div className="styleguide-playground-tab">{tabBody}</div>
        </div>
    );
};

export default PlaygroundRenderer;
