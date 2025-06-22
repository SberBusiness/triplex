import React from 'react';
import ReactDOM from 'react-dom';
import {ITooltipProps} from '@sberbusiness/triplex/components/Tooltip/Tooltip';
import {TooltipDesktopBase} from '@sberbusiness/triplex/components/Tooltip/components/desktop/components/TooltipDesktopBase';
import {TooltipContext} from '@sberbusiness/triplex/components/Tooltip/TootlipContext';

/** Свойства компонента TooltipDesktop. */
export interface ITooltipDesktopProps extends Omit<ITooltipProps, 'toggle'> {
    /** Признак открыт ли TooltipDesktop. */
    isOpen: boolean;
    /** Дочерние элементы. */
    children?: never;
}

/** Десктоп версия компонента Tooltip. */
export class TooltipDesktop extends React.Component<ITooltipDesktopProps> {
    public static displayName = 'TooltipDesktop';
    public static contextType = TooltipContext;

    declare context: React.ContextType<typeof TooltipContext>;

    private target: Element | null = null;
    private tooltip: Element | null = null;
    private timeout?: number;

    public render(): JSX.Element {
        const {children, toggleType, ...rest} = this.props;

        return <TooltipDesktopBase {...rest} setTooltipRef={this.setTooltipRef} />;
    }

    public componentDidMount(): void {
        const {toggleType} = this.props;

        // eslint-disable-next-line react/no-find-dom-node
        this.target = ReactDOM.findDOMNode(this) as Element;

        // Если Tooltip открывается по клику, то должен уметь закрываться по клику вне.
        if (this.props.isOpen) {
            document.addEventListener('click', this.closeIfOuterAction);
        }

        if (toggleType === 'hover') {
            this.addHoverListeners(this.target);
        }
    }

    public componentDidUpdate(prevProps: Readonly<ITooltipDesktopProps>): void {
        const isOpen = !prevProps.isOpen && this.props.isOpen;
        const isClosed = prevProps.isOpen && !this.props.isOpen;

        // Tooltip открылся.
        if (isOpen) {
            document.addEventListener('mousedown', this.closeIfOuterAction);
        }

        // Tooltip закрылся.
        if (isClosed) {
            document.removeEventListener('mousedown', this.closeIfOuterAction);

            if (this.props.toggleType === 'hover') {
                this.removeHoverListeners(this.tooltip!);
            }
        }

        if (prevProps.toggleType != this.props.toggleType) {
            if (this.props.toggleType === 'hover') {
                this.addHoverListeners(this.target!);
            } else if (prevProps.toggleType === 'hover') {
                this.removeHoverListeners(this.target!);
            }
        }
    }

    public componentWillUnmount(): void {
        const {toggleType} = this.props;

        document.removeEventListener('mousedown', this.closeIfOuterAction);

        if (toggleType === 'hover') {
            this.removeHoverListeners(this.target!);
        }

        clearTimeout(this.timeout);
    }

    private setTooltipRef = (node: HTMLDivElement | null) => {
        const {toggleType} = this.props;

        if (node && toggleType === 'hover') {
            this.addHoverListeners(node);
        }

        this.tooltip = node;
    };

    // Закрываем Tooltip при клике за его пределами.
    private closeIfOuterAction = (event: Event) => {
        const {setTooltipOpen} = this.context;

        if (this.target && this.tooltip) {
            const outOfTarget = !this.target.contains(event.target as Node);
            const outOfTooltip = !this.tooltip.contains(event.target as Node);

            if (outOfTarget && outOfTooltip) {
                setTooltipOpen(false);
            }
        }
    };

    private addHoverListeners = (element: Element) => {
        element.addEventListener('mouseenter', this.handleMouseEnter);
        element.addEventListener('mouseleave', this.handleMouseLeave);
    };

    private removeHoverListeners = (element: Element) => {
        element.removeEventListener('mouseenter', this.handleMouseEnter);
        element.removeEventListener('mouseleave', this.handleMouseLeave);
    };

    private handleMouseEnter = () => {
        const {tooltipOpen, targetHoveredRef, setTooltipOpen} = this.context;

        if (!tooltipOpen) {
            setTooltipOpen(true);
            targetHoveredRef.current = true;
        }
        clearTimeout(this.timeout);
    };

    private handleMouseLeave = () => {
        const {setTooltipOpen} = this.context;

        this.timeout = window.setTimeout(() => {
            setTooltipOpen(false);
        }, 500);
    };
}
