import {Footer} from '@sbbol/web-library/desktop/components/Footer/Footer';
import * as React from 'react';

export const ModalWindowFooter: React.FC = ({children}) => (
    <div className="cssClass[modalWindowFooter]">
        <Footer>{children}</Footer>
    </div>
);

ModalWindowFooter.displayName = 'ModalWindowFooter';
