import * as React from 'react';
import {useEffect, useState, useRef} from 'react';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {
    EOverlayDirection,
    IOverlayMaskProvideProps,
    IOverlayPanelProvideProps,
} from '@sberbusiness/triplex/desktop/components/Overlay/OverlayBase';
import {Overlay, IOverlayProps} from '@sberbusiness/triplex/desktop/components/Overlay/Overlay';
import {ModalFocusOnMount} from '@sberbusiness/triplex/desktop/components/ModalFocusManager/ModalFocusOnMount';

export interface ILightBoxTopOverlayProps extends Pick<IOverlayProps, 'opened' | 'onOpen' | 'onClose'> {}

export const LightBoxTopOverlay: React.FC<ILightBoxTopOverlayProps> = ({
    children,
    opened,
    onClose,
    onOpen,
    ...OverlayBaseProps
}) => {
    // Флаг, в текущий момент оверлей закрывается.
    const [closing, setClosing] = useState(false);
    // Позиция top для lightBoxTopOverlayWrapper, высчитывается исходя из scrollTop родителя.
    const [overlayWrapperTopPosition, setOverlayWrapperTopPosition] = useState<number | string>(0);
    // Предыдущее состояние открыт/закрыт.
    const prevOpened = useRef(opened);
    // Ref контейнера.
    const overlayWrapperRef = useRef<HTMLDivElement | null>(null);

    // Пересчет позиционирования оверлея. Бывает неверная позиция, например, при открытии во время скролла.
    const updateTopPosition = () => {
        // Перерасчет позиционирования оверлея, если он был открыт во время скролла родителя.
        if (overlayWrapperRef.current) {
            // Верхняя позиция LightBox.
            const lightBoxTopPosition = getComputedStyle(overlayWrapperRef.current).getPropertyValue('--lightBox-screen-top') || '0';
            // Текущее положение оверлея.
            const position = overlayWrapperRef.current.getBoundingClientRect();
            // Оверлей расположен выше, чем нужно.
            if (position.top < 0) {
                setOverlayWrapperTopPosition(
                    (overlayWrapperTopPositionPrev) =>
                        parseInt(overlayWrapperTopPositionPrev as string, 10) + Math.abs(position.top) + parseInt(lightBoxTopPosition, 10)
                );
            } else {
                setOverlayWrapperTopPosition(
                    // Оверлей расположен ниже, чем нужно.
                    (overlayWrapperTopPositionPrev) =>
                        parseInt(overlayWrapperTopPositionPrev as string, 10) - position.top + parseInt(lightBoxTopPosition, 10)
                );
            }
        }
    };

    const handleOpen = () => {
        updateTopPosition();

        onOpen?.();
    };

    useEffect(() => {
        // Флаг opened поменялся на false.
        if (prevOpened.current && !opened) {
            setClosing(true);

            // Флаг opened поменялся на true.
        } else if (!prevOpened.current && opened) {
            updateTopPosition();
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

    const classNameOverlayWrapper = classnames('cssClass[lightBoxTopOverlayWrapper]', {
        'cssClass[closing]': closing,
        'cssClass[opened]': opened,
    });

    const overlay = (
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
    );

    return (
        <ModalFocusOnMount disabled={!opened}>
            <div
                className={classNameOverlayWrapper}
                ref={overlayWrapperRef}
                style={overlayWrapperTopPosition ? {top: `${overlayWrapperTopPosition}px`} : undefined}
            >
                {overlay}
            </div>
        </ModalFocusOnMount>
    );
};
