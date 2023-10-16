import {ReactHeight} from '@sberbusiness/triplex/components/ReactHeight/ReactHeight';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {TopOverlayClose} from '@sberbusiness/triplex/components/TopOverlay/components/TopOverlayClose';
import {TopOverlayContent} from '@sberbusiness/triplex/components/TopOverlay/components/TopOverlayContent';
import {TopOverlayControls} from '@sberbusiness/triplex/components/TopOverlay/components/TopOverlayControls';
import React from 'react';

/**
 * Свойства компонента.
 *
 * @prop {boolean} isOpen Статус отображения компонента.
 * @prop {Function} [onClose] Обработчик скрытия компонента.
 * @prop {Function} [onOpen] Обработчик открытия компонента.
 */
export interface ITopOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
    isOpen: boolean;
    onClose?: () => void;
    onOpen?: () => void;
}

/**
 * Состояние компонента.
 *
 * @prop {boolean} isShown Статус отображения компонента. Отличие от props.isOpen в том, что он устанавливается в false после завершения анимации закрытия.
 * @prop {number} overlayHeight Высота компонента.
 */
export interface ITopOverlayState {
    isShown: boolean;
    overlayHeight: number;
}

// Время fade анимации .top-overlay-inner, соответствует времени анимации @topOverlayInnerAnimationDuration в less.
const TOP_OVERLAY_INNER_ANIMATION_DURATION = 300;
// Высота TopOverlay в скрытом состоянии.
const TOP_OVERLAY_HEIGHT_COLLAPSED = 0;

/**
 * Компонент верхнего предупреждения, о закрытии лайтбокса / боковой панели лайтбокса.
 */
export class TopOverlay extends React.Component<ITopOverlayProps, ITopOverlayState> {
    public static displayName = 'TopOverlay';

    public static Content = TopOverlayContent;
    public static Controls = TopOverlayControls;
    public static Close = TopOverlayClose;

    public state: ITopOverlayState = {
        isShown: this.props.isOpen,
        overlayHeight: TOP_OVERLAY_HEIGHT_COLLAPSED,
    };

    // Ref для анимации.
    public containerRef: HTMLDivElement | undefined;

    // Высота TopOverlay в открытом состоянии.
    public topOverlayHeightExpanded = 0;

    // Id таймера анимации закрытия.
    public closeAnimationTimeoutTimeoutId: any;

    /**
     * Установка рефа containerRef.
     *
     */
    public setContainerRef = (container: HTMLDivElement) => {
        this.containerRef = container;
    };

    public componentDidUpdate(prevProps: Readonly<ITopOverlayProps>): void {
        const {isOpen: prevIsOpen} = prevProps;
        const {isOpen} = this.props;

        if (!prevIsOpen && isOpen) {
            // Оверлей открывается.
            clearTimeout(this.closeAnimationTimeoutTimeoutId);
            this.setState({
                isShown: true,
                overlayHeight: this.topOverlayHeightExpanded,
            });
        } else if (prevIsOpen && !isOpen) {
            // Оверлей закрывается.
            this.closeAnimationTimeoutTimeoutId = this.closeAnimationTimeout();
        }
    }

    /**
     * Таймаут (на время fadeOut анимации конетнта) перед закрытием TopOverlay.
     */
    public closeAnimationTimeout = () =>
        setTimeout(() => {
            this.setState({overlayHeight: TOP_OVERLAY_HEIGHT_COLLAPSED});
        }, TOP_OVERLAY_INNER_ANIMATION_DURATION);

    /**
     * Обработка завершения анимации открытия/закрытия.
     *
     */
    public handleTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
        const {target} = event;
        const {isOpen, onClose, onOpen} = this.props;
        const {isShown} = this.state;

        if (this.containerRef === target) {
            if (isShown !== isOpen) {
                this.setState({
                    isShown: isOpen,
                });
            }

            if (isOpen && onOpen) {
                onOpen();
            } else if (!isOpen && onClose) {
                onClose();
            }
        }
    };

    /**
     * Установка высоты оверлея.
     *
     */
    public setOverlayHeight = (height: number) => {
        const {overlayHeight} = this.state;

        this.topOverlayHeightExpanded = height;

        if (overlayHeight !== this.topOverlayHeightExpanded) {
            this.setState({
                overlayHeight: this.topOverlayHeightExpanded,
            });
        }
    };

    public render() {
        const {isShown, overlayHeight} = this.state;
        const {children, isOpen, onClose, onOpen, ...divHTMLAttributes} = this.props;

        if (!isShown && !isOpen) {
            return null;
        }

        return (
            <div
                role="dialog"
                aria-modal="true"
                {...divHTMLAttributes}
                className={classnames('cssClass[topOverlay]', 'cssClass[globalTopOverlay]', {'cssClass[opened]': isOpen && isShown})}
                style={{height: overlayHeight}}
                onTransitionEnd={this.handleTransitionEnd}
                ref={this.setContainerRef}
                data-test-id="confirm__confirmContent"
            >
                <ReactHeight onHeightReady={this.setOverlayHeight}>
                    <div className="cssClass[globalTopOverlayInner]">{children}</div>
                </ReactHeight>
            </div>
        );
    }
}
