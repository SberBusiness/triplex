import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента WidgetHeaderControls. */
export interface IWidgetHeaderControlsProps extends React.HTMLAttributes<HTMLDivElement> {}

export const WidgetHeaderControls: React.FC<IWidgetHeaderControlsProps> = ({children, className, ...htmlDivAttributes}) => {
    /**
     * Предотвращает всплытие клика, т.к. по клику на хедер закроется тело виджета.
     */
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        // Клик по дочернему элементу(например кнопке). Всплытие останавливается, иначе виджет будет закрываться/открываться.
        if (event.target !== event.currentTarget) {
            event.stopPropagation();
        }
    };

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
        <div {...htmlDivAttributes} className={classnames(className, 'cssClass[widgetHeaderControls]')} onClick={handleClick}>
            {children}
        </div>
    );
};

WidgetHeaderControls.displayName = 'WidgetHeaderControls';
