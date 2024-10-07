import React from 'react';

/** Свойства контекста StyleGuide. */
export interface IStyleguideContext {
    sidebarOpen: boolean;
    setSidebarOpen: (sidebarOpen: boolean) => void;
}

/** Контекст компонента StyleGuide. */
export const StyleGuideContext = React.createContext<IStyleguideContext>({
    setSidebarOpen: () => {},
    sidebarOpen: false,
});
