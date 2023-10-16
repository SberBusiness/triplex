import React from 'react';
import {useEffect, useState, useRef} from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {
    EOverlayDirection,
    IOverlayBaseProps,
    OverlayBase,
    IOverlayChildrenProvideProps,
} from '@sberbusiness/triplex/components/Overlay/OverlayBase';
import {OverlayMask} from '../../Overlay/OverlayMask';
import {LightBoxSideOverlayClose} from './LightBoxSideOverlayClose';
import {LightBoxSideOverlayLoader} from './LightBoxSideOverlayLoader';
import {ModalFocusOnMount} from '@sberbusiness/triplex/components/ModalFocusManager/ModalFocusOnMount';

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
     * Текст под спиннером.
     */
    loadingTitle?: React.ReactNode;
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
    loadingTitle,
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

    const renderMask = ({opened, setOpened}: IOverlayChildrenProvideProps) =>
        // Маска рендерится у SideOverlay самого верхнего уровня, чтобы маски не накладывались друг на друга.
        isTopLevelSideOverlayOpened ? null : <OverlayMask opened={opened} className="cssClass[lightBoxSideOverlayMask]" />;

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

            {isLoading && <LightBoxSideOverlayLoader loadingTitle={loadingTitle} />}
        </div>
    );

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const setOpened = () => {};

    const classNameOverlayWrapper = classnames(className, 'cssClass[lightBoxSideOverlayWrapper]', {
        'cssClass[closing]': closing,
        'cssClass[opened]': opened,
        'cssClass[openedTopLevelSideOverlay]': Boolean(isTopLevelSideOverlayOpened),
        'cssClass[overflowXHidden]': Boolean(isTopLevelSideOverlayOpened) || Boolean(isLoading),
        'cssClass[overflowYHidden]': Boolean(isTopLevelSideOverlayOpened) || Boolean(isLoading) || Boolean(isTopOverlayOpened),
        'cssClass[sizeSM]': size === ELightBoxSideOverlaySize.SM,
        'cssClass[sizeMD]': size === ELightBoxSideOverlaySize.MD,
        'cssClass[sizeLG]': size === ELightBoxSideOverlaySize.LG,
    });

    const renderOverlay = (provideProps: IOverlayChildrenProvideProps) => (
        <>
            {renderMask(provideProps)}
            {renderPanel()}
        </>
    );

    const content = (
        <div
            className={classnames('cssClass[lightBoxSideOverlay]', 'cssClass[globalLightBoxSideOverlay]', {
                'cssClass[closing]': closing,
                'cssClass[opening]': opening,
            })}
        >
            <OverlayBase direction={EOverlayDirection.RIGHT} opened={opened} setOpened={setOpened}>
                {renderOverlay}
            </OverlayBase>
        </div>
    );

    return (
        <ModalFocusOnMount disabled={!opened || isTopLevelSideOverlayOpened || isTopOverlayOpened}>
            <div className={classNameOverlayWrapper} role="dialog" aria-modal="true" {...htmlDivAttributes}>
                {content}
            </div>
        </ModalFocusOnMount>
    );
};

LightBoxSideOverlay.displayName = 'LightBoxSideOverlay';
LightBoxSideOverlay.Close = LightBoxSideOverlayClose;
