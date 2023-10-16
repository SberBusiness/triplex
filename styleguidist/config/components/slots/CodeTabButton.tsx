import React from 'react';
import TabButton from 'react-styleguidist/lib/client/rsg-components/TabButton';
import './styles.less';

const CodeTabButton: React.FC = (props) => (
    <TabButton className="styleguide-code-tab-button gtm-view-code" {...props}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" focusable="false">
            <path d="M14 16L18 10L14 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M6 4L2 10L6 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    </TabButton>
);

export default CodeTabButton;
