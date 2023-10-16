import {Footer} from '@sberbusiness/triplex/components/Footer/Footer';
import React from 'react';

export const ModalWindowFooter: React.FC = ({children}) => (
    <div>
        <Footer className="cssClass[modalWindowFooter]">{children}</Footer>
    </div>
);

ModalWindowFooter.displayName = 'ModalWindowFooter';
