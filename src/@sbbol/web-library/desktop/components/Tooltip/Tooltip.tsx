import {Hoverable} from '@sbbol/web-library/desktop/components/Hoverable/Hoverable';
import {TooltipBase} from '@sbbol/web-library/desktop/components/Tooltip/components/TooltipBase';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ITooltipProps} from './types';
import {isKey} from '@sbbol/web-library/desktop/utils/keyboard';
import {TooltipBody} from './TooltipBody';
import {TooltipTarget} from './TooltipTarget';
import {TooltipXButton} from './TooltipXButton';

interface IState {
    /** Признак открыт ли Tooltip. */
    isOpen: boolean;
    /** Признак контролируемый ли Tooltip. */
    isControlled: boolean;
    /** Нода Tooltip'а. */
    tooltipNode: HTMLDivElement | null;
    /** Признак контроля фокуса внутри Tooltip. */
    modalFocusManager: boolean;
}

/** Компонент тултипа. Появлятся при ховере, клике или просто открытым. */
export class Tooltip extends React.Component<ITooltipProps, IState> {
    public static displayName = 'Tooltip';

    public static defaultProps = {
        tabSensitive: true,
    };

    public static Body = TooltipBody;
    public static Target = TooltipTarget;
    public static XButton = TooltipXButton;

    public target: Element | null | Text = null;

    public state: IState = {
        isOpen: !!this.props.isOpen,
        isControlled: this.props.isOpen !== undefined && this.props.toggle !== undefined,
        tooltipNode: null,
        modalFocusManager: false,
    };

    public render(): JSX.Element {
        const {toggleType, children, isOpen: isOpenProp, tabSensitive, ...tooltipBaseProps} = this.props;
        const {isOpen: isOpenState, isControlled, modalFocusManager} = this.state;
        const open = isControlled ? isOpenProp : isOpenState;

        if (toggleType === 'hover') {
            return (
                <Hoverable onHoverToggle={this.onHoverToggle} additionalTarget={this.state.tooltipNode || undefined}>
                    <TooltipBase
                        {...tooltipBaseProps}
                        setTooltipRef={this.setTooltip}
                        isOpen={open}
                        closeTooltip={this.onClickCloseByHover}
                        modalFocusManager={modalFocusManager}
                    >
                        {children}
                    </TooltipBase>
                </Hoverable>
            );
        } else if (toggleType === 'click') {
            return (
                <TooltipBase
                    {...tooltipBaseProps}
                    setTooltipRef={this.setTooltip}
                    isOpen={open}
                    closeTooltip={this.onClose}
                    modalFocusManager={modalFocusManager}
                >
                    {children}
                </TooltipBase>
            );
        } else {
            return (
                <TooltipBase {...tooltipBaseProps} isOpen={open} closeTooltip={this.onClose} modalFocusManager={modalFocusManager}>
                    {children}
                </TooltipBase>
            );
        }
    }

    public componentDidMount(): void {
        this.addTargetListeners();
    }

    public componentDidUpdate(prevProps: Readonly<ITooltipProps>, prevState: Readonly<IState>): void {
        // если тултип открывается по клику то должен уметь закрываться по клику вне
        if (this.props.toggleType === 'click') {
            if (!prevState.isOpen && this.state.isOpen) {
                // тултип открылся
                document.addEventListener('mousedown', this.closeIfOuterAction);
            }

            if (prevState.isOpen && !this.state.isOpen) {
                // тултип закрылся
                document.removeEventListener('mousedown', this.closeIfOuterAction);
            }
        }
    }

    public componentWillUnmount(): void {
        const {toggleType, tabSensitive} = this.props;
        if (this.props.toggleType === 'click') {
            this.target?.removeEventListener('click', this.onOpen);
            document.removeEventListener('mousedown', this.closeIfOuterAction);
        }
        if (tabSensitive && this.target && (toggleType === 'click' || toggleType === 'hover')) {
            this.target.removeEventListener('focus', this.onOpen);
            this.target.removeEventListener('blur', this.onClose);
        }
    }

    private setTooltip = (element: HTMLDivElement) => {
        this.setState({tooltipNode: element});
    };

    // Закрываем тултип если был клик вне тултипа и таргета
    private closeIfOuterAction = (event: Event) => {
        if (this.state.tooltipNode && this.target) {
            let notTarget = true;
            // В IE функция contains не потдерживается для svg
            if (!this.target.contains) {
                this.target.childNodes.forEach((child) => {
                    if (child === event.target) {
                        notTarget = false;
                    }
                });
            } else {
                notTarget = !this.target.contains(event.target as Node);
            }

            const isOuterAction = !this.state.tooltipNode.contains(event.target as Node) && notTarget;
            if (isOuterAction) {
                this.onClose();
                // не нужно закрывать тултип если кликаем на тултип (например копирование текста с тултипа)
            } else if (this.props.tabSensitive) {
                setTimeout(this.onOpen, 0);
            }
        }
    };

    private onHoverToggle = (isHovered: boolean) => {
        if (this.state.isControlled) {
            this.props.toggle?.(isHovered);
        } else {
            this.setState({isOpen: isHovered});
        }
    };

    private addClickEvent = () => {
        this.target?.addEventListener('click', this.onOpen);
    };

    private onClickCloseByHover = () => {
        // https://stackoverflow.com/questions/42706536/correct-way-to-dispatch-event-in-ie-11
        let event;
        if (typeof Event === 'function') {
            event = new MouseEvent('mouseleave');
        } else {
            event = document.createEvent('MouseEvent');
            event.initEvent('mouseleave', true, true);
        }
        this.state.tooltipNode?.dispatchEvent(event);
    };

    private onClose = () => {
        if (this.state.isControlled) {
            this.props.toggle?.(false);
            this.setState({modalFocusManager: false});
        } else {
            this.setState({isOpen: false, modalFocusManager: false});
        }
    };

    private onOpen = () => {
        const {isControlled, isOpen: isOpenState} = this.state;
        const {isOpen: isOpenProp} = this.props;

        if (!(isControlled ? isOpenProp : isOpenState)) {
            if (this.state.isControlled) {
                this.props.toggle?.(true);
            } else {
                this.setState({isOpen: true});
            }
        }
    };

    private onKeyup = (event: any): void => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
        const key = event.code || event.keyCode;

        if (isKey(key, 'TAB')) {
            this.setState({modalFocusManager: true});
            this.onOpen();
        }
    };

    private onBlur = (e: Event) => {
        requestAnimationFrame(() => {
            const relatedTarget = (e as FocusEvent).relatedTarget;
            const contains = this.state.tooltipNode?.contains(relatedTarget as Element);

            if (relatedTarget && !contains) {
                this.onClose();
            }
        });
    };

    private addTargetListeners = () => {
        const {toggleType, tabSensitive} = this.props;
        // eslint-disable-next-line react/no-find-dom-node
        this.target = ReactDOM.findDOMNode(this);

        // если тултип открывается по клику то должен уметь закрываться по клику вне
        if (toggleType === 'click' && this.props.isOpen) {
            document.addEventListener('mousedown', this.closeIfOuterAction);
        }

        if (toggleType === 'click') {
            this.addClickEvent();
        }
        // закрытие и открытие тултипа на таб (для screen reader)
        if (this.target && tabSensitive && (toggleType === 'click' || toggleType === 'hover')) {
            this.target.addEventListener('keyup', this.onKeyup);
            this.target.addEventListener('blur', this.onBlur, true);
        }
    };
}
