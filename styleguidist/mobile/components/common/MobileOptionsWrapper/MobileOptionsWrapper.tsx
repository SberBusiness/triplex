import * as React from 'react';
import './styles.less';

/**
 * Wrapper для конфигурации props компонента.
 */
export const MobileOptionsWrapper: React.FC = ({children}) => <div className="mobile-options-wrapper">{children}</div>;
