import React, {useEffect} from 'react';

interface IFullScreenModeHandlerProps {
    children?: never;
    enabled: boolean;
}
/**
 * Обработчик изменения FullScreen режима.
 */
const FullScreenModeHandler: React.FC<IFullScreenModeHandlerProps> = ({enabled}) => {
    useEffect(() => {
        if (enabled) {
            document.body.classList.add('enable-full-screen-mode');
        } else {
            document.body.classList.remove('enable-full-screen-mode');
        }
    }, [enabled])

    return null;
};

export default FullScreenModeHandler;
