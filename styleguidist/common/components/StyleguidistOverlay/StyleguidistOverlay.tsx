import React from 'react';
import './styles.less';

interface IStyleguidistOverlayProps {
    opened: boolean;
    onClick: () => void;
}

const StyleguidistOverlay: React.FC<IStyleguidistOverlayProps> = ({opened, onClick}) => (
    <div className={`styleguidist-overlay ${opened ? 'opened' : ''}`} onClick={onClick} />
);

export default StyleguidistOverlay;
