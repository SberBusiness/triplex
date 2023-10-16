import React from 'react';
import {CSSTransition} from 'react-transition-group';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {EModalWindowSize} from '@sberbusiness/triplex/components/ModalWindow/enums';
import {mapModalWindowSizeToClassName} from '@sberbusiness/triplex/components/ModalWindow/utils';
import {overlayDataAttributeIsOpen} from '@sberbusiness/triplex/components/ModalWindow/components/ModalWindowTopOverlay';
import {Portal} from '@sberbusiness/triplex/components/Portal/Portal';
import {isEmptyObject} from '@sberbusiness/triplex/utils/isEmptyObject';
import {ModalFocusOnMount} from '@sberbusiness/triplex/components/ModalFocusManager/ModalFocusOnMount';

/** Свойства компонента модального окна. */
export interface IModalWindowProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Открыто ли модальное окно. */
    isOpen: boolean;
    children: React.ReactElement;
    /** ClassName контейнера модального окна. */
    containerClassName?: string;
    /** Состояние загрузки. */
    isLoading?: boolean;
    /** Callback после анимации закрытия модального окна. */
    onExited?: () => void;
    /** Кнопка закрыть. */
    closeButton: React.ReactNode;
}

/** Состояние компонента модального окна. */
interface IModalWindowState {
    /** Нужно ли рендерить Portal. */
    renderPortal: boolean;
    /** Флаг состояния TopOverlay. */
    isTopOverlayOpen: boolean;
}

/** Имя класса для некоторых элементов связанных с компонентом. */
const modalNodeName = 'ufs-modal-window';

/** Время css-анимации скрытия модального окна. */
const animationExitTime = 300;

/** Класс от Layout(сббола), который блюрит(blur) фоновый контент. */
const bodyClassNameModalOpen = ['modal-open', 'no-hash-overflow-hidden'];

/** Модальное окно. */
export const ModalWindow: (size: EModalWindowSize, dispayName: string) => React.ComponentClass<IModalWindowProps> = (size, dispayName) => {
    class ModalWindowComponent extends React.PureComponent<IModalWindowProps> {
        public static displayName = dispayName;
        public state: IModalWindowState = {
            renderPortal: this.props.isOpen,
            isTopOverlayOpen: false,
        };

        private mountNode: HTMLDivElement | null = null;

        private modalWindowNode: HTMLDivElement | null = null;

        /**
         * Таймаут с нулевой задержкой для componentDidUpdate. В React 15 componentDidUpdate родителя вызываются
         * раньше, чем componentDidUpdate чилда. Убрать таймаут можно после прекращения поддержки React 15.
         */
        private updateTimeout: number | undefined;

        constructor(props: IModalWindowProps) {
            super(props);

            if (props.isOpen) {
                this.mountPortalNode();
            }
        }

        public componentDidMount() {
            this.checkTopOverlaysIsOpen();
        }

        public componentDidUpdate(prevProps: Readonly<IModalWindowProps>) {
            const {isOpen} = this.props;
            let newState = {};

            if (!prevProps.isOpen && isOpen) {
                this.mountPortalNode();
                newState = {renderPortal: true};
            }

            if (!isEmptyObject(newState)) {
                this.setState(newState);
            }
            this.updateTimeout = window.setTimeout(() => {
                this.checkTopOverlaysIsOpen();
            });
        }

        public componentWillUnmount() {
            this.unmountPortalNode();
            this.removeBodyClasses();
        }

        public render() {
            const {renderPortal} = this.state;
            return renderPortal ? this.renderPortal() : null;
        }

        private renderPortal = () => {
            const {isOpen} = this.props;
            const modalWindow = this.renderModalWindow();

            if (!this.mountNode) {
                return;
            }

            return (
                <Portal container={this.mountNode}>
                    <CSSTransition
                        in={isOpen}
                        timeout={animationExitTime}
                        classNames="modalWindowTransition"
                        appear // Нужен для срабатывания onEnter.
                        enter
                        exit
                        onEnter={this.handleOpenModal}
                        onExited={this.handleCloseModal}
                        mountOnEnter
                        unmountOnExit
                    >
                        {modalWindow}
                    </CSSTransition>
                </Portal>
            );
        };

        /** Рендер модального окна. */
        private renderModalWindow = () => {
            const {className, containerClassName, isLoading, isOpen, children, onExited, closeButton, ...props} = this.props;
            const {isTopOverlayOpen} = this.state;

            const classNameModalWindow = classnames('cssClass[modalWindow]', mapModalWindowSizeToClassName[size], className);

            const classNameContainer = classnames(
                'cssClass[modalWindowContainer]',
                {'cssClass[modalTopOverlayActive]': isTopOverlayOpen},
                containerClassName
            );

            const content = React.cloneElement(children, {isLoading, key: 'content'});

            return (
                <ModalFocusOnMount disabled={!isOpen}>
                    <div className={classNameContainer}>
                        <div className="cssClass[modalWindowBackdrop]" />
                        <div role="dialog" aria-modal="true" {...props} ref={this.setRef} className={classNameModalWindow}>
                            <div className="cssClass[modalWindowContentWrapper]">
                                {content}
                                {closeButton}
                            </div>
                        </div>
                    </div>
                </ModalFocusOnMount>
            );
        };

        /** Удаление стилей body. */
        private removeBodyClasses = () => {
            const bodyClassList = document.body.classList;

            if (bodyClassList.contains(bodyClassNameModalOpen[0])) {
                bodyClassList.remove(...bodyClassNameModalOpen);
            }
        };

        /** Вспомогательный обработчик при открытии модального окна. */
        private handleOpenModal = () => {
            const bodyClassList = document.body.classList;
            if (!bodyClassList.contains(bodyClassNameModalOpen[0])) {
                bodyClassList.add(...bodyClassNameModalOpen);
            }
        };

        /** Вспомогательный обработчик при закрытии модального окна. */
        private handleCloseModal = () => {
            const {onExited} = this.props;

            this.unmountPortalNode();
            this.removeBodyClasses();

            this.setState({renderPortal: false});

            if (onExited) {
                onExited();
            }
        };

        /** Установка ref. */
        private setRef = (el: HTMLDivElement) => {
            this.modalWindowNode = el;
        };

        /** Подключение собственной node для портала. */
        private mountPortalNode = () => {
            let wrapperNode = document.querySelector<HTMLDivElement>(`#${modalNodeName}-wrapper`);

            if (!wrapperNode) {
                wrapperNode = document.createElement('div');
                wrapperNode.setAttribute('id', `${modalNodeName}-wrapper`);
                document.body.appendChild(wrapperNode);
            }

            this.mountNode = document.createElement('div');
            this.mountNode.className = `${modalNodeName}-portal-node`;

            if (wrapperNode) {
                wrapperNode.appendChild(this.mountNode);
            }
        };

        /** Удаление созданной node для портала.
         * (За исключением <div id="ufs-modal-window-wrapper"></div> - это div во внешнем лайауте, куда должна встраиваться модалка)
         */
        private unmountPortalNode = () => {
            if (this.mountNode) {
                this.mountNode.parentNode?.removeChild(this.mountNode);
            }
        };

        /**
         * Проверка открытости TopOverlay.
         */
        private checkTopOverlaysIsOpen = () => {
            const {isTopOverlayOpen} = this.state;
            const nextTopOverlayIsOpen = Boolean(
                this.mountNode && this.mountNode?.querySelectorAll(`[${overlayDataAttributeIsOpen}]`).length > 0
            );

            if (isTopOverlayOpen !== nextTopOverlayIsOpen) {
                this.setState({
                    isTopOverlayOpen: nextTopOverlayIsOpen,
                });
                if (nextTopOverlayIsOpen && this.modalWindowNode) {
                    this.modalWindowNode.scrollTop = 0;
                }
            }
        };
    }

    return ModalWindowComponent;
};
