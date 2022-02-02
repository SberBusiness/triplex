import * as React from 'react';
import {useEffect, useState, useRef} from 'react';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import {
    EOverlayDirection,
    IOverlayMaskProvideProps,
    IOverlayPanelProvideProps,
} from '@sbbol/web-library/desktop/components/Overlay/OverlayBase';
import {Overlay, IOverlayProps} from '@sbbol/web-library/desktop/components/Overlay/Overlay';
import {ModalFocusManager} from '../../ModalFocusManager/ModalFocusManager';

export interface ILightBoxTopOverlayProps extends Pick<IOverlayProps, 'opened' | 'onOpen' | 'onClose'> {}

export const LightBoxTopOverlay: React.FC<ILightBoxTopOverlayProps> = ({children, opened, onClose, onOpen, ...OverlayBaseProps}) => {
    // Флаг, в текущий момент оверлей закрывается.
    const [closing, setClosing] = useState(false);
    // Позиция top для lightBoxTopOverlayWrapper, высчитывается исходя из scrollTop родителя.
    const [overlayWrapperTopPosition, setOverlayWrapperTopPosition] = useState<number | string>(0);
    // Предыдущее состояние открыт/закрыт.
    const prevOpened = useRef(opened);
    // Ref контейнера.
    const overlayWrapperRef = useRef<HTMLDivElement | null>(null);

    const handleOpen = () => {
        // Перерасчет позиционирования оверлея, если он был открыт во время скролла родителя.
        if (overlayWrapperRef.current) {
            // Текущее положение оверлея.
            const position = overlayWrapperRef.current.getBoundingClientRect();
            // Оверлей расположен выше, чем нужно.
            if (position.top < 0) {
                setOverlayWrapperTopPosition(
                    (overlayWrapperTopPositionPrev) => parseInt(overlayWrapperTopPositionPrev as string, 10) + Math.abs(position.top)
                );
            } else {
                setOverlayWrapperTopPosition(
                    // Оверлей расположен ниже, чем нужно.
                    (overlayWrapperTopPositionPrev) => parseInt(overlayWrapperTopPositionPrev as string, 10) - position.top
                );
            }
        }

        onOpen?.();
    };

    useEffect(() => {
        // Флаг opened поменялся на false.
        if (prevOpened.current && !opened) {
            setClosing(true);

            // Флаг opened поменялся на true.
        } else if (!prevOpened.current && opened) {
            if (overlayWrapperRef.current) {
                const position = overlayWrapperRef.current.getBoundingClientRect();
                // position.top равен высоте скролла родителя.
                if (position.top !== overlayWrapperTopPosition) {
                    setOverlayWrapperTopPosition(Math.abs(position.top));
                }
            }
        }

        prevOpened.current = opened;
    }, [opened]);

    const handleClose = () => {
        setClosing(false);
        setOverlayWrapperTopPosition(0);
        onClose?.();
    };

    const renderMask = (maskProps: IOverlayMaskProvideProps) => (
        <Overlay.Mask {...maskProps} className="cssClass[lightBoxTopOverlayMask]" />
    );

    const renderPanel = (panelProps: IOverlayPanelProvideProps) => (
        <Overlay.Panel className="cssClass[lightBoxTopOverlayPanel]" {...panelProps}>
            {children}
        </Overlay.Panel>
    );

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const setOpened = () => {};

    return (
        <ModalFocusManager disabled={!opened}>
            <div
                className={classnames('cssClass[lightBoxTopOverlayWrapper]', {
                    'cssClass[closing]': closing,
                    'cssClass[opened]': opened,
                })}
                ref={overlayWrapperRef}
                style={{top: `${overlayWrapperTopPosition}px`}}
            >
                <Overlay
                    onClose={handleClose}
                    onOpen={handleOpen}
                    opened={opened}
                    setOpened={setOpened}
                    {...OverlayBaseProps}
                    className="cssClass[lightBoxTopOverlay]"
                    direction={EOverlayDirection.TOP}
                    mask={renderMask}
                    panel={renderPanel}
                />
            </div>
        </ModalFocusManager>
    );
};
