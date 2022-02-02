import * as React from 'react';
import {useEffect, useState} from 'react';

/**
 * Обработчик события onMouseDown.
 */
export type TOnTargetMouseDown = (event: React.MouseEvent) => void;
/**
 * Render-функция children, onTargetMouseDown - ф-я обработчик клика по target.
 */
type TSliderExtendedMoveHandlerChildren = ({onTargetMouseDown}: {onTargetMouseDown: TOnTargetMouseDown}) => React.ReactNode;

export interface ISliderExtendedMoveHandlerProps {
    children: TSliderExtendedMoveHandlerChildren;
    onMouseMove: (event: MouseEvent) => void;
}

/**
 * Обработчик перемещения компонента. Отслеживает перемещение курсора после клика по target и вызывает onMouseMove.
 */
export const SliderExtendedMoveHandler: React.FC<ISliderExtendedMoveHandlerProps> = ({children, onMouseMove}) => {
    const [isSliding, setIsSliding] = useState(false);

    const handleMouseUp = () => setIsSliding(false);

    const addListeners = () => {
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const removeListeners = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    const handleMouseDown = () => {
        setIsSliding(true);
    };

    useEffect(() => {
        if (isSliding) {
            addListeners();
        }
        return () => {
            removeListeners();
        };
    }, [isSliding]);

    return <>{children({onTargetMouseDown: handleMouseDown})}</>;
};

SliderExtendedMoveHandler.displayName = 'SliderExtendedMoveHandler';
