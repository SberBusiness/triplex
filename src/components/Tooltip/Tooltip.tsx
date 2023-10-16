import {Hoverable} from '@sberbusiness/triplex/components/Hoverable/Hoverable';
import {TooltipBase} from '@sberbusiness/triplex/components/Tooltip/components/TooltipBase';
import React from 'react';
import ReactDOM from 'react-dom';
import {ITooltipProps} from './types';
import {isKey} from '@sberbusiness/triplex/utils/keyboard';
import {TooltipBody} from '@sberbusiness/triplex/components/Tooltip/TooltipBody';
import {TooltipTarget} from '@sberbusiness/triplex/components/Tooltip/TooltipTarget';
import {TooltipXButton} from '@sberbusiness/triplex/components/Tooltip/TooltipXButton';

interface IState {
    /** Признак открыт ли Tooltip. */
    isOpen: boolean;
    /** Признак контролируемый ли Tooltip. */
    isControlled: boolean;
    /** Нода Tooltip'а. */
    tooltipNode: HTMLDivElement | null;
}

/** Компонент тултипа. Появляется при ховере, клике или просто открытым. */
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
    };

    public render(): JSX.Element {
        const {toggleType, children, isOpen: isOpenProp, tabSensitive, toggle, ...tooltipBaseProps} = this.props;
        const {isOpen: isOpenState, isControlled} = this.state;
        const open = isControlled ? isOpenProp : isOpenState;

        if (toggleType === 'hover') {
            return (
                <Hoverable onHoverToggle={this.onHoverToggle} additionalTarget={this.state.tooltipNode || undefined}>
                    {() => (
                        <TooltipBase
                            {...tooltipBaseProps}
                            setTooltipRef={this.setTooltip}
                            isOpen={open}
                            closeTooltip={this.onClickCloseByHover}
                        >
                            {children}
                        </TooltipBase>
                    )}
                </Hoverable>
            );
        } else if (toggleType === 'click') {
            return (
                <TooltipBase {...tooltipBaseProps} setTooltipRef={this.setTooltip} isOpen={open} closeTooltip={this.onClose}>
                    {children}
                </TooltipBase>
            );
        } else {
            return (
                <TooltipBase {...tooltipBaseProps} isOpen={open} closeTooltip={this.onClose}>
                    {children}
                </TooltipBase>
            );
        }
    }

    public componentDidMount(): void {
        // если тултип открывается по клику, то должен уметь закрываться по клику вне
        if (this.props.isOpen) {
            document.addEventListener('click', this.closeIfOuterAction);
        }

        this.addTargetListeners();
    }

    public componentDidUpdate(prevProps: Readonly<ITooltipProps>, prevState: Readonly<IState>): void {
        // если тултип открывается по клику, то должен уметь закрываться по клику вне
        const isOpened = this.state.isControlled ? !prevProps.isOpen && this.props.isOpen : !prevState.isOpen && this.state.isOpen;
        const isClosed = this.state.isControlled ? prevProps.isOpen && !this.props.isOpen : prevState.isOpen && !this.state.isOpen;
        if (isOpened) {
            // Tooltip открылся.
            // Таймаут, чтобы tooltip не закрылся при первом открытии, в случае контролируемого tooltip.
            setTimeout(() => {
                document.addEventListener('click', this.closeIfOuterAction);
            });
        }

        if (isClosed) {
            // Tooltip закрылся.
            document.removeEventListener('click', this.closeIfOuterAction);
        }

        if (prevProps.toggleType !== this.props.toggleType) {
            this.removeTargetListeners();

            // eslint-disable-next-line react/no-find-dom-node
            this.target = ReactDOM.findDOMNode(this);

            this.addTargetListeners();
        }
    }

    public componentWillUnmount(): void {
        document.removeEventListener('click', this.closeIfOuterAction);

        this.removeTargetListeners();
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

    private handleClick = () => {
        if (this.props.toggleType === 'click') {
            this.onOpen();
        }
    };

    private onClickCloseByHover = () => {
        const event = new MouseEvent('mouseleave');

        this.state.tooltipNode?.dispatchEvent(event);
    };

    private onClose = () => {
        if (this.state.isControlled) {
            this.props.toggle?.(false);
        } else {
            this.setState({isOpen: false});
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

        this.target?.addEventListener('click', this.handleClick);

        // закрытие и открытие тултипа на таб (для screen reader)
        if (this.target && tabSensitive && (toggleType === 'click' || toggleType === 'hover')) {
            this.target.addEventListener('keyup', this.onKeyup);
            this.target.addEventListener('blur', this.onBlur, true);
        }
    };

    private removeTargetListeners = () => {
        const {toggleType, tabSensitive} = this.props;

        this.target?.removeEventListener('click', this.handleClick);

        if (this.target && tabSensitive && (toggleType === 'click' || toggleType === 'hover')) {
            this.target.removeEventListener('keyup', this.onKeyup);
            this.target.removeEventListener('blur', this.onBlur, true);
        }
    };
}
