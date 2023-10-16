import React from 'react';
import isEmpty from 'lodash/isEmpty';
import TabButton from 'react-styleguidist/lib/client/rsg-components/TabButton';
import {UsageTabButtonProps} from 'react-styleguidist/lib/client/rsg-components/slots/UsageTabButton';
import './styles.less';

const UsageTabButton: React.FC<UsageTabButtonProps> = (props) => {
    const component = props.props;

    if (isEmpty(component.props) && isEmpty(component.methods)) {
        return null;
    }

    const renderArrow = () => (
        <svg
            className="styleguide-usage-tab-button-arrow"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            focusable="false"
        >
            <path d="M5 9L10 13L15 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );

    return (
        <TabButton className="styleguide-usage-tab-button" {...props}>
            Props & Methods
            {renderArrow()}
        </TabButton>
    );
};

export default UsageTabButton;
