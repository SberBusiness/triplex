import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import {ModalWindowSize} from '@sbbol/web-library/desktop/components/ModalWindow/enums';
import {overlayDataAttributeIsOpen} from '@sbbol/web-library/desktop/components/ModalWindow/components/ModalWindowTopOverlay';
import {Portal} from '@sbbol/web-library/desktop/components/Portal/Portal';
import {isEmptyObject} from '@sbbol/web-library/desktop/utils/isEmptyObject';
import * as React from 'react';
import {CSSTransition} from 'react-transition-group';

/**
 * Интерфейс компонента модального окна
 * @prop {boolean} isOpen Открыто ли модальное окно.
 * @prop {React.ReactElement[]} children Children.
 * @prop {boolean} [isLoading] Состояние загрузки.
 * @prop {Function} [onExited] Callback после анимации закрытия модального окна.
 */
export interface IModalWindowProps extends React.HTMLAttributes<HTMLDivElement> {
    isOpen: boolean;
    children: React.ReactElement;
    isLoading?: boolean;
    onExited?: () => void;
    closeButton: React.ReactNode;
}

/**
 * Состояние компонента модального окна.
 *
 * @prop {boolean} closeFixed Фиксированная позиция кнопки закрытия модального окна.
 * @prop {TOrderedChildren} orderedChildren Children.
 * @prop {boolean} renderPortal Нужно ли рендерить Portal.
 * @prop {boolean} isTopOverlayOpen Флаг состояния TopOverlay.
 */
interface IModalWindowState {
    closeFixed: boolean;
    renderPortal: boolean;
    isTopOverlayOpen: boolean;
}

/** Имя класса для некоторых элементов связанных с компонентом. */
const modalNodeName = 'ufs-modal-window';

/** Время css-анимации скрытия модального окна. */
const animationExitTime = 300;

/** Позиция модального окна сверху (px). */
const modalWindowTopPosition = 64;

/** Класс от Layout(сббола), который блюрит(blur) фоновый контент. */
const bodyClassNameModalOpen = ['modal-open', 'no-hash-overflow-hidden'];

export const ModalWindow: (size: ModalWindowSize, dispayName: string) => React.ComponentClass<IModalWindowProps> = (size, dispayName) => {
    class ModalWindowComponent extends React.PureComponent<IModalWindowProps> {
        public static displayName = dispayName;
        public state: IModalWindowState = {
            closeFixed: false,
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
            this.updateTimeout = setTimeout(() => {
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
                <Portal node={this.mountNode}>
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
            const {className, isLoading, isOpen, children, onExited, closeButton, ...props} = this.props;
            const {closeFixed, isTopOverlayOpen} = this.state;

            const classNameModalWindow = classnames(className, {
                'cssClass[globalModalWindowCloseFixed]': closeFixed,
                'cssClass[modalWindow]': true,
                [size]: true,
            });

            const classNameContainer = classnames({
                'cssClass[modalWindowContainer]': true,
                'cssClass[modalTopOverlayActive]': isTopOverlayOpen,
            });

            const content = React.cloneElement(children, {isLoading, key: 'content'});

            return (
                <div className={classNameContainer}>
                    <div className="cssClass[modalWindowBackdrop]" />
                    <div {...props} ref={this.setRef} className={classNameModalWindow}>
                        <div className="cssClass[modalWindowContentWrapper]">
                            {content}
                            {!closeFixed && closeButton}
                        </div>
                    </div>
                    {closeFixed && closeButton}
                </div>
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

            if (this.modalWindowNode) {
                this.modalWindowNode.addEventListener('scroll', this.handleScroll);
            }
        };

        /** Вспомогательный обработчик при закрытии модального окна. */
        private handleCloseModal = () => {
            const {onExited} = this.props;

            if (this.modalWindowNode) {
                this.modalWindowNode.removeEventListener('scroll', this.handleScroll);
            }

            this.unmountPortalNode();
            this.removeBodyClasses();

            this.setState({renderPortal: false, closeFixed: false});

            if (onExited) {
                onExited();
            }
        };

        /** Слушатель событий прокрутки страницы. */
        private handleScroll = () => {
            if (!this.modalWindowNode) {
                return;
            }

            const {closeFixed} = this.state;

            const closeFixedNewValue = this.modalWindowNode.scrollTop > modalWindowTopPosition;
            if (closeFixed === closeFixedNewValue) {
                return;
            }

            this.setState({closeFixed: closeFixedNewValue});
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
