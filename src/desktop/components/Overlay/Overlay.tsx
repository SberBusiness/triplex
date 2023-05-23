import * as React from 'react';
import {useState} from 'react';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {IOverlayBaseProps, OverlayBase} from './OverlayBase';
import {OverlayMask} from './OverlayMask';
import {OverlayPanel} from './OverlayPanel';

export interface IOverlayProps extends IOverlayBaseProps, Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    /**
     * Оврелей с фиксированным позиционированием на всю страницу, иначе с абсолютным поверх родителя.
     */
    fixed?: boolean;
}

export interface IOverlayFC extends React.FC<IOverlayProps> {
    Mask: typeof OverlayMask;
    Panel: typeof OverlayPanel;
}

/**
 * Оверлей элемента/страницы с выезжающей панелью.
 */
export const Overlay: IOverlayFC = ({
    children,
    className,
    direction,
    fixed,
    mask,
    onClose,
    onClosing,
    onOpening,
    onOpen,
    opened,
    panel,
    setOpened,
    ...htmlDivAttributes
}) => {
    // Флаг, в текущий момент оверлей закрывается.
    const [closing, setClosing] = useState(false);

    const handleClosing = () => {
        setClosing(true);
        onClosing?.();
    };

    const handleClose = () => {
        setClosing(false);
        onClose?.();
    };

    return (
        <div
            className={classnames('cssClass[overlay]', className, {
                'cssClass[closing]': closing,
                'cssClass[opened]': opened,
                'cssClass[fixed]': Boolean(fixed),
            })}
            {...htmlDivAttributes}
        >
            <OverlayBase
                direction={direction}
                mask={mask}
                onClose={handleClose}
                onClosing={handleClosing}
                onOpening={onOpening}
                onOpen={onOpen}
                opened={opened}
                panel={panel}
                setOpened={setOpened}
            />
        </div>
    );
};

Overlay.displayName = 'Overlay';
Overlay.Mask = OverlayMask;
Overlay.Panel = OverlayPanel;
