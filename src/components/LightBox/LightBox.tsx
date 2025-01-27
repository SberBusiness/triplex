import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {LightBoxContent} from '@sberbusiness/triplex/components/LightBox/components/LightBoxContent';
import {LightBoxControls} from '@sberbusiness/triplex/components/LightBox/LightBoxControls/LightBoxControls';
import {LightBoxSideOverlay} from '@sberbusiness/triplex/components/LightBox/LightBoxSideOverlay/LightBoxSideOverlay';
import {Portal} from '@sberbusiness/triplex/components/Portal/Portal';
import {addClassNameWithScrollbarWidth} from '@sberbusiness/triplex/utils/scroll/scrollbar';
import {LightBoxTopOverlay} from './LightBoxTopOverlay/LightBoxTopOverlay';
import {LightBoxViewManager} from './LightBoxViewManager/LightBoxViewManager';
import {isOnlyIE} from '../../utils/userAgentUtils';
import FocusTrap from 'focus-trap-react';
import {FocusTrapUtils} from '@sberbusiness/triplex/utils/focus/FocusTrapUtils';

// Идентификатор DOM-элемента, в который рендерится лайтбокс. При отсутствии элемента в DOM – создается в body.
export const lightBoxMountNodeIdDefault = 'LightBox-mount-node';

// Идентификатор DOM-элемента, в визуальных границах (левая и правая координата) которого рендерится лайтбокс.
export const lightBoxViewManagerNodeIdDefault = 'LightBox-view-manager-node';

/** Свойства компонента LightBox. */
export interface ILightBoxProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactElement[];
    /** Свойства FocusTrap. Используется npm-пакет focus-trap-react. */
    focusTrapProps?: FocusTrap.Props;
    /** Ref на контейнер LightBox. */
    forwardRef?: React.MutableRefObject<HTMLElement | null>;
    /** DOM-нода в которую будет рендерится лайтбокс. */
    mountNode?: HTMLDivElement;
    /** Идентификатор DOM-элемента, в визуальных границах (левая и правая координата) которого рендерится лайтбокс. */
    lightBoxViewManagerNodeId?: string;
    /** Флаг состояния загрузки. */
    isLoading?: boolean;
    /** Флаг открытия боковой панели. */
    isSideOverlayOpened?: boolean;
    /** Флаг открытия верхней панели. */
    isTopOverlayOpened?: boolean;
}

const bodyClassNamesIsLightBoxOpen = ['cssClass[bodyOverflowHidden]'];
if (isOnlyIE) {
    bodyClassNamesIsLightBoxOpen.push('cssClass[LightBoxIE]');
}

/** Лайтбокс. */
export class LightBox extends React.Component<ILightBoxProps> {
    public static displayName = 'LightBox';

    public static defaultProps = {
        lightBoxViewManagerNodeId: lightBoxViewManagerNodeIdDefault,
    };

    public static Content = LightBoxContent;
    public static SideOverlay = LightBoxSideOverlay;
    public static TopOverlay = LightBoxTopOverlay;
    public static Controls = LightBoxControls;

    // Скрытый элемент для вызова ререндера при закрытии оверлея, фикс бага в Safari - DCBSWT-2866.
    private tempButtonRef: React.RefObject<HTMLSpanElement>;

    /**
     * DOM node, в которую рендерится лайтбокс.
     */
    private lightBoxMountNode: HTMLDivElement | null = null;
    /**
     * DOM node, в визуальных границах которой рендерится лайтбокс.
     * Левая и правая граница LightBox будут соответствовать левой и правой границе lightBoxViewManagerNode.
     */
    private lightBoxViewManagerNode: HTMLDivElement | null = null;

    private containerRef: HTMLDivElement | null = null;

    constructor(props: ILightBoxProps) {
        super(props);

        this.tempButtonRef = React.createRef<HTMLSpanElement>();

        addClassNameWithScrollbarWidth();

        this.setLightBoxMountNode();
        this.setLightBoxViewManagerMountNode();
    }

    public componentDidMount(): void {
        this.addClassNamesToDocumentElement();
        // Фикс бага в роутере - при переключении между лайтбоксами иногда сначала происходит componentDidMount 2го и затем componentWillUnmount первого, css классы удаляются.
        setTimeout(this.addClassNamesToDocumentElement, 100);
    }

    public componentDidUpdate(prevProps: ILightBoxProps): void {
        const {isSideOverlayOpened} = this.props;
        const {isSideOverlayOpened: prevIsSideOverlayOpened} = prevProps;

        if (prevIsSideOverlayOpened && !isSideOverlayOpened) {
            if (this.tempButtonRef.current) {
                // Изменение z-index у скрытого элемента вызывает repaint. Фикс бага в Safari - DCBSWT-2866.
                const nextZIndex = Math.round(Math.random() * 100);
                this.tempButtonRef.current.style.zIndex = nextZIndex.toString();
            }
        }
    }

    public componentWillUnmount(): void {
        bodyClassNamesIsLightBoxOpen.forEach((className) => document.documentElement.classList.remove(className));
    }

    public render(): React.ReactNode {
        const {
            children,
            className,
            focusTrapProps,
            forwardRef,
            isLoading,
            isSideOverlayOpened,
            isTopOverlayOpened,
            lightBoxViewManagerNodeId,
            mountNode,
            ...htmlDivAttributes
        } = this.props;

        const classNameLightBox = classnames(className, 'cssClass[lightBox]', {
            'cssClass[isLoading]': Boolean(isLoading),
            'cssClass[lightBoxSideOverlayActive]': Boolean(isSideOverlayOpened),
            'cssClass[lightBoxTopOverlayActive]': Boolean(isTopOverlayOpened),
        });

        if (!this.lightBoxMountNode) {
            return null;
        }

        return (
            <>
                <Portal container={this.lightBoxMountNode}>
                    <FocusTrap
                        active={!isLoading}
                        {...focusTrapProps}
                        focusTrapOptions={{
                            clickOutsideDeactivates: true,
                            initialFocus: () => FocusTrapUtils.getFirstInteractionElementByDataAttr(this.containerRef),
                            preventScroll: true,
                            ...focusTrapProps?.focusTrapOptions,
                        }}
                    >
                        <div className={classNameLightBox} ref={this.setRef} role="dialog" aria-modal="true" {...htmlDivAttributes}>
                            <div className="cssClass[lightBoxBackdrop]" />
                            {children}
                            <span ref={this.tempButtonRef} className="cssClass[tempElSafariBug]" />
                        </div>
                    </FocusTrap>
                </Portal>

                {this.lightBoxViewManagerNode && (
                    <LightBoxViewManager
                        lightBoxViewManagerNode={this.lightBoxViewManagerNode}
                        lightBoxMountNode={this.lightBoxMountNode}
                    />
                )}
            </>
        );
    }

    /** Функция для хранения ссылки. */
    private setRef = (instance: HTMLDivElement | null) => {
        const {forwardRef} = this.props;
        this.containerRef = instance;

        if (forwardRef) {
            forwardRef.current = instance;
        }
    };

    private addClassNamesToDocumentElement = () => {
        bodyClassNamesIsLightBoxOpen.forEach((className) => document.documentElement.classList.add(className));
    };

    private setLightBoxMountNode = () => {
        const {mountNode} = this.props;

        if (mountNode) {
            this.lightBoxMountNode = mountNode;
        } else {
            this.lightBoxMountNode = document.querySelector(`#${lightBoxMountNodeIdDefault}`);

            if (!this.lightBoxMountNode) {
                this.lightBoxMountNode = document.createElement('div');
                this.lightBoxMountNode.setAttribute('id', lightBoxMountNodeIdDefault);
                document.body.appendChild(this.lightBoxMountNode);
            }
        }
    };

    private setLightBoxViewManagerMountNode = () => {
        const {lightBoxViewManagerNodeId} = this.props;

        if (lightBoxViewManagerNodeId) {
            this.lightBoxViewManagerNode = document.querySelector(`#${lightBoxViewManagerNodeId}`);
        }

        if (!this.lightBoxViewManagerNode) {
            this.lightBoxViewManagerNode = document.createElement('div');
            this.lightBoxViewManagerNode.setAttribute('id', lightBoxViewManagerNodeIdDefault);
            document.body.appendChild(this.lightBoxViewManagerNode);
        }
    };
}
