import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {Portal} from '@sberbusiness/triplex/components/Portal/Portal';
import {
    ETooltipAlign,
    ETooltipAxesType,
    ETooltipDirection,
    ETooltipEndCoordinates,
    ETooltipFlowTypes,
    ETooltipPreferPlace,
    ETooltipSize,
    ETooltipSizeParameter,
    ETooltipStartCoordinates,
    ETooltipTypeName,
} from '@sberbusiness/triplex/components/Tooltip/enums';
import {Tip} from '@sberbusiness/triplex/components/Tooltip/Tip';
import {TooltipBody} from '@sberbusiness/triplex/components/Tooltip/TooltipBody';
import {TooltipTarget} from '@sberbusiness/triplex/components/Tooltip/TooltipTarget';
import {TooltipXButton} from '@sberbusiness/triplex/components/Tooltip/TooltipXButton';
import {
    ITooltipBaseProps,
    ITooltipBaseState,
    ITooltipBounds,
    ITooltipDomainSize,
    ITooltipSize,
} from '@sberbusiness/triplex/components/Tooltip/types';
import {addCrossPlatformStyle} from '@sberbusiness/triplex/components/Tooltip/utils/CSSPrefix';
import {
    axes,
    calcBounds,
    calcRelPos,
    centerOfBoundsFromBounds,
    equalCoords,
    pickZone,
} from '@sberbusiness/triplex/components/Tooltip/utils/Positioning';
import isEqual from 'lodash.isequal';
import React from 'react';
import ReactDOM from 'react-dom';
import {IReorderConfig, reorderAndCheckChildrenDeprecated} from '@sberbusiness/triplex/utils/reactChildDeprecated';

// Маппер flow в translate для Tip (стрелочка)
const flowToTipTranslations: {[key: string]: string} = {
    column: 'translateX',
    row: 'translateY',
};

// Маппер flow в translate для самого Tooltip
const flowToTooltipTranslations: {[key: string]: string} = {
    column: 'translateY',
    row: 'translateX',
};

// Маппер EPreferPlace в EDirection для Tip (стрелочка)
const DIRECTIONS = {
    [ETooltipPreferPlace.ABOVE]: ETooltipDirection.DOWN,
    [ETooltipPreferPlace.BELOW]: ETooltipDirection.UP,
    [ETooltipPreferPlace.LEFT]: ETooltipDirection.RIGHT,
    [ETooltipPreferPlace.RIGHT]: ETooltipDirection.LEFT,
};

// Интервал опроса в ms необходимости обновления layout
const REFRESH_INTERVAL_MS = 200;
// Время анимаций появления и исчезновения Tooltip'а
const ENTER_EXIT_TRANSITION_DURATION_MS = 500;
// Отступ Tooltip от элемента, px
const OFFSET = 2;
// Высота Tip (стрелочки), px
const TIP_HEIGHT = 8;
// Уголок бегает по периметру максимально на 16 px от края
const MAX_FROM_EDGE_FOR_TIP = 16;

const oldReact = Number(React.version.split('.')[0]) <= 15;

/**
 * Базовый компонент "Тултипа".
 */
export class TooltipBase extends React.Component<ITooltipBaseProps, ITooltipBaseState> {
    public static displayName = 'TooltipBase';

    public zone: ITooltipDomainSize = {
        [ETooltipTypeName.FLOW]: ETooltipFlowTypes.COLUMN,
        [ETooltipTypeName.STANDING]: ETooltipPreferPlace.ABOVE,
        [ETooltipTypeName.SIDE]: ETooltipAlign.CENTER,
        cutOff: 0,
        order: 0,
        [ETooltipSizeParameter.H]: 0,
        [ETooltipSizeParameter.W]: 0,
    };
    public tooltipBodySize: ITooltipSize = {
        [ETooltipSizeParameter.H]: 0,
        [ETooltipSizeParameter.W]: 0,
    };
    public targetBounds: ITooltipBounds = {
        [ETooltipStartCoordinates.X]: 0,
        [ETooltipEndCoordinates.X]: 0,
        [ETooltipStartCoordinates.Y]: 0,
        [ETooltipEndCoordinates.Y]: 0,
        [ETooltipSizeParameter.H]: 0,
        [ETooltipSizeParameter.W]: 0,
    };
    public windowBounds: ITooltipBounds = {
        [ETooltipStartCoordinates.X]: 0,
        [ETooltipEndCoordinates.X]: 0,
        [ETooltipStartCoordinates.Y]: 0,
        [ETooltipEndCoordinates.Y]: 0,
        [ETooltipSizeParameter.H]: 0,
        [ETooltipSizeParameter.W]: 0,
    };

    // элемент на который навешан тултип
    public targetEl: HTMLElement | null = null;
    // Стрелочка - треугольник
    public tipEl: HTMLElement | null = null;
    public bodyEl: HTMLElement | null = null;
    public tooltipNode: HTMLDivElement | null = null;
    public container: HTMLDivElement | null = null;
    public hasTracked = false;
    public exitingAnimationTimer1: any = null;
    public exitingAnimationTimer2: any = null;
    public checkLayoutInterval: any = null;
    public renderContainer: Element;
    public orderConfig: IReorderConfig = {
        order: [
            {required: true, type: TooltipBody},
            {required: true, type: TooltipTarget},
            {required: false, type: TooltipXButton},
        ],
    };

    public state: ITooltipBaseState = {
        exiting: false, // для отслеживания того что анимация при закрытии тултипа в прогрессе.
        needRenderTooltip: !!this.props.isOpen, // нужно рендерить тултип или нет, признак анимационно зависимого рендериннга открыт/закрыт ли tooltip
        opened: !!this.props.isOpen, // для отслежнивания открыт/закрыт ли tooltip.
        orderedChildren: [],
        standing: ETooltipPreferPlace.ABOVE,
    };

    constructor(props: ITooltipBaseProps) {
        super(props);
        this.renderContainer = props.tooltipRenderContainer ? props.tooltipRenderContainer : document.body;
        this.state.orderedChildren = reorderAndCheckChildrenDeprecated(this.orderConfig, this.props.children);

        if (oldReact) {
            this.container = document.createElement('div');
            this.renderContainer.appendChild(this.container);
        }
    }

    public render() {
        const target = this.state.orderedChildren[1];

        if (oldReact) {
            return target;
        } else {
            // Отрисовка tooltip и добавление его в DOM
            const tooltip = this.state.needRenderTooltip ? (
                <Portal container={this.renderContainer} key={2}>
                    {this.tooltipRender()}
                </Portal>
            ) : null;
            return [target, tooltip];
        }
    }

    public componentDidMount(): void {
        // eslint-disable-next-line react/no-find-dom-node
        this.targetEl = ReactDOM.findDOMNode(this) as HTMLElement;
        if (oldReact) {
            this.addTooltipToDom();
        }
        if (this.props.isOpen) {
            this.enter();
        }
    }

    public componentDidUpdate(prevProps: ITooltipBaseProps, prevState: ITooltipBaseState): void {
        const props = this.props;
        const state = this.state;

        if (!isEqual(prevProps.children, props.children)) {
            this.setState({
                orderedChildren: reorderAndCheckChildrenDeprecated(this.orderConfig, props.children),
            });
        }

        if (oldReact) {
            this.addTooltipToDom();
        }

        const willOpen = !prevProps.isOpen && props.isOpen;
        const willClose = prevProps.isOpen && !props.isOpen;

        if (willOpen) {
            this.prepareOpen();
            return;
        } else if (willClose) {
            this.close();
            return;
        }

        const didOpen = !prevState.opened && state.opened;
        const didClose = prevState.opened && !state.opened;

        if (didOpen) {
            this.enter();
            return;
        } else if (didClose) {
            this.exit();
            return;
        }

        if (state.opened && !isEqual(prevState.orderedChildren, state.orderedChildren)) {
            this.setTooltipBodySize();
            this.setAndCheckResizeTargetBounds();
            this.resolveTooltipLayout();
        }
    }

    public componentWillUnmount(): void {
        /* If the Tooltip is unmounted while animating,
            clear the animation so no setState occured */
        this.animateExitStop();
        if (this.hasTracked) {
            this.untrackTooltip();
        }
        if (this.container) {
            ReactDOM.unmountComponentAtNode(this.container);
            this.renderContainer.removeChild(this.container);
        }
    }

    // Открыть поповер
    private prepareOpen = () => {
        if (this.state.exiting) {
            this.animateExitStop();
        }
        this.setState({needRenderTooltip: true, opened: true});
    };

    // Закрыть поповер
    private close = () => {
        this.setState({opened: false});
    };

    // Метод начала отслеживания поповера и анимация его появления
    private enter = () => {
        this.trackTooltip();
        this.animateEnter();
        if (this.props.onShow && this.tooltipNode) {
            this.props.onShow(this.tooltipNode);
        }
    };

    // Метод окончания отслеживания поповера и анимация его исчезновения
    private exit = () => {
        this.animateExit();
        this.untrackTooltip();
    };

    private setTooltipNode = (node: HTMLDivElement) => {
        const {setTooltipRef} = this.props;
        this.tooltipNode = node;

        if (this.tooltipNode) {
            // Получение ссылок на body тултипа и стрелочку.
            this.bodyEl = this.tooltipNode.querySelector('.js-tooltipBody');
            this.tipEl = this.tooltipNode.querySelector('.js-tip');
        }

        if (setTooltipRef && this.tooltipNode) {
            setTooltipRef(this.tooltipNode);
        }
    };

    private onXButtonClose = (onClick: () => void) => () => {
        if (this.props.closeTooltip) {
            this.props.closeTooltip();
        }
        if (onClick) {
            onClick();
        }
    };

    // Рендер поповера
    private resolveTooltipLayout = () => {
        if (!this.tooltipNode) {
            return;
        }

        const {alignTip} = this.props;

        // Поиск оптимальной зоны для позиционирования. Измеряет размер каждой зоны и использует наибольшую.
        // В качестве размера тултипа берется размер тела тултипа плюс высота стрелочки с обеих сторон.
        const zone = pickZone(this.props.preferPlace, this.windowBounds, this.targetBounds, TIP_HEIGHT, MAX_FROM_EDGE_FOR_TIP, {
            h: this.tooltipBodySize.h + TIP_HEIGHT,
            w: this.tooltipBodySize.w + TIP_HEIGHT,
        });

        this.zone = zone;

        this.setState({
            standing: zone.standing,
        });

        const axis = axes[zone.flow];

        // Для расчета позиции тултипа, размер тултипа вычисляется в зависимости от зоны где он будет располагаться,
        // если тултип в сверху или снизу то высота стрелочки прибавляется к высоте тултипа
        const tooltipSize = {...this.tooltipBodySize};
        tooltipSize[zone.flow === ETooltipFlowTypes.ROW ? ETooltipSizeParameter.W : ETooltipSizeParameter.H] += TIP_HEIGHT;

        /* При позиционировании на вспомогательной оси нельзя превышать границы. Для достижения этого: Сначала
            позиционируется вспомогательной оси относительно центра вспомогательной оси обернутого элемента, затем
            смещение на необходимую величину, чтобы выйти за границы.
            */
        const pos = calcRelPos(zone, this.targetBounds, tooltipSize);

        // Смещение позволяет разработчику контролировать дистанцию между Tip (стрелочкой) и обернутым элементом.
        pos[axis.main.start] += OFFSET * zone.order;

        let dockingEdgeBufferLength = 0;
        if (this.bodyEl) {
            dockingEdgeBufferLength = Math.round(+getComputedStyle(this.bodyEl).borderRadius.slice(0, -2)) || 0;
        }
        /* Ограничение позционирование обертки внутри элемента рамки. Попытка не попасть в визуально допустимый
             буфер элемента рамки. Буфер расчитывается в зависимости от размера Tip(стрелочка) и его OFFSET (отступ).
             */
        const frameBuffer = TIP_HEIGHT + OFFSET;
        const hangingBufferLength = dockingEdgeBufferLength * 2 + TIP_HEIGHT * 2 + frameBuffer;
        const frameCrossStart = this.windowBounds[axis.cross.start];
        const frameCrossEnd = this.windowBounds[axis.cross.end];
        const frameCrossLength = this.windowBounds[axis.cross.size];
        const frameCrossInnerLength = frameCrossLength - frameBuffer * 2;
        const frameCrossInnerStart = frameCrossStart + frameBuffer;
        const frameCrossInnerEnd = frameCrossEnd - frameBuffer;
        const tooltipCrossStart = pos[axis.cross.start];
        const tooltipCrossEnd = pos[axis.cross.end];

        if (alignTip === ETooltipAlign.START) {
            pos[axis.cross.start] =
                this.targetBounds[axis.cross.end] - MAX_FROM_EDGE_FOR_TIP - TIP_HEIGHT - this.targetBounds[axis.cross.size] / 2;
        } else if (alignTip === ETooltipAlign.END) {
            pos[axis.cross.start] =
                this.targetBounds[axis.cross.start] -
                tooltipSize[axis.cross.size] +
                MAX_FROM_EDGE_FOR_TIP +
                TIP_HEIGHT +
                this.targetBounds[axis.cross.size] / 2;
        } else if (pos.crossLength > frameCrossLength) {
            /*
             * Если Tooltip не влезает в frameCrossLength тогда просто позиционируем его в `frameCrossStart`.
             * CrossLength тултипа будет принудительно forced to overflow into the `Frame` .
             */
            pos[axis.cross.start] = 0;

            /**
             * Если tooltipCrossStart выходит за некое пороговое значение targetCrossLength, тогда ограничить его tooltipCrossStart
             */
        } else if (this.targetBounds[axis.cross.end] < hangingBufferLength) {
            pos[axis.cross.start] = this.targetBounds[axis.cross.end] - hangingBufferLength;

            /**
             * Проверка что начало вспомоагтельной оси в пределах обернутого элемента и его рамок, имеет ли смысл
             * пытаться вместить Tooltip туда
             */
        } else if (this.targetBounds[axis.cross.start] > frameCrossInnerEnd) {
            pos[axis.cross.start] = this.targetBounds[axis.cross.start] - tooltipSize[axis.cross.size];

            /* Если tooltipCrossStart не влазит внутрь рамок (honouring buffers) тогда просто центруем поповер в
                 оставшейся frameCrossLength.
                */
        } else if (pos.crossLength > frameCrossInnerLength) {
            pos[axis.cross.start] = (frameCrossLength - pos.crossLength) / 2;
        } else if (tooltipCrossStart < frameCrossInnerStart) {
            pos[axis.cross.start] = frameCrossInnerStart;
        } else if (tooltipCrossEnd > frameCrossInnerEnd) {
            pos[axis.cross.start] = pos[axis.cross.start] - (pos[axis.cross.end] - frameCrossInnerEnd);
        }
        /**
         * Применение стилей flow и order. Это может повлиять на последюущие измерения высоты и ширины контейнера.
         * Когда Tip (стрелочка) меняет ориентацию из-за изменений `row`/`column`, будет затронуты ширина и высота.
         * Мониторинг лейаута перехватит эти изменения и сам пересчитает лейаут.
         */
        this.tooltipNode.style.flexFlow = zone.flow;
        addCrossPlatformStyle(this.tooltipNode, 'FlexFlow', zone.flow);
        if (this.bodyEl) {
            this.bodyEl.style.order = zone.order.toString();
            addCrossPlatformStyle(this.bodyEl, 'Order', this.bodyEl.style.order);
        }

        // Применение абсолютного позиционирования
        this.tooltipNode.style.top = `${pos.y}px`;
        this.tooltipNode.style.left = `${pos.x}px`;

        // Рассчет позиционирования Tip (стрелочки)
        let tipCrossPos = centerOfBoundsFromBounds(zone.flow, ETooltipAxesType.CROSS, this.targetBounds, pos) - TIP_HEIGHT;

        if (tipCrossPos < MAX_FROM_EDGE_FOR_TIP) {
            tipCrossPos = MAX_FROM_EDGE_FOR_TIP;
        } else if (tipCrossPos > pos.crossLength - MAX_FROM_EDGE_FOR_TIP - TIP_HEIGHT * 2) {
            tipCrossPos = pos.crossLength - MAX_FROM_EDGE_FOR_TIP - TIP_HEIGHT * 2;
        }

        if (this.tipEl) {
            this.tipEl.style.transform = `${flowToTipTranslations[zone.flow]}(${tipCrossPos}px)`;
            addCrossPlatformStyle(this.tipEl, 'Transform', this.tipEl.style.transform);
            this.tipEl.style.borderWidth = `${TIP_HEIGHT}px`;
        }
    };

    // Метод проверки изменения границ обернутого элемента.
    private setAndCheckResizeTargetBounds = () => {
        if (!this.targetEl) {
            return false;
        }

        const newTargetBounds = calcBounds(this.targetEl);
        if (this.targetBounds && equalCoords(this.targetBounds, newTargetBounds)) {
            return false;
        }

        this.targetBounds = newTargetBounds;
        return true;
    };

    // Метод проверки необходимости перерисовки лейаута
    private checkTargetReposition = () => {
        if (this.setAndCheckResizeTargetBounds()) {
            this.resolveTooltipLayout();
        }
    };

    // Метод измерения размеров тела тултипа (без стрелочки)
    private setTooltipBodySize = () => {
        if (!this.bodyEl) {
            return;
        }
        this.tooltipBodySize = {w: this.bodyEl.offsetWidth, h: this.bodyEl.offsetHeight};
    };

    // Очистка таймеров анимации исчезновения
    private animateExitStop = () => {
        if (this.exitingAnimationTimer1) {
            clearTimeout(this.exitingAnimationTimer1);
        }
        if (this.exitingAnimationTimer2) {
            clearTimeout(this.exitingAnimationTimer2);
        }
        this.setState({exiting: false});
    };

    // Анимация исчезновения
    private animateExit = () => {
        this.setState({exiting: true});
        this.exitingAnimationTimer2 = setTimeout(() => {
            setTimeout(() => {
                if (!this.tooltipNode) {
                    return;
                }
                this.tooltipNode.style.transform = `${flowToTooltipTranslations[this.zone.flow]}(${this.zone.order * 50}px)`;
                this.tooltipNode.style.opacity = '0';
            }, 0);
        }, 0);

        this.exitingAnimationTimer1 = setTimeout(() => {
            this.setState({exiting: false, needRenderTooltip: false});
        }, ENTER_EXIT_TRANSITION_DURATION_MS);
    };

    // Анимация появления
    private animateEnter = () => {
        if (!this.tooltipNode) {
            return;
        }

        // Подготовка стилей появления, чтобы можно было анимировать.
        this.tooltipNode.style.transform = `${flowToTooltipTranslations[this.zone.flow]}(${this.zone.order * 50}px)`;
        addCrossPlatformStyle(this.tooltipNode, 'Transform', this.tooltipNode.style.transform);
        this.tooltipNode.style.opacity = '0';

        /* Hack: http://stackoverflow.com/questions/3485365/how-can-i-force-webkit-to-redraw-repaint-to-propagate-style-changes */
        // После инициализации лейаута применяем анимации transition.
        // без этой строчки не всегда применяются стили добавленные в style, из-за чего иногда тултип появляется резко подергиваясь
        // tslint:disable-next-line: no-unused-expression
        this.tooltipNode.offsetHeight;

        if (this.tipEl) {
            this.tipEl.style.transition = 'transform 150ms ease-in';
            addCrossPlatformStyle(this.tipEl, 'Transition', 'transform 150ms ease-in');
        }
        this.tooltipNode.style.transitionProperty = 'opacity, transform';
        this.tooltipNode.style.transitionDuration = '500ms';
        this.tooltipNode.style.transitionTimingFunction = 'cubic-bezier(0.230, 1.000, 0.320, 1.000)';
        this.tooltipNode.style.opacity = '1';
        this.tooltipNode.style.transform = 'translateY(0)';
        addCrossPlatformStyle(this.tooltipNode, 'Transform', this.tooltipNode.style.transform);
    };

    //  Отслеживание поповера
    private trackTooltip = () => {
        if (!this.tooltipNode) {
            return;
        }
        this.hasTracked = true;

        // Установка опроса для проверки изменилось ли положение. Другого способа узнать этого без опроса
        this.checkLayoutInterval = setInterval(this.checkTargetReposition, REFRESH_INTERVAL_MS);

        /*
        Наблюдение за изменением границ на всех уровнях, при необходимости - перерасчет. Привязка лэйаут монитора
        должна быть сделана сразу, т.к. перерасчет может вызывать рекурсивно изменение в границах. Поэтому если мы
        сделали одноразовый force-layout перед наблюдением, наши расчеты окончательной позиции могут быть неверными.
        */

        window.addEventListener('scroll', this.onWindowScroll);
        window.addEventListener('resize', this.onWindowResize);

        // Запуск лейаута при первой прогрузке
        this.windowBounds = calcBounds(window); // заполнили размер окна
        this.setTooltipBodySize(); // заполнили размер тултипа
        this.setAndCheckResizeTargetBounds();
        this.resolveTooltipLayout();
    };

    // Отписка от отслеживания поповера
    private untrackTooltip = () => {
        if (!this.tooltipNode) {
            return;
        }
        if (this.checkLayoutInterval) {
            clearInterval(this.checkLayoutInterval);
        }
        window.removeEventListener('scroll', this.onWindowScroll);
        window.removeEventListener('resize', this.onWindowResize);
        this.hasTracked = false;
    };

    // Перерисовка при скролле "рамки"
    private onWindowScroll = () => {
        this.setAndCheckResizeTargetBounds();
        this.resolveTooltipLayout();
    };

    // Перерисовка при изменениие размеров "рамки"
    private onWindowResize = () => {
        this.windowBounds = calcBounds(window);
        this.resolveTooltipLayout();
    };

    // Отрисовка самого Tooltip
    private tooltipRender: () => React.ReactElement = () => {
        const {alignTip, children, isOpen, setTooltipRef, closeTooltip, onShow, preferPlace, size, tooltipRenderContainer, ...htmlAttrs} =
            this.props;

        // проверяем наличие TooltipBody
        if (!this.state.orderedChildren[0]) {
            throw new Error('');
        }
        const tooltipBody = React.cloneElement(this.state.orderedChildren[0], {size});

        let xButton;
        const xButtonChild = this.state.orderedChildren[2];
        // если есть кнопка закрытия
        if (xButtonChild) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            xButton = React.cloneElement(xButtonChild, {onClick: this.onXButtonClose(xButtonChild.props.onClick)});
        }

        const sizeClass = size === ETooltipSize.SM ? 'cssClass[tooltipSM]' : 'cssClass[tooltipLG]';
        const className = classnames(sizeClass, 'cssClass[tooltip]', xButton ? 'cssClass[withTooltipXButton]' : '');
        const classNameTooltipBody = classnames('cssClass[tooltipBody]', 'js-tooltipBody');

        const tooltipEl = (
            <div {...htmlAttrs} className={className} ref={this.setTooltipNode}>
                <div className={classNameTooltipBody}>
                    <div className={'cssClass[tooltipBodyContent]'}>{tooltipBody}</div>
                    {xButton ? <div>{xButton}</div> : ''}
                </div>
                <Tip direction={DIRECTIONS[this.state.standing]} />
            </div>
        );

        // Класс tooltipOverlay создает контейнер размером с экран для того,
        // чтобы не появлялся скролл на элементе body, так как есть скрол у page.
        return <div className="cssClass[tooltipOverlay]">{tooltipEl}</div>;
    };

    private addTooltipToDom() {
        if (this.container) {
            if (this.state.needRenderTooltip) {
                ReactDOM.unstable_renderSubtreeIntoContainer(this, this.tooltipRender(), this.container);
            } else {
                ReactDOM.unstable_renderSubtreeIntoContainer(this, <noscript />, this.container);
            }
        }
    }
}
