import {Footer} from '@sberbusiness/triplex/desktop/components/Footer/Footer';
import * as React from 'react';

export const ModalWindowFooter: React.FC = ({children}) => (
    <div>
        <Footer className="cssClass[modalWindowFooter]">{children}</Footer>
    </div>
);

ModalWindowFooter.displayName = 'ModalWindowFooter';
