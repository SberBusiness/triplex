import * as React from 'react';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import {LightBoxContent} from '@sbbol/web-library/desktop/components/LightBox/components/LightBoxContent';
import {LightBoxControls} from '@sbbol/web-library/desktop/components/LightBox/LightBoxControls/LightBoxControls';
import {LightBoxSideOverlay} from '@sbbol/web-library/desktop/components/LightBox/LightBoxSideOverlay/LightBoxSideOverlay';
import {Portal} from '@sbbol/web-library/desktop/components/Portal/Portal';
import {addClassNameWithScrollbarWidth} from '@sbbol/web-library/desktop/utils/scroll/scrollbar';
import {LightBoxTopOverlay} from './LightBoxTopOverlay/LightBoxTopOverlay';
import {LightBoxViewManager} from './LightBoxViewManager/LightBoxViewManager';
import {isOnlyIE} from '../../utils/userAgentUtils';
import {ModalFocusManager} from '../ModalFocusManager/ModalFocusManager';

/**
 * Id DOM элемента, в который рендерится Лайтбокс.
 * При отсутствия элемента в DOM - создается в body.
 */
export const lightBoxMountNodeIdDefault = 'LightBox-mount-node';
/**
 * Id DOM элемента, в визуальных границах(левая и правая координата) которого рендерится LightBox.
 */
export const lightBoxViewManagerNodeIdDefault = 'LightBox-view-manager-node';

/**
 * Свойства компонента LightBox.
 *
 */
export interface ILightBoxProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactElement[];
    mountNode?: HTMLDivElement;
    // Id DOM элемента, в визуальных границах(левая и правая координата) которого рендерится LightBox.
    lightBoxViewManagerNodeId?: string;
    isLoading?: boolean;
    isSideOverlayOpened?: boolean;
    isTopOverlayOpened?: boolean;
}

const bodyClassNamesIsLightBoxOpen = ['cssClass[bodyOverflowHidden]'];
if (isOnlyIE) {
    bodyClassNamesIsLightBoxOpen.push('cssClass[LightBoxIE]');
}

/**
 * Компонент лайтбокс.
 */
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

    constructor(props: ILightBoxProps) {
        super(props);

        this.tempButtonRef = React.createRef<HTMLSpanElement>();

        addClassNameWithScrollbarWidth();

        this.setLightBoxMountNode();
        this.setLightBoxViewManagerMountNode();
    }

    public componentDidMount(): void {
        bodyClassNamesIsLightBoxOpen.forEach((className) => document.documentElement.classList.add(className));
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
            isLoading,
            isSideOverlayOpened,
            isTopOverlayOpened,
            lightBoxViewManagerNodeId,
            mountNode,
            ...htmlDivAttributes
        } = this.props;

        const cn = classnames(className, 'cssClass[lightBox]', {
            'cssClass[isLoading]': Boolean(isLoading),
            'cssClass[lightBoxSideOverlayActive]': Boolean(isSideOverlayOpened),
            'cssClass[lightBoxTopOverlayActive]': Boolean(isTopOverlayOpened),
        });

        if (!this.lightBoxMountNode) {
            return null;
        }

        return (
            <>
                <Portal node={this.lightBoxMountNode}>
                    <ModalFocusManager disabled={isTopOverlayOpened || isSideOverlayOpened}>
                        {/* Скрытый элемент, на который устанавливается фокус при открытии LightBox. Без этого элемента, фокус будет установлен на кнопку закрытия. */}
                        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
                        <div data-first-interaction-element={true} tabIndex={0} />
                        <div className={cn} {...htmlDivAttributes}>
                            <div className="cssClass[lightBoxBackdrop]" />
                            {children}
                            <span ref={this.tempButtonRef} className="cssClass[tempElSafariBug]" />
                        </div>
                    </ModalFocusManager>
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
