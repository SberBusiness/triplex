import * as React from 'react';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';

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

    /* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
    return (
        <div {...htmlDivAttributes} className={classnames(className, 'cssClass[widgetHeaderControls]')} onClick={handleClick}>
            {children}
        </div>
    );
};

WidgetHeaderControls.displayName = 'WidgetHeaderControls';
