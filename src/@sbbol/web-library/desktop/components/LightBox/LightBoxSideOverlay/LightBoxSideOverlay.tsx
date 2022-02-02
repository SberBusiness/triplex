import * as React from 'react';
import {useEffect, useState, useRef} from 'react';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import {
    EOverlayDirection,
    IOverlayMaskProvideProps,
    IOverlayBaseProps,
    OverlayBase,
} from '@sbbol/web-library/desktop/components/Overlay/OverlayBase';
import {OverlayMask} from '../../Overlay/OverlayMask';
import {LightBoxSideOverlayClose} from './LightBoxSideOverlayClose';
import {LightBoxSideOverlayLoader} from './LightBoxSideOverlayLoader';
import {ModalFocusManager} from '../../ModalFocusManager/ModalFocusManager';

export enum ELightBoxSideOverlaySize {
    SM,
    MD,
    LG,
}

export interface ILightBoxSideOverlayProps
    extends Pick<IOverlayBaseProps, 'opened' | 'onClose' | 'onOpen'>,
        Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    isLoading?: boolean;
    /**
     * Открыт другой SideOverlay поверх текущего.
     */
    isTopLevelSideOverlayOpened?: boolean;
    /**
     * Открыт TopOverlay в текущей SideOverlay.
     */
    isTopOverlayOpened?: boolean;
    size?: ELightBoxSideOverlaySize;
}

export interface ILightBoxSideOverlayFC extends React.FC<ILightBoxSideOverlayProps> {
    Close: typeof LightBoxSideOverlayClose;
}

/**
 * Боковая панель LightBox.
 * Выезжает из правой границы LightBox.
 */
export const LightBoxSideOverlay: ILightBoxSideOverlayFC = ({
    children,
    className,
    isLoading,
    isTopLevelSideOverlayOpened,
    isTopOverlayOpened,
    onClose,
    onOpen,
    opened,
    size = ELightBoxSideOverlaySize.MD,
    ...htmlDivAttributes
}) => {
    // Флаг, в текущий момент оверлей закрывается.
    const [closing, setClosing] = useState(false);
    // Флаг, в текущий момент оверлей открывается.
    const [opening, setOpening] = useState(false);
    // Предыдущее состояние открыт/закрыт.
    const prevOpened = useRef(opened);

    useEffect(() => {
        if (prevOpened.current && !opened) {
            setOpening(false); // opened меняется в процессе анимации открытия.
            setClosing(true);
        } else if (!prevOpened.current && opened) {
            setClosing(false); // opened меняется в процессе анимации закрытия.
            setOpening(true);
        }

        prevOpened.current = opened;
    }, [opened]);

    const handleTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
        const {target, currentTarget} = event;

        if (target === currentTarget) {
            if (closing) {
                setClosing(false);
                onClose?.();
            } else if (opening) {
                setOpening(false);
                onOpen?.();
            }
        }
    };

    const renderMask = (maskProps: IOverlayMaskProvideProps) =>
        // Маска рендерится у SideOverlay самого верхнего уровня, чтобы маски не накладывались друг на друга.
        isTopLevelSideOverlayOpened ? null : <OverlayMask {...maskProps} className="cssClass[lightBoxSideOverlayMask]" />;

    const renderPanel = () => (
        <div
            className={classnames('cssClass[lightBoxSideOverlayContent]', {
                'cssClass[closing]': closing,
                'cssClass[opening]': opening,
                'cssClass[opened]': opened,
            })}
            onTransitionEnd={handleTransitionEnd}
        >
            {children}

            {isLoading && <LightBoxSideOverlayLoader />}
        </div>
    );

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const setOpened = () => {};

    return (
        <ModalFocusManager disabled={!opened || isTopLevelSideOverlayOpened || isTopOverlayOpened}>
            <div
                className={classnames(className, 'cssClass[lightBoxSideOverlayWrapper]', {
                    'cssClass[closing]': closing,
                    'cssClass[opened]': opened,
                    'cssClass[openedTopLevelSideOverlay]': Boolean(isTopLevelSideOverlayOpened),
                    'cssClass[overflowXHidden]': Boolean(isTopLevelSideOverlayOpened) || Boolean(isLoading),
                    'cssClass[overflowYHidden]': Boolean(isTopLevelSideOverlayOpened) || Boolean(isLoading) || Boolean(isTopOverlayOpened),
                    'cssClass[sizeSM]': size === ELightBoxSideOverlaySize.SM,
                    'cssClass[sizeMD]': size === ELightBoxSideOverlaySize.MD,
                    'cssClass[sizeLG]': size === ELightBoxSideOverlaySize.LG,
                })}
                {...htmlDivAttributes}
            >
                {/* Скрытый элемент, на который устанавливается фокус при открытии оверлея. Без этого элемента, фокус будет установлен на кнопку закрытия. */}
                {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
                <div data-first-interaction-element={true} tabIndex={0} className="cssClass[firstFocus]" />
                <div
                    className={classnames('cssClass[lightBoxSideOverlay]', {
                        'cssClass[closing]': closing,
                        'cssClass[opening]': opening,
                    })}
                >
                    <OverlayBase
                        direction={EOverlayDirection.RIGHT}
                        mask={renderMask}
                        panel={renderPanel}
                        opened={opened}
                        setOpened={setOpened}
                    />
                </div>
            </div>
        </ModalFocusManager>
    );
};

LightBoxSideOverlay.displayName = 'LightBoxSideOverlay';
LightBoxSideOverlay.Close = LightBoxSideOverlayClose;
