import {isReactElement} from '@sberbusiness/triplex/desktop/utils/reactChild';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

/**
 *  @prop {React.ReactElement | THoverableFunc} children Элемент на который должно навешиваться событие ховера.
 *  @prop {(isHovered: boolean) => void} onHoverToggle Коллбэк, вызываемый при смене состояния ховера.
 *  @prop {HTMLElement} [additionalTarget] Второй элемент на который должно навешиваться событие ховера.
 */
export interface IHoverableProps {
    children: React.ReactElement | THoverableFunc;
    onHoverToggle?: (isHovered: boolean) => void;
    additionalTarget?: HTMLElement;
}

/**
 * @prop {boolean} isHovered Признак того что элементы в состоянии ховера.
 */
interface IHoverableState {
    isHovered: boolean;
}

type THoverableFunc = ({isHovered}: IHoverableState) => React.ReactElement;

const DEFAULT_CLOSE_TIMER_LENGTH = 500;

/**
 * Обертка для реализации ховера.
 */
export class Hoverable extends React.Component<IHoverableProps, IHoverableState> {
    public timeout: any;
    public target: Element | null | Text = null;

    public state: IHoverableState = {
        isHovered: false,
    };

    public render() {
        const {isHovered} = this.state;
        if (isReactElement(this.props.children)) {
            return React.cloneElement(this.props.children, {isHovered});
        } else {
            return this.props.children({isHovered});
        }
    }

    public componentDidMount() {
        const {additionalTarget} = this.props;
        if (additionalTarget) {
            this.addListeners(additionalTarget);
        }

        this.addTargetListener();
    }

    public componentDidUpdate(prevProps: Readonly<IHoverableProps>) {
        if (this.props.additionalTarget && prevProps.additionalTarget !== this.props.additionalTarget) {
            this.addListeners(this.props.additionalTarget);
        }
    }

    public componentWillUnmount() {
        const {additionalTarget} = this.props;
        if (this.target) {
            this.removeListeners(this.target);
        }
        if (additionalTarget) {
            this.removeListeners(additionalTarget);
        }
        clearTimeout(this.timeout);
    }

    private addTargetListener = () => {
        // eslint-disable-next-line react/no-find-dom-node
        this.target = ReactDOM.findDOMNode(this);
        if (this.target) {
            this.addListeners(this.target);
        }
    };

    private addListeners = (element: Element | Text) => {
        element.addEventListener('mouseenter', this.setHoverIsTrue);
        element.addEventListener('mouseleave', this.setHoverIsFalse);
    };

    private removeListeners = (element: Element | Text) => {
        element.removeEventListener('mouseenter', this.setHoverIsTrue);
        element.removeEventListener('mouseleave', this.setHoverIsFalse);
    };

    private setHoverIsTrue = () => {
        if (!this.state.isHovered) {
            this.setState({isHovered: true});
            this.props.onHoverToggle?.(true);
        }
        clearTimeout(this.timeout);
    };

    private setHoverIsFalse = () => {
        this.timeout = setTimeout(() => {
            this.setState({isHovered: false});
            this.props.onHoverToggle?.(false);
        }, DEFAULT_CLOSE_TIMER_LENGTH);
    };
}
