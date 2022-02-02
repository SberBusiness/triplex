import * as React from 'react';

export interface IModalFocusManagerContext {
    // Активен родительский ModalFocusManager.
    parentFocusManagerEnabled: boolean;
}

export const initialModalFocusManagerContext = {
    parentFocusManagerEnabled: false,
};

export const ModalFocusManagerContext = React.createContext<IModalFocusManagerContext>(initialModalFocusManagerContext);
